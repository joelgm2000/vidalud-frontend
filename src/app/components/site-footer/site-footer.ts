import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, UNIT_PRICE, WHATSAPP_NUMBER, cop } from '../../services/cart.service';
import { LegalService } from '../../services/legal.service';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css'
})
export class SiteFooter {
  readonly cart = inject(CartService);
  readonly legal = inject(LegalService);
  readonly price = cop(UNIT_PRICE);
  readonly total = computed(() => cop(this.cart.total()));
  readonly year = new Date().getFullYear();
  readonly showSticky = signal(false);
  /** En computador: el ícono de WhatsApp se esconde si un botón de compra pasa por su esquina. */
  readonly waBlocked = signal(false);
  readonly waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero información sobre el Magnesium Complex.')}`;

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScroll() {
    this.showSticky.set(window.scrollY > 700);
    // Zona que ocupa el ícono flotante (abajo a la derecha), con margen.
    const zoneLeft = window.innerWidth - 100;
    const zoneTop = window.innerHeight - 100;
    const blocked = Array.from(document.querySelectorAll('.btn-gold, .btn-green')).some(el => {
      if ((el as HTMLElement).closest('.sticky-buy')) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.right > zoneLeft && r.bottom > zoneTop && r.top < window.innerHeight;
    });
    this.waBlocked.set(blocked);
  }
}
