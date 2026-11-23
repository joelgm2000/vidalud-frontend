import { Injectable, computed, signal } from '@angular/core';

declare const fbq: ((...args: unknown[]) => void) | undefined;

/** Precio de la promo 2x1 (2 frascos). */
export const UNIT_PRICE = 99900;
/** Precio de un frasco suelto (Vital World). */
export const SINGLE_PRICE = 70000;
export const CAPSULES_PER_BOTTLE = 90;
export const WHATSAPP_NUMBER = '573114370406';

export type BundleId = 'single' | 'promo' | 'promo2';

export interface Bundle {
  id: BundleId;
  title: string;
  /** Detalle corto que se muestra debajo del título. */
  detail: string;
  /** Marca/presentación: se muestra para no confundir productos distintos. */
  product: string;
  bottles: number;
  price: number;
  /** ID del producto en Dropi (va a la columna «ID DE PRODUCTO» de la hoja). */
  dropiId: string;
  /**
   * Cantidad que se manda a Dropi (columna CANTIDAD). OJO: 2078012 es un PACK x2
   * («X2 Magnesium Complex 90 Capsulas»), así que ahí cada unidad = 2 frascos.
   */
  dropiQty: number;
  tag?: string;
  image: string;
}

export const BUNDLES: Bundle[] = [
  {
    id: 'single', title: '1 frasco', bottles: 1, price: SINGLE_PRICE, dropiId: '1993404', dropiQty: 1,
    product: 'Magnesium Complex Vital World', detail: '100 cápsulas blandas · registro INVIMA',
    image: 'vital-world-1-frasco.jpg',
  },
  {
    id: 'promo', title: 'Promo 2x1', bottles: 2, price: UNIT_PRICE, dropiId: '2078012', dropiQty: 1,
    product: 'Magnesium Complex Toplux', detail: '2 frascos · 180 cápsulas', tag: 'Mejor precio',
    image: 'producto-google.jpg',
  },
  {
    id: 'promo2', title: '2 promos 2x1', bottles: 4, price: UNIT_PRICE * 2, dropiId: '2078012', dropiQty: 2,
    product: 'Magnesium Complex Toplux', detail: '4 frascos · 360 cápsulas', tag: 'Para compartir',
    image: 'producto-google.jpg',
  },
];

export const DEFAULT_BUNDLE: BundleId = 'promo';

export function bundleById(id: BundleId): Bundle {
  return BUNDLES.find(b => b.id === id) ?? BUNDLES[1];
}

/** Precio por frasco de una opción. */
export function perBottle(b: Bundle): number {
  return Math.round(b.price / b.bottles);
}

/** Ahorro frente a comprar la misma cantidad de frascos sueltos. */
export function savingsVsSingle(b: Bundle): number {
  return Math.max(0, b.bottles * SINGLE_PRICE - b.price);
}

export function cop(value: number): string {
  return '$' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly selected = signal<BundleId>(DEFAULT_BUNDLE);
  readonly isOpen = signal(false);
  readonly bundle = computed(() => bundleById(this.selected()));
  readonly total = computed(() => this.bundle().price);
  readonly bottles = computed(() => this.bundle().bottles);

  select(id: BundleId) {
    this.selected.set(id);
  }

  checkout(id?: BundleId) {
    if (id) this.select(id);
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
