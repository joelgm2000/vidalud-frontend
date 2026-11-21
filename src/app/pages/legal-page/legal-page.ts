import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { LEGAL, LegalDoc } from '../../data/legal';

/** Página pública con los términos o la política de datos (la piden Google Merchant Center y la ley). */
@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.css'
})
export class LegalPage {
  private route = inject(ActivatedRoute);
  readonly key = this.route.snapshot.data['doc'] as LegalDoc;
  readonly doc = LEGAL[this.key];
  readonly other: LegalDoc = this.key === 'terms' ? 'privacy' : 'terms';
  readonly otherPath = this.other === 'terms' ? '/terminos' : '/privacidad';

  constructor() {
    const title = `${this.doc.title} | Vidalud`;
    inject(Title).setTitle(title);
    const meta = inject(Meta);
    meta.updateTag({ name: 'description', content: this.doc.intro.slice(0, 155) });
    meta.updateTag({ property: 'og:title', content: title });
    const url = 'https://www.vidalud.com' + (this.key === 'terms' ? '/terminos' : '/privacidad');
    meta.updateTag({ property: 'og:url', content: url });
    inject(DOCUMENT).querySelector('link[rel=canonical]')?.setAttribute('href', url);
  }

  /** Id estable para enlazar secciones, p. ej. /terminos#devoluciones. */
  anchor(title: string): string {
    if (/retracto|devoluc/i.test(title)) return 'devoluciones';
    if (/envío/i.test(title)) return 'envios';
    if (/pago/i.test(title)) return 'pagos';
    return title.toLowerCase().normalize('NFD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
  }
}
