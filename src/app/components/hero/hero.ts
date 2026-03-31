import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
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
export class Hero implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;
  
  isMuted = true;
  private observer: IntersectionObserver | null = null;
  private userManuallyUnmuted = false; // Guarda la preferencia del usuario

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;
    video.muted = true;

    // 🔥 Observador para saber si el video está visible en la pantalla
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Si el usuario vuelve a ver el video: Forzamos que corra
          video.play().catch(() => console.log('Autoplay bloqueado por el navegador'));
          
          // Si el usuario ya le había activado el sonido antes, se lo devolvemos automáticamente
          if (this.userManuallyUnmuted) {
            video.muted = false;
            this.isMuted = false;
          }
        } else {
          // Si hace scroll hacia abajo y no lo ve: Pausamos y silenciamos para ahorrar batería/datos
          video.pause();
          video.muted = true;
          this.isMuted = true;
        }
      });
    }, { threshold: 0.3 }); // Se activa cuando al menos el 30% del video está visible

    this.observer.observe(video);
  }

  ngOnDestroy() {
    // Limpiamos la memoria al salir
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  toggleMute() {
    const video = this.videoRef.nativeElement;
    
    // Si el video estaba pegado/congelado en el celular, esto lo obliga a arrancar
    if (video.paused) {
      video.play().catch(() => console.log('Esperando interacción...'));
    }

    video.muted = !video.muted;
    this.isMuted = video.muted;

    // Si el usuario le quita el silencio manualmente, el sistema aprende que quiere sonido
    if (!video.muted) {
      this.userManuallyUnmuted = true;
    } else {
      this.userManuallyUnmuted = false;
    }
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