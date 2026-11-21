import { Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { BUNDLES, CAPSULES_PER_BOTTLE, CartService, LIST_PRICE, UNIT_PRICE, cop, safePlay } from '../../services/cart.service';

interface MediaItem {
  type: 'video' | 'image';
  src: string;
  poster?: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  readonly cart = inject(CartService);
  readonly bundles = BUNDLES;
  readonly unit = UNIT_PRICE;
  readonly list = LIST_PRICE;
  readonly capsules = CAPSULES_PER_BOTTLE;
  readonly cop = cop;

  videoRef?: ElementRef<HTMLVideoElement>;

  /** Cada vez que el video aparece, arranca silenciado (los navegadores bloquean el autoplay con sonido). */
  @ViewChild('heroVideo') set heroVideo(ref: ElementRef<HTMLVideoElement> | undefined) {
    this.videoRef = ref;
    if (!ref) return;
    const v = ref.nativeElement;
    v.muted = true;
    this.muted.set(true);
    safePlay(v);
  }

  readonly media: MediaItem[] = [
    { type: 'video', src: 'videos/producto.mp4', poster: 'videos/producto.jpg' },
    { type: 'image', src: 'IMAGEN_PRODUCTO_7.jpeg' },
    { type: 'image', src: 'IMAGEN_PRODUCTO_4.jpeg' },
    { type: 'image', src: 'IMAGEN_PRODUCTO_1.jpg' },
  ];

  readonly index = signal(0);
  readonly current = computed(() => this.media[this.index()]);
  readonly muted = signal(true);

  select(i: number) {
    this.index.set(i);
    this.muted.set(true);
  }

  toggleSound() {
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    if (video.paused) safePlay(video);
    video.muted = !video.muted;
    this.muted.set(video.muted);
  }
}
