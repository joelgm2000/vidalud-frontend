import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class SalesService {
  constructor(private firestore: Firestore) {}

  async registrarVenta(datos: any) {
    try {
      const ventasRef = collection(this.firestore, 'ventas');
      
      const pedido = {
        cliente: datos.fullName,
        telefono: datos.phone,
        direccion: datos.address,
        ciudad: datos.city,
        departamento: datos.department,
        producto: 'Corrector de Postura Inteligente',
        sku_dropi: '1999537', // SKU correcto del link de Dropi
        precio_venta: 59900,
        metodo_pago: datos.payMethod || 'COD',
        fecha: new Date().toISOString(),
        estado: 'PENDIENTE_DROPI'
      };

      const docRef = await addDoc(ventasRef, pedido);
      
      // Notificación automática real
      this.enviarNotificacionWebhook(pedido);
      
      return docRef;
    } catch (error) {
      console.error("Error en la venta:", error);
      return null;
    }
  }

  private enviarNotificacionWebhook(p: any) {
    // Ejemplo de Webhook para recibir aviso en Telegram/Discord/WhatsApp
    const mensaje = `🚀 ¡NUEVA VENTA! 🚀\nCliente: ${p.cliente}\nTel: ${p.telefono}\nCiudad: ${p.ciudad}\nTotal: $59.900`;
    console.log("Notificando:", mensaje);
    
    /* fetch('TU_URL_WEBHOOK', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ content: mensaje })
    });
    */
  }
}