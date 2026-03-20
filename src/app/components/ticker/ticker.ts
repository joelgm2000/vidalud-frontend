import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker.html',
  styleUrl: './ticker.css'
})
export class Ticker {
  messages = [
    '🚚 Envío GRATIS y SEGURO a todo Colombia',
    '✅ Pago contra entrega disponible',
    '⚡ Despacho en 24 horas hábiles',
    '🔒 Compra 100% segura y protegida',
    '🏋️ +2.000 atletas ya entrenan con Vidalud',
    '📦 Garantía de satisfacción o te devolvemos tu dinero',
    '🚚 Envío GRATIS y SEGURO a todo Colombia',
    '✅ Pago contra entrega disponible',
    '⚡ Despacho en 24 horas hábiles',
    '🔒 Compra 100% segura y protegida',
    '🏋️ +2.000 atletas ya entrenan con Vidalud',
    '📦 Garantía de satisfacción o te devolvemos tu dinero',
  ];
}