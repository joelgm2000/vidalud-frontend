import { Component, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
import { WHATSAPP_NUMBER, safePlay } from '../../services/cart.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {
  readonly playing = signal(-1);
  readonly waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, tengo una pregunta sobre el Magnesium Complex.')}`;

  @ViewChildren('testiVideo') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  readonly testimonials = [
    { src: 'videos/testimonio-1.mp4', poster: 'videos/testimonio-1.jpg', quote: 'Volví a dormir la noche entera.' },
    { src: 'videos/testimonio-2.mp4', poster: 'videos/testimonio-2.jpg', quote: 'Adiós a la fatiga y el estrés.' },
  ];

  /** Comentarios de clientes que ya estaban en la página anterior. */
  readonly reviews = [
    { name: 'Carlos M.', city: 'Bogotá', icon: 'bi-moon-stars', tag: 'Descanso',
      text: 'Llevo 15 días tomándolo y mi sueño cambió por completo. Ya no me despierto en la madrugada. 100% recomendado.' },
    { name: 'Fernando T.', city: 'Barranquilla', icon: 'bi-shield-check', tag: 'Pago seguro',
      text: 'Tenía dudas de comprar por internet, pero pagar al recibir me dio mucha tranquilidad. El frasco llegó sellado.' },
    { name: 'Laura S.', city: 'Bucaramanga', icon: 'bi-truck', tag: 'Envío rápido',
      text: 'Increíble la rapidez. Lo pedí un martes y el jueves ya estaba en mi casa. Excelente servicio por WhatsApp.' },
  ];

  readonly faqs = [
    {
      q: '¿Cómo pago mi pedido?',
      a: 'Pagas <strong>en efectivo cuando el pedido llega a tu casa</strong>. No necesitas tarjeta ni pagar nada por adelantado.',
    },
    {
      q: '¿Hacen envíos a toda Colombia? ¿Cuánto cuesta?',
      a: 'Sí, enviamos a toda Colombia y el <strong>envío es gratis</strong>. Después de confirmar tu pedido por WhatsApp te compartimos el número de guía para que lo sigas.',
    },
    {
      q: '¿Qué recibo en cada promo 2x1?',
      a: 'Cada promo trae <strong>2 frascos de Magnesium Complex (90 cápsulas cada uno, 180 en total)</strong> por $99.900, es decir $49.950 por frasco. Puedes pedir 2 promos en el mismo pedido.',
    },
    {
      q: '¿Puedo comprar un solo frasco?',
      a: 'Sí. El frasco suelto cuesta <strong>$70.000</strong> y es el <strong>Magnesium Complex de Vital World</strong>: 100 cápsulas blandas de gelatina con relleno líquido, 1.000 mg de magnesio por porción y 8 formas de magnesio (óxido, cloruro, bisglicinato, lactato, malato, glicerofosfato, carbonato y citrato), con registro INVIMA. La promo 2x1 es otra marca (Toplux) y sale más económica por frasco.',
    },
    {
      q: '¿Para qué sirve el súper magnesio?',
      a: 'El magnesio contribuye a disminuir el cansancio y la fatiga, al funcionamiento normal de los músculos y del sistema nervioso. Por eso muchas personas lo toman para descansar mejor, tener más energía y aliviar calambres.',
    },
    {
      q: '¿Qué tiene de especial el glicinato de magnesio?',
      a: 'Es una de las formas de magnesio más suaves con el estómago y la más usada para relajarse y dormir mejor. Magnesium Complex lo combina con malato, taurato, citrato, orotato, aspartato, carbonato y óxido de magnesio.',
    },
    {
      q: '¿Cómo se toma?',
      a: 'La porción de la etiqueta es de <strong>2 cápsulas vegetales</strong>, que aportan 1.000 mg de magnesio. Cada frasco trae 45 porciones. En la guía gratuita te contamos a qué hora tomarlo según lo que buscas.',
    },
    {
      q: '¿Cualquier persona lo puede tomar?',
      a: 'Es un suplemento dietario para adultos. Si estás embarazada, en lactancia, tienes una condición renal o tomas medicamentos, consulta primero con tu médico.',
    },
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
