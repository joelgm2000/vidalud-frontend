import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Hero }         from '../../components/hero/hero';
import { Info }         from '../../components/info/info';
import { Reels }        from '../../components/reels/reels';
import { Testimonials } from '../../components/testimonials/testimonials';

const HOME_TITLE = 'Magnesium Complex 8 en 1 con Glicinato de Magnesio | Vidalud Colombia';
const HOME_DESC = 'Súper magnesio con 8 formas, incluido glicinato de magnesio: 1.000 mg por porción en cápsulas vegetales. ' +
  'Promo 2x1: 2 frascos por $99.900, envío gratis y pago contra entrega en toda Colombia.';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Info, Reels, Testimonials],
  template: `
    <app-hero></app-hero>
    <app-info></app-info>
    <app-reels></app-reels>
    <app-testimonials></app-testimonials>
  `
})
export class HomePage {
  constructor() {
    // Al volver desde /terminos o /privacidad se restablecen los datos del inicio.
    inject(Title).setTitle(HOME_TITLE);
    const meta = inject(Meta);
    meta.updateTag({ name: 'description', content: HOME_DESC });
    meta.updateTag({ property: 'og:title', content: 'Magnesium Complex 8 en 1 con glicinato | Vidalud' });
    meta.updateTag({ property: 'og:url', content: 'https://www.vidalud.com/' });
    inject(DOCUMENT).querySelector('link[rel=canonical]')?.setAttribute('href', 'https://www.vidalud.com/');
  }
}
