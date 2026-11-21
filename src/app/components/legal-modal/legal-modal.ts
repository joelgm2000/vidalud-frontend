import { Component, ElementRef, ViewChild, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LegalService } from '../../services/legal.service';
import { CartService } from '../../services/cart.service';
import { LEGAL } from '../../data/legal';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  templateUrl: './legal-modal.html',
  styleUrl: './legal-modal.css'
})
export class LegalModal {
  readonly legal = inject(LegalService);
  private cart = inject(CartService);
  private document = inject(DOCUMENT);
  readonly doc = computed(() => {
    const d = this.legal.open();
    return d ? LEGAL[d] : null;
  });

  @ViewChild('box') box?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      const open = !!this.legal.open();
      // Si el formulario de compra está abierto, el bloqueo de scroll lo maneja él.
      if (!this.cart.isOpen()) this.document.body?.classList.toggle('vl-lock', open);
      if (open) setTimeout(() => { this.box?.nativeElement.focus(); this.box?.nativeElement.scrollTo({ top: 0 }); }, 30);
    });
  }
}
