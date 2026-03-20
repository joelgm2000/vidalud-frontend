import { Injectable } from '@angular/core';

export interface OrderPayload {
  fullName: string;       // nombre + apellido combinados (para emails)
  firstName: string;      // para columna NOMBRES de Dropi
  lastName: string;       // para columna APELLIDOS de Dropi
  phone: string;
  email: string;
  department: string;
  city: string;
  address: string;        // dirección + barrio combinados
  notes?: string;
  productId: string;
  quantity: number;
  total: number;
  paymentMethod: 'cod';
  shipping?: number;
  subtotal?: number;
  size?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {

  async processOrder(order: OrderPayload): Promise<string> {
    try {
      // 🚀 EL CAMBIO MAESTRO: Apuntando a tu servidor oficial en la nube
      const response = await fetch('https://vidalud.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Error del servidor');
      }

      const result = await response.json();
      return result.orderId;

    } catch (e) {
      console.error('Error al procesar pedido:', e);
      throw e;
    }
  }
}