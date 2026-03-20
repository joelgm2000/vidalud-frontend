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
      videoUrl:  'vidalud-demo.mp4', // Puedes reusar el demo si no tienes otros videos aún
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

  stars(n: number): number[] { return Array(n).fill(0); }

  play(event: Event): void {
    const btn = event.currentTarget as HTMLElement;
    // Buscamos el contenedor padre .test-card
    const card = btn.closest('.test-card');
    
    if (card) {
      const video = card.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.muted = false; // Activar sonido al dar play voluntariamente
        video.play();
        card.classList.add('playing');
        video.controls = true; // Mostrar controles nativos al reproducir
      }
    }
  }
}