import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Features } from '../features/features'; 
import { OrderForm } from '../order-form/order-form'; 

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, Features, OrderForm],
  templateUrl: './hero.html', 
  styleUrls: ['./hero.css']
})
export class Hero implements AfterViewInit {
  currentIndex = 0;
  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;
  isMuted = true;

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;
    video.muted = true;
    video.play().catch(() => console.log('Autoplay bloqueado por el navegador'));
  }

  toggleMute() {
    const video = this.videoRef.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }
  
  images = [
    
    'IMAGEN_PRODUCTO_3.jpeg',
    'IMAGEN_PRODUCTO_4.jpeg',
    'IMAGEN_PRODUCTO_5.jpeg',
    'IMAGEN_PRODUCTO_6.jpeg',

    'IMAGEN_PRODUCTO_2.jpg'
  ];

  selectImage(index: number) {
    this.currentIndex = index;
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }
}