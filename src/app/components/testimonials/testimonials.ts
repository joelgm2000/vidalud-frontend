import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  videoUrl:  string;
  posterUrl: string;
  name:      string;
  city:      string;
  stars:     number;
  quote:     string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {

  testimonials: Testimonial[] = [
    {
      videoUrl:  'vidalud-demo.mp4', 
      posterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
      name: 'Camila Torres', city: 'Bogotá, D.C.', stars: 5,
      quote: 'Trabajo todo el día sentada y el dolor de espalda era insoportable. En una semana usando esto noté la diferencia. ¡Súper recomendado!'
    },
    {
      videoUrl:  'vidalud-demo.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
      name: 'Jorge Méndez', city: 'Medellín', stars: 5,
      quote: 'Al principio no creía que vibrara, pero sí avisa cada vez que me encorvo. Es muy discreto, lo uso bajo la camisa en la oficina.'
    },
    {
      videoUrl:  'vidalud-demo.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      name: 'Laura Quintero', city: 'Cali', stars: 5,
      quote: 'El envío fue gratis y pagué al recibir. El material es suave y no molesta. Mi postura ha mejorado muchísimo.'
    }
  ];

  // 🔥 Variables para controlar si el texto fue copiado
  copiedPhone = false;
  copiedEmail = false;

  // 🔥 Función que se encarga de copiar al portapapeles y mostrar el mensaje temporal
  copyText(text: string, type: 'phone' | 'email') {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'phone') {
        this.copiedPhone = true;
        // Regresar a la normalidad después de 2.5 segundos
        setTimeout(() => this.copiedPhone = false, 2500); 
      } else {
        this.copiedEmail = true;
        setTimeout(() => this.copiedEmail = false, 2500);
      }
    }).catch(err => {
      console.error('No se pudo copiar el texto: ', err);
    });
  }

  stars(n: number): number[] { return Array(n).fill(0); }

  play(event: Event): void {
    const btn = event.currentTarget as HTMLElement;
    const card = btn.closest('.test-card');
    
    if (card) {
      const video = card.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.muted = false; 
        video.play();
        card.classList.add('playing');
        video.controls = true; 
      }
    }
  }
}