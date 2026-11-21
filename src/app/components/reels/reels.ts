import { Component, ElementRef, QueryList, ViewChildren, inject, signal } from '@angular/core';
import { CartService, UNIT_PRICE, cop, safePlay } from '../../services/cart.service';

@Component({
  selector: 'app-reels',
  standalone: true,
  templateUrl: './reels.html',
  styleUrl: './reels.css'
})
export class Reels {
  readonly cart = inject(CartService);
  readonly price = cop(UNIT_PRICE);
  readonly playing = signal(-1);

  @ViewChildren('reelVideo') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  readonly reels = [
    { src: 'videos/reel-2.mp4', poster: 'videos/reel-2.jpg', title: 'Casi me echan del trabajo por esto' },
    { src: 'videos/reel-3.mp4', poster: 'videos/reel-3.jpg', title: 'Lo que las mujeres necesitan' },
    { src: 'videos/reel-4.mp4', poster: 'videos/reel-4.jpg', title: 'Lo que hago para sentir más calma' },
  ];

  play(i: number) {
    this.videos.forEach((ref, idx) => {
      const v = ref.nativeElement;
      if (idx === i) {
        v.controls = true;
        v.muted = false;
        safePlay(v, () => { v.muted = true; safePlay(v); });
      } else if (!v.paused) {
        v.pause();
      }
    });
    this.playing.set(i);
  }
}
