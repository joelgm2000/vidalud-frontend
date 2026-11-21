import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {
  readonly cart = inject(CartService);

  readonly benefits = [
    { icon: 'bi-moon-stars', title: 'Mejor descanso', text: 'El glicinato es la forma de magnesio más usada para relajarse al final del día y dormir mejor.' },
    { icon: 'bi-lightning-charge', title: 'Más energía', text: 'El magnesio contribuye a disminuir el cansancio y la fatiga del día a día.' },
    { icon: 'bi-activity', title: 'Músculos y calambres', text: 'Contribuye al funcionamiento normal de los músculos, ideal si entrenas o pasas mucho tiempo de pie.' },
    { icon: 'bi-flower1', title: 'Calma y enfoque', text: 'Contribuye al funcionamiento normal del sistema nervioso para enfrentar el estrés diario.' },
  ];

  readonly forms = [
    { name: 'Glicinato', text: 'suave con el estómago, el favorito para el descanso' },
    { name: 'Malato', text: 'unido al ácido málico, presente en las frutas' },
    { name: 'Taurato', text: 'unido a taurina, un aminoácido' },
    { name: 'Citrato', text: 'una de las formas de mejor absorción' },
    { name: 'Orotato, aspartato, carbonato y óxido', text: 'completan las 8 formas de la fórmula' },
  ];
}
