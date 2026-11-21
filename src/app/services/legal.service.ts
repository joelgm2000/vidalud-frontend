import { Injectable, signal } from '@angular/core';
import { LegalDoc } from '../data/legal';

@Injectable({ providedIn: 'root' })
export class LegalService {
  readonly open = signal<LegalDoc | null>(null);

  show(doc: LegalDoc) {
    this.open.set(doc);
  }

  close() {
    this.open.set(null);
  }
}
