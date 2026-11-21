// Textos legales de la tienda. Revisión pendiente por un abogado antes de darlos por definitivos
// (agregar razón social / NIT y dirección cuando estén disponibles).

export type LegalDoc = 'terms' | 'privacy';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalText {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT = 'vidaludshop@gmail.com o por WhatsApp al 311 437 0406';

export const LEGAL: Record<LegalDoc, LegalText> = {
  terms: {
    title: 'Términos y condiciones',
    updated: 'Última actualización: noviembre de 2026',
    intro:
      'Estos términos regulan las compras hechas en vidalud.com. Al marcar la casilla de aceptación y enviar tu pedido, ' +
      'declaras que los leíste y los aceptas.',
    sections: [
      {
        title: '1. Quiénes somos',
        paragraphs: [
          `Vidalud es una tienda en línea que vende Magnesium Complex, un suplemento dietario, con envío a toda Colombia. ` +
          `Puedes contactarnos en ${CONTACT}.`,
        ],
      },
      {
        title: '2. El producto no es un medicamento',
        paragraphs: [
          'Magnesium Complex es un suplemento dietario. No es un medicamento y no suple una alimentación equilibrada. ' +
          'No está destinado a diagnosticar, tratar, curar ni prevenir ninguna enfermedad.',
          'Vidalud no es un servicio médico y su equipo no está conformado por médicos. La información de esta página, ' +
          'de nuestros videos y de la guía descargable es general y orientativa; no reemplaza la valoración ni la ' +
          'recomendación de un profesional de la salud.',
          'Los resultados pueden variar de una persona a otra. Los testimonios reflejan la experiencia de quien los da ' +
          'y no garantizan el mismo resultado para todos.',
        ],
      },
      {
        title: '3. Uso responsable',
        paragraphs: [
          'Lee la etiqueta antes de consumir el producto y no superes la porción indicada (2 cápsulas al día). ' +
          'Mantenlo fuera del alcance de los niños.',
          'Consulta a tu médico antes de consumirlo si estás embarazada o en lactancia, si eres menor de edad, si tienes ' +
          'alguna enfermedad (en especial renal o cardíaca), si tomas medicamentos o si vas a someterte a una cirugía.',
          'Suspende el consumo y consulta a un profesional de la salud si presentas cualquier reacción adversa.',
          'El consumo del producto es decisión y responsabilidad de quien lo compra y lo consume. En la medida permitida ' +
          'por la ley, Vidalud no responde por daños derivados de un uso distinto al indicado en la etiqueta o de no ' +
          'seguir las recomendaciones anteriores.',
        ],
      },
      {
        title: '4. Pedidos y precios',
        paragraphs: [
          'Los precios se publican en pesos colombianos y pueden cambiar sin previo aviso; se respeta el precio vigente ' +
          'al momento de hacer tu pedido. El envío es gratis.',
          'Después de recibir tu pedido te contactaremos por WhatsApp, llamada o correo para confirmarlo. Podemos ' +
          'cancelar un pedido si los datos de contacto o de entrega no se pueden verificar.',
        ],
      },
      {
        title: '5. Pago contra entrega',
        paragraphs: [
          'Pagas en efectivo al transportador en el momento de la entrega. No pedimos pagos por adelantado ni datos de ' +
          'tarjetas. Si no vas a poder recibir el pedido, avísanos lo antes posible para reprogramarlo o cancelarlo.',
        ],
      },
      {
        title: '6. Envíos',
        paragraphs: [
          'Enviamos a los municipios con cobertura de nuestras transportadoras aliadas. Una vez despachado, te compartimos ' +
          'el número de guía. Los tiempos de entrega dependen de la transportadora y de la ciudad de destino.',
        ],
      },
      {
        title: '7. Derecho de retracto y garantía',
        paragraphs: [
          'Puedes ejercer el derecho de retracto previsto en el artículo 47 de la Ley 1480 de 2011 dentro de los 5 días ' +
          'hábiles siguientes a la entrega, siempre que el producto esté sellado y sin abrir. Por razones de higiene y ' +
          'seguridad no se reciben frascos abiertos.',
          'Si el producto llega con el sello roto, dañado o vencido, escríbenos dentro de los 5 días hábiles siguientes ' +
          'a la entrega con fotos del producto y lo cambiamos sin costo.',
          `Para retracto, garantía, peticiones, quejas o reclamos escríbenos a ${CONTACT}.`,
        ],
      },
      {
        title: '8. Cambios y ley aplicable',
        paragraphs: [
          'Podemos actualizar estos términos; la versión vigente es la publicada en esta página. Estos términos se rigen ' +
          'por las leyes de la República de Colombia, en especial el Estatuto del Consumidor (Ley 1480 de 2011).',
        ],
      },
    ],
  },

  privacy: {
    title: 'Política de tratamiento de datos personales',
    updated: 'Última actualización: noviembre de 2026',
    intro:
      'En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, te explicamos cómo tratamos los datos que nos ' +
      'das al hacer un pedido. Al marcar la casilla de aceptación nos autorizas a tratarlos según esta política.',
    sections: [
      {
        title: '1. Responsable',
        paragraphs: [`Vidalud, tienda en línea vidalud.com. Contacto: ${CONTACT}.`],
      },
      {
        title: '2. Datos que recogemos',
        paragraphs: [
          'Nombres y apellidos, número de celular, correo electrónico (opcional), departamento, ciudad, dirección, barrio ' +
          'e indicaciones de entrega. No pedimos datos de tarjetas ni datos de salud.',
        ],
      },
      {
        title: '3. Para qué los usamos',
        paragraphs: [
          'Registrar, confirmar y entregar tu pedido; contactarte por WhatsApp, llamada o correo sobre tu compra; ' +
          'compartir con la transportadora y la plataforma logística solo los datos necesarios para el envío; y atender ' +
          'tus peticiones, quejas, reclamos, retractos o garantías.',
          'Medir el resultado de nuestra publicidad: enviamos a Meta (Facebook e Instagram) el valor de la compra junto ' +
          'con tu correo y celular cifrados (en forma de código irreversible), y nuestra página usa el píxel de Meta. ' +
          'No vendemos tus datos a terceros.',
        ],
      },
      {
        title: '4. Tus derechos',
        paragraphs: [
          'Puedes conocer, actualizar y rectificar tus datos; pedir prueba de la autorización que nos diste; ser ' +
          'informado sobre el uso que les damos; revocar la autorización o pedir que los eliminemos cuando no exista un ' +
          'deber legal o contractual de conservarlos; y presentar quejas ante la Superintendencia de Industria y Comercio.',
          `Para ejercerlos escríbenos a ${CONTACT}. Respondemos consultas en máximo 10 días hábiles y reclamos en ` +
          'máximo 15 días hábiles, según la ley.',
        ],
      },
      {
        title: '5. Seguridad y conservación',
        paragraphs: [
          'Guardamos tus datos con medidas razonables de seguridad y solo durante el tiempo necesario para las ' +
          'finalidades descritas y para cumplir obligaciones legales y contables.',
        ],
      },
      {
        title: '6. Vigencia',
        paragraphs: [
          'Esta política rige desde su publicación. Si cambia de forma sustancial, lo informaremos en esta página.',
        ],
      },
    ],
  },
};
