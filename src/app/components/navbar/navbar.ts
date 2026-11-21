import { Component, HostListener, inject, signal } from '@angular/core';
import { CartService, WHATSAPP_NUMBER } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  readonly cart = inject(CartService);
  readonly scrolled = signal(false);
  readonly waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero información sobre el Magnesium Complex.')}`;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
  }
}
