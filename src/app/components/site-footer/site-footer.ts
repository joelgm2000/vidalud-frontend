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
  readonly waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero información sobre el Magnesium Complex.')}`;

  @HostListener('window:scroll')
  onScroll() {
    this.showSticky.set(window.scrollY > 700);
  }
}
