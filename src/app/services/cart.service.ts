import { Injectable, computed, signal } from '@angular/core';

declare const fbq: ((...args: unknown[]) => void) | undefined;

/** Precio de una promo 2x1 (2 frascos). */
export const UNIT_PRICE = 99900;
/** Precio de referencia de 2 frascos sin promo. */
export const LIST_PRICE = 160000;
export const CAPSULES_PER_BOTTLE = 90;
export const WHATSAPP_NUMBER = '573114370406';

export interface Bundle {
  qty: number;
  title: string;
  bottles: number;
  tag?: string;
}

export const BUNDLES: Bundle[] = [
  { qty: 1, title: '1 promo 2x1', bottles: 2 },
  { qty: 2, title: '2 promos 2x1', bottles: 4, tag: 'Para compartir' },
  { qty: 3, title: '3 promos 2x1', bottles: 6, tag: 'Para la familia' },
];

export function cop(value: number): string {
  return '$' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly qty = signal(1);
  readonly isOpen = signal(false);
  readonly total = computed(() => this.qty() * UNIT_PRICE);
  readonly bottles = computed(() => this.qty() * 2);

  setQty(qty: number) {
    if (qty >= 1 && qty <= 10) this.qty.set(qty);
  }

  checkout(qty?: number) {
    if (qty) this.setQty(qty);
    this.isOpen.set(true);
    try {
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', { value: this.total(), currency: 'COP', num_items: this.bottles() });
      }
    } catch { /* el píxel nunca debe romper la compra */ }
  }

  close() {
    this.isOpen.set(false);
  }
}

/** Reproduce un video sin romper si el navegador no devuelve una promesa o bloquea el autoplay. */
export function safePlay(video: HTMLVideoElement, onBlocked?: () => void): void {
  try {
    const p = video.play() as Promise<void> | undefined;
    p?.catch?.(() => onBlocked?.());
  } catch {
    onBlocked?.();
  }
}
