export interface LocalArea {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  contextTitle: string;
  context: string;
  focus: { title: string; text: string }[];
  services: string[];
  faqs: { question: string; answer: string }[];
  nearby: string[];
}

export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: 'providencia',
    name: 'Providencia',
    title: 'Diseño web en Providencia',
    metaTitle: 'Diseño Web para Empresas en Providencia | RDS',
    description: 'Diseño y rediseño de páginas web para profesionales y empresas de Providencia. Estrategia, SEO local y contacto directo. Conversemos sobre tu proyecto.',
    intro: 'RDS diseña sitios web para empresas, consultoras y profesionales que trabajan en Providencia. Construimos una presencia digital clara para explicar servicios complejos, transmitir confianza y convertir una visita en una conversación.',
    contextTitle: 'Una comuna de servicios profesionales necesita una web precisa',
    context: 'En Providencia conviven estudios profesionales, clínicas, oficinas, inmobiliarias, consultoras y negocios orientados a empresas. La competencia por atención es alta: un sitio debe explicar con rapidez qué problema resuelve el negocio, quién está detrás y cuál es el siguiente paso. Diseñamos la arquitectura desde esas preguntas, no desde una plantilla genérica.',
    focus: [
      { title: 'Autoridad sin ruido', text: 'Ordenamos experiencia, metodología y especialidades para que la trayectoria del negocio sea visible y verificable.' },
      { title: 'Consultas cualificadas', text: 'Cada servicio conduce a una acción clara: solicitar una reunión, preparar una propuesta o conocer un caso.' },
      { title: 'Diseño para decisores', text: 'Textos directos, navegación rápida y una experiencia móvil cuidada para quienes comparan alternativas durante el día.' },
    ],
    services: [
      'Sitios corporativos para consultoras, estudios legales, arquitectura y servicios B2B.',
      'Páginas de servicio que explican alcance, proceso y criterios de contratación.',
      'Rediseño de sitios antiguos, lentos o difíciles de actualizar.',
      'Estructura SEO para búsquedas de servicios profesionales y marca.',
    ],
    faqs: [
      { question: '¿Trabajan presencialmente en Providencia?', answer: 'La modalidad se acuerda por proyecto. Podemos avanzar de forma remota en la Región Metropolitana y coordinar instancias presenciales cuando el alcance lo requiera.' },
      { question: '¿Pueden mejorar un sitio que ya existe?', answer: 'Sí. Primero revisamos estructura, tecnología, contenido, indexación y riesgos para decidir si conviene optimizar o rediseñar.' },
      { question: '¿La web sirve para captar empresas?', answer: 'La orientamos a decisiones B2B: claridad de servicios, pruebas, proceso de trabajo y formularios o reuniones como siguiente paso.' },
    ],
    nearby: ['las-condes', 'nunoa', 'santiago-centro'],
  },
  {
    slug: 'las-condes',
    name: 'Las Condes',
    title: 'Diseño web en Las Condes',
    metaTitle: 'Diseño Web para Empresas en Las Condes | RDS',
    description: 'Webs corporativas y comerciales para empresas de Las Condes. Arquitectura clara, diseño a medida, SEO inicial y soporte remoto desde Santiago.',
    intro: 'Diseñamos páginas web para empresas de Las Condes que necesitan presentar una oferta corporativa con claridad, ordenar varias líneas de servicio y facilitar el contacto con clientes y socios comerciales.',
    contextTitle: 'Una web corporativa debe sostener la confianza de la marca',
    context: 'Las empresas de servicios B2B, inmobiliarias, clínicas, consultoras y compañías de tecnología que operan en Las Condes suelen competir por confianza antes que por precio. La web debe explicar estructura, especialización y forma de trabajo sin convertir toda la experiencia en una presentación abstracta. Por eso trabajamos con mensajes concretos, páginas de servicio y llamadas a la acción medibles.',
    focus: [
      { title: 'Arquitectura para varias líneas', text: 'Separamos servicios sin duplicar contenidos y conectamos cada solución con su público correspondiente.' },
      { title: 'Percepción de solidez', text: 'La dirección visual, la jerarquía y la calidad del contenido deben estar a la altura de una empresa consolidada.' },
      { title: 'Medición del interés', text: 'Definimos eventos de formulario, llamadas y contacto para saber qué servicios y páginas generan oportunidades.' },
    ],
    services: [
      'Sitios corporativos con páginas independientes por servicio o unidad de negocio.',
      'Presentación de casos, equipo, metodología y respaldo institucional.',
      'Integración del sitio con CRM, analítica y procesos de cotización existentes.',
      'Optimización técnica y estructura de enlaces internos para consultas B2B.',
    ],
    faqs: [
      { question: '¿Trabajan con empresas B2B de Las Condes?', answer: 'Sí. La arquitectura se adapta a empresas con múltiples servicios, procesos comerciales y ventas consultivas.' },
      { question: '¿Pueden integrar un CRM o automatizaciones?', answer: 'Se puede evaluar según las herramientas existentes y el alcance. La integración se presupuesta y aprueba antes de implementarse.' },
      { question: '¿Ofrecen atención presencial?', answer: 'Las reuniones pueden ser remotas. La necesidad de una instancia presencial se define según el proyecto y la ubicación acordada.' },
    ],
    nearby: ['providencia', 'vitacura', 'nunoa'],
  },
  {
    slug: 'nunoa',
    name: 'Ñuñoa',
    title: 'Diseño web en Ñuñoa',
    metaTitle: 'Diseño Web para Pymes y Profesionales en Ñuñoa | RDS',
    description: 'Páginas web para profesionales, estudios, gastronomía y comercios de Ñuñoa. Diseño claro, móvil, SEO inicial y contacto simple con RDS.',
    intro: 'En RDS diseñamos páginas web para profesionales independientes, estudios creativos, servicios de salud, restaurantes y comercios que necesitan verse actuales y explicar con rapidez qué ofrecen.',
    contextTitle: 'Una presencia cercana, fácil de usar desde el celular',
    context: 'La oferta local de Ñuñoa combina servicios cotidianos, gastronomía, profesionales y proyectos independientes. Muchas decisiones comienzan desde el teléfono: el sitio debe cargar rápido, mostrar información concreta y permitir llamar, escribir o reservar sin pasos innecesarios. El diseño debe tener carácter, pero también resolver la navegación.',
    focus: [
      { title: 'Claridad en pocos segundos', text: 'La portada debe responder qué hace el negocio, dónde atiende y cómo iniciar una conversación.' },
      { title: 'Experiencia móvil', text: 'Priorizamos lectura, botones y formularios para una persona que llega desde una búsqueda local o una red social.' },
      { title: 'Identidad con propósito', text: 'La personalidad visual debe reforzar la confianza y no competir con la información principal.' },
    ],
    services: [
      'Landing pages para profesionales y servicios que parten con una oferta concreta.',
      'Sitios breves para estudios, consultas y comercios con estructura simple.',
      'Páginas de menú, servicios, reserva o catálogo cuando correspondan.',
      'SEO inicial para nombre de marca, servicio y búsquedas locales.',
    ],
    faqs: [
      { question: '¿Cuántas páginas necesita un negocio pequeño de Ñuñoa?', answer: 'Depende de la cantidad de servicios y preguntas del cliente. Puede ser una landing page clara o un sitio breve con páginas separadas.' },
      { question: '¿Puedo integrar WhatsApp?', answer: 'Sí. Podemos incorporar contacto por WhatsApp con el número comercial que entregue el cliente, además del formulario.' },
      { question: '¿Trabajan con restaurantes y locales?', answer: 'Sí, cuando el proyecto requiere una presencia clara con menú, servicios, ubicación o un proceso de contacto o reserva acorde a la operación.' },
    ],
    nearby: ['providencia', 'la-florida', 'santiago-centro'],
  },
  {
    slug: 'maipu',
    name: 'Maipú',
    title: 'Diseño web en Maipú',
    metaTitle: 'Diseño Web para Pymes en Maipú | RDS',
    description: 'Páginas web para pymes, comercios y servicios de Maipú. Diseño responsive, WhatsApp, formulario y estructura SEO para captar consultas.',
    intro: 'Diseñamos sitios web para pymes, comercios, servicios locales y empresas de Maipú que necesitan una presentación profesional y un canal de contacto que funcione desde el celular.',
    contextTitle: 'La web tiene que facilitar la venta y la consulta local',
    context: 'Maipú reúne comercio, servicios, talleres, empresas de distribución y actividades industriales. Para muchos negocios, la web no reemplaza la atención presencial: la ordena y permite que nuevos clientes encuentren información antes de escribir. Una estructura simple, horarios claros, ubicación y canales de contacto visibles suelen aportar más que una página cargada de mensajes genéricos.',
    focus: [
      { title: 'Información operativa visible', text: 'Servicios, horarios, cobertura y canales de contacto deben encontrarse sin recorrer una web extensa.' },
      { title: 'Confianza para comprar o cotizar', text: 'Fotografías propias, descripciones concretas y pruebas autorizadas reducen la incertidumbre.' },
      { title: 'Base preparada para crecer', text: 'La arquitectura permite sumar catálogo, servicios, sucursales o páginas de proyectos cuando el negocio lo necesite.' },
    ],
    services: [
      'Sitios para pymes y comercios con servicios, horarios y contacto directo.',
      'Landing pages para campañas y servicios específicos.',
      'Catálogos simples para empresas que aún cotizan por WhatsApp o formulario.',
      'Revisión de estructura local y enlaces hacia Google Business Profile cuando exista.',
    ],
    faqs: [
      { question: '¿Puedo mostrar productos sin tener una tienda online?', answer: 'Sí. Podemos crear un catálogo informativo y enviar las consultas a WhatsApp o formulario sin implementar pagos online.' },
      { question: '¿La web puede incluir mi ubicación?', answer: 'Sí, cuando el negocio cuenta con una dirección pública o un punto de atención verificable. No inventamos ubicaciones.' },
      { question: '¿Trabajan con negocios que recién comienzan?', answer: 'Sí. Podemos partir con un alcance acotado y dejar una estructura que permita ampliar servicios y contenidos después.' },
    ],
    nearby: ['puente-alto', 'la-florida', 'santiago-centro'],
  },
  {
    slug: 'la-florida',
    name: 'La Florida',
    title: 'Diseño web en La Florida',
    metaTitle: 'Diseño Web para Pymes en La Florida | RDS',
    description: 'Diseño de páginas web para pymes, profesionales y comercios de La Florida. Sitios móviles, claros y preparados con una base SEO inicial.',
    intro: 'Creamos webs para pymes, profesionales, centros de servicio y comercios de La Florida que necesitan explicar su oferta, facilitar consultas y sostener una imagen profesional frente a clientes locales.',
    contextTitle: 'Una experiencia digital simple para decisiones cotidianas',
    context: 'Los negocios de La Florida atienden a una comunidad amplia y diversa. La página debe funcionar para quien busca un servicio, compara horarios o necesita resolver una duda desde el teléfono. La organización del contenido y la velocidad importan tanto como el diseño. Por eso evitamos menús profundos y priorizamos información útil, contacto y pruebas reales.',
    focus: [
      { title: 'Búsqueda y lectura rápidas', text: 'Las personas deben entender el servicio principal y sus diferencias antes de llegar al contacto.' },
      { title: 'Presencia local responsable', text: 'La web comunica la zona de atención sin declarar oficinas ni sedes que no existan.' },
      { title: 'Contenido que reduce dudas', text: 'Resolvemos preguntas sobre cobertura, tiempos, proceso y canales antes de que el visitante tenga que escribir.' },
    ],
    services: [
      'Diseño responsive para comercios, profesionales y servicios de barrio.',
      'Páginas de servicio con preguntas frecuentes y formularios claros.',
      'Rediseño de sitios que no se adaptan al móvil o no explican bien la oferta.',
      'Optimización de títulos, encabezados y enlaces internos.',
    ],
    faqs: [
      { question: '¿Necesito una oficina en La Florida para contratar?', answer: 'No. La modalidad de reuniones y entregas puede ser remota dentro de la Región Metropolitana, según el proyecto.' },
      { question: '¿Pueden incluir reservas o agenda?', answer: 'Sí, siempre que el negocio tenga un proceso y una herramienta compatibles. El alcance se define antes de comenzar.' },
      { question: '¿El SEO local está incluido?', answer: 'El sitio incluye una base técnica y metadatos. El trabajo continuo de SEO local y la gestión de Google Business Profile se cotizan aparte.' },
    ],
    nearby: ['nunoa', 'maipu', 'puente-alto'],
  },
  {
    slug: 'puente-alto',
    name: 'Puente Alto',
    title: 'Diseño web en Puente Alto',
    metaTitle: 'Diseño Web en Puente Alto para Pymes | RDS',
    description: 'Diseñamos sitios web claros y rápidos para pymes y profesionales de Puente Alto. Incluye estructura SEO inicial y contacto por WhatsApp.',
    intro: 'Diseñamos webs para pymes, servicios, profesionales y comercios de Puente Alto que necesitan dar el siguiente paso digital con una presencia profesional, simple de administrar y preparada para recibir consultas.',
    contextTitle: 'Una presencia profesional para negocios en crecimiento',
    context: 'Muchos negocios de Puente Alto crecen por recomendación y atención directa. La web debe ordenar esa confianza y ampliar su alcance: mostrar qué ofrece el negocio, quién lo atiende, cómo trabaja y qué debe hacer un cliente nuevo. No necesitas una web enorme; necesitas una estructura honesta, rápida y coherente con la etapa del negocio.',
    focus: [
      { title: 'Una propuesta directa', text: 'La portada explica el servicio, el público y el beneficio sin frases vacías.' },
      { title: 'Contacto sin fricción', text: 'WhatsApp, teléfono y formulario se priorizan según la forma real de atender del negocio.' },
      { title: 'Preparación para crecer', text: 'La arquitectura permite añadir servicios, proyectos y contenidos sin reconstruir todo.' },
    ],
    services: [
      'Landing pages para profesionales y servicios con una oferta principal.',
      'Sitios corporativos breves para pymes establecidas.',
      'Rediseño de páginas lentas o difíciles de leer en móvil.',
      'Base SEO inicial y configuración de medición.',
    ],
    faqs: [
      { question: '¿Trabajan con emprendedores de Puente Alto?', answer: 'Sí. Podemos definir un alcance inicial acorde al negocio y ampliar el sitio a medida que aparezcan nuevas necesidades.' },
      { question: '¿La reunión puede ser por videollamada?', answer: 'Sí. Podemos trabajar de forma remota en la Región Metropolitana y coordinar reuniones presenciales cuando el proyecto lo justifique.' },
      { question: '¿Puedo actualizar la web después?', answer: 'La forma de edición se define según la tecnología del proyecto. Entregamos una explicación del funcionamiento y el alcance de administración acordado.' },
    ],
    nearby: ['la-florida', 'maipu', 'san-bernardo'],
  },
];

export const getLocalArea = (slug: string) => LOCAL_AREAS.find((area) => area.slug === slug);

export const getLocalAreaName = (slug: string) =>
  LOCAL_AREAS.find((area) => area.slug === slug)?.name ??
  slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
