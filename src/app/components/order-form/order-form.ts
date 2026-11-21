import { Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OrderService, OrderPayload } from '../../services/order.service';
import { BUNDLES, CartService, UNIT_PRICE, LIST_PRICE, WHATSAPP_NUMBER, cop } from '../../services/cart.service';
import { DEPARTMENTS } from '../../data/colombia';
import { LegalService } from '../../services/legal.service';

const SKU_PRODUCT = '2078012';

type Step = 'form' | 'review' | 'done';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm {
  private fb = inject(FormBuilder);
  private orderSvc = inject(OrderService);
  readonly cart = inject(CartService);
  readonly legal = inject(LegalService);

  @ViewChild('panel') panel?: ElementRef<HTMLElement>;

  readonly cop = cop;
  readonly bundles = BUNDLES;
  readonly unit = UNIT_PRICE;
  readonly list = LIST_PRICE;
  readonly departments = Object.keys(DEPARTMENTS).sort();

  readonly step = signal<Step>('form');
  readonly loading = signal(false);
  readonly error = signal('');
  readonly orderId = signal('');
  readonly cities = signal<string[]>([]);
  readonly waConfirmUrl = signal('');
  readonly savings = computed(() => this.cart.qty() * (LIST_PRICE - UNIT_PRICE));

  readonly form = this.fb.nonNullable.group({
    firstName:    ['', [Validators.required, Validators.minLength(2)]],
    lastName:     ['', [Validators.required, Validators.minLength(2)]],
    phone:        ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
    email:        ['', [Validators.email]],
    department:   ['', Validators.required],
    city:         ['', Validators.required],
    address:      ['', [Validators.required, Validators.minLength(5)]],
    neighborhood: ['', [Validators.required, Validators.minLength(3)]],
    notes:        [''],
    accept:       [false, Validators.requiredTrue],
  });

  constructor() {
    this.form.controls.department.valueChanges.subscribe(dep => {
      this.cities.set(DEPARTMENTS[dep] ?? []);
      this.form.controls.city.setValue('');
    });

    // Bloquea el scroll del fondo y lleva el foco al panel al abrir.
    effect(() => {
      const open = this.cart.isOpen();
      document.body.classList.toggle('vl-lock', open);
      if (open) setTimeout(() => this.panel?.nativeElement.focus(), 30);
    });
  }

  /** Deja solo dígitos en el celular y quita el 57 si lo escriben. */
  normalizePhone() {
    const c = this.form.controls.phone;
    let digits = c.value.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('57')) digits = digits.slice(2);
    if (digits !== c.value) c.setValue(digits);
  }

  invalid(field: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.dirty || c.touched);
  }

  private redirectTimer?: ReturnType<typeof setTimeout>;

  close() {
    if (this.loading()) return;
    clearTimeout(this.redirectTimer);
    this.cart.close();
    if (this.step() === 'done') this.step.set('form');
    this.error.set('');
  }

  toReview() {
    this.normalizePhone();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Revisa los campos marcados en rojo.');
      const first = this.panel?.nativeElement.querySelector<HTMLElement>('.ng-invalid:not(form)');
      first?.focus();
      return;
    }
    this.error.set('');
    this.step.set('review');
    this.panel?.nativeElement.scrollTo({ top: 0 });
  }

  async submit() {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set('');
    const v = this.form.getRawValue();

    const payload: OrderPayload = {
      fullName:      `${v.firstName} ${v.lastName}`.trim(),
      firstName:     v.firstName.trim(),
      lastName:      v.lastName.trim(),
      phone:         v.phone,
      email:         v.email.trim(),
      department:    v.department,
      city:          v.city,
      address:       `${v.address.trim()}, ${v.neighborhood.trim()}`,
      notes:         v.notes.trim(),
      productId:     SKU_PRODUCT,
      size:          'UNICA',
      quantity:      this.cart.qty(),
      total:         this.cart.total(),
      paymentMethod: 'cod',
      shipping:      0,
      subtotal:      this.cart.total(),
    };

    try {
      const id = await this.orderSvc.processOrder(payload);
      this.orderId.set(id || '');
      const msg = `¡Hola! Acabo de hacer un pedido de Magnesium Complex.\n\n` +
        `*Pedido:* #${id || 'pendiente'}\n*A nombre de:* ${payload.fullName}\n` +
        `*Ciudad:* ${payload.city}\n*Cantidad:* ${this.cart.bottles()} frascos\n*Total:* ${cop(payload.total)}\n\n` +
        `Escribo para confirmar mi pedido con pago contra entrega.`;
      this.waConfirmUrl.set(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
      this.step.set('done');
      this.form.reset();
      this.cart.setQty(1);
      // Igual que antes: llevamos al cliente a WhatsApp para confirmar, con unos segundos para leer.
      this.redirectTimer = setTimeout(() => { window.location.href = this.waConfirmUrl(); }, 4000);
    } catch {
      this.error.set('No pudimos registrar tu pedido. Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp.');
    } finally {
      this.loading.set(false);
    }
  }
}
