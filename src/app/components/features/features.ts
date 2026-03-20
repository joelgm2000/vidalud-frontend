import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Feature {
  emoji: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {
  features: Feature[] = [
    {
      emoji: '🤜',
      title: 'Agarre Superior',
      desc: 'Material neopreno de alta resistencia con superficie texturizada antideslizante. Mantén el control en cada repetición, por pesada que sea la barra.',
      stat: '+40%',
      statLabel: 'más agarre que guantes normales'
    },
    {
      emoji: '🛡️',
      title: 'Protección Total',
      desc: 'Costuras dobles reforzadas en nylon. Distribuye la presión en toda la palma para eliminar callos, ampollas y lesiones por rozamiento repetitivo.',
      stat: '0',
      statLabel: 'callos con uso regular'
    },
    {
      emoji: '✋',
      title: 'Comodidad Ergonómica',
      desc: 'Orificios de ajuste en 4 dedos con correa de velcro. Diseño anatómico que se adapta a cualquier tamaño de mano sin restricción de movimiento.',
      stat: 'S/M',
      statLabel: 'tallas para todos'
    }
  ];
}