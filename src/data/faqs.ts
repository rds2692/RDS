export const FAQ_CATEGORIES = [
  { id: 'proyecto', label: 'Proyecto' },
  { id: 'precios', label: 'Precios' },
  { id: 'proceso', label: 'Diseño y desarrollo' },
  { id: 'seo', label: 'SEO y visibilidad' },
  { id: 'soporte', label: 'Soporte y propiedad' },
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]['id'];

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  link?: { href: string; label: string };
  featured?: boolean;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'servicios-rds',
    category: 'proyecto',
    question: '¿Qué servicios ofrece RDS?',
    answer: 'RDS diseña y desarrolla sitios web, rediseña páginas existentes, audita problemas técnicos y SEO, y ofrece trabajo mensual de posicionamiento. También prepara contenido y estructuras para búsquedas locales y experiencias de búsqueda con IA.',
    link: { href: '/servicios/', label: 'Ver servicios' },
    featured: true,
  },
  {
    id: 'tipo-de-sitio',
    category: 'proyecto',
    question: '¿Necesito una landing page o un sitio corporativo?',
    answer: 'Una landing page concentra una campaña o un servicio principal. Un sitio corporativo organiza varios servicios, la empresa, casos y diferentes rutas de contacto. La elección depende del objetivo comercial, la cantidad de información y la etapa del negocio.',
    link: { href: '/diseno-web-empresas/', label: 'Conocer las webs para empresas' },
  },
  {
    id: 'empresas-y-pymes',
    category: 'proyecto',
    question: '¿Trabajan con pymes y profesionales independientes?',
    answer: 'Sí. El alcance se adapta a la etapa del negocio. Una pyme puede comenzar con una landing o un sitio breve y ampliar páginas, servicios o contenidos cuando sea necesario.',
    link: { href: '/precios/', label: 'Revisar alternativas' },
  },
  {
    id: 'cobertura-santiago',
    category: 'proyecto',
    question: '¿Atienden empresas de toda la Región Metropolitana?',
    answer: 'La coordinación principal es remota dentro de la Región Metropolitana. Si un proyecto requiere una instancia presencial, su viabilidad se acuerda antes de contratar. Las páginas por comuna describen cobertura de servicio, no oficinas que no existen.',
    link: { href: '/diseno-web-santiago/', label: 'Ver cobertura en Santiago' },
    featured: true,
  },
  {
    id: 'precio-web',
    category: 'precios',
    question: '¿Cuánto cuesta una página web?',
    answer: 'En RDS los proyectos web comienzan en $250.000 CLP para una landing page, $490.000 CLP para un sitio corporativo de hasta seis páginas y $750.000 CLP para una estructura de hasta diez páginas. Son valores base: el precio final depende del alcance, los contenidos y las funciones requeridas.',
    link: { href: '/precios/', label: 'Ver precios y entregables' },
    featured: true,
  },
  {
    id: 'pago',
    category: 'precios',
    question: '¿Cómo se pagan los proyectos?',
    answer: 'Los desarrollos web se pagan 50% al inicio y 50% antes de publicar. Las auditorías se pagan antes de comenzar. Las implementaciones y los planes mensuales tienen condiciones propias que se detallan en la propuesta.',
    link: { href: '/precios/', label: 'Leer condiciones comerciales' },
  },
  {
    id: 'hosting-dominio',
    category: 'precios',
    question: '¿El hosting y el dominio están incluidos?',
    answer: 'Se cotizan por separado, salvo que una propuesta indique expresamente lo contrario. Si ya tienes dominio y hosting, revisamos accesos y compatibilidad antes de definir el proyecto.',
  },
  {
    id: 'seo-mensual',
    category: 'precios',
    question: '¿El posicionamiento SEO mensual está incluido en la web?',
    answer: 'El desarrollo incluye una base SEO técnica y on-page según el plan, pero el trabajo continuo de posicionamiento es un servicio independiente. Cada mensualidad define páginas, contenidos y tareas incluidas.',
    link: { href: '/seo/', label: 'Ver planes SEO' },
    featured: true,
  },
  {
    id: 'plazo',
    category: 'proceso',
    question: '¿Cuánto tarda un proyecto web?',
    answer: 'Depende de la cantidad de páginas, funcionalidades, contenidos y revisiones. El plazo y sus dependencias se acuerdan antes de comenzar. La entrega de textos, imágenes y aprobaciones del cliente afecta directamente el calendario.',
  },
  {
    id: 'contenido',
    category: 'proceso',
    question: '¿Quién escribe el contenido?',
    answer: 'Puede entregarlo el cliente, escribirlo RDS dentro de un alcance de contenido o trabajarse de forma mixta. En todos los casos revisamos la claridad de la propuesta, la información de servicios y las preguntas que necesita responder cada página.',
  },
  {
    id: 'movil',
    category: 'proceso',
    question: '¿El sitio se adapta a celulares?',
    answer: 'Sí. La experiencia móvil forma parte del diseño y se revisa durante el desarrollo. Adaptar una web no consiste sólo en reducir elementos: los menús, formularios, lecturas y llamadas a la acción deben funcionar en pantallas pequeñas.',
  },
  {
    id: 'editar-despues',
    category: 'proceso',
    question: '¿Podré actualizar el sitio después?',
    answer: 'La forma de administración depende de la plataforma y del alcance. Algunos proyectos permiten editar contenido desde un panel; otros requieren cambios técnicos. La modalidad de entrega y el soporte posterior se explican antes de publicar.',
    featured: true,
  },
  {
    id: 'rediseno',
    category: 'proceso',
    question: '¿Puedo rediseñar sin perder lo que ya posiciona?',
    answer: 'Una migración debe revisar URLs, canonicales, redirecciones, contenido y enlaces internos. No se puede garantizar que todas las posiciones permanezcan iguales, pero una planificación técnica reduce riesgos evitables.',
    link: { href: '/rediseno-web/', label: 'Conocer el rediseño web' },
  },
  {
    id: 'seo-incluido',
    category: 'seo',
    question: '¿Tener una web significa aparecer en Google?',
    answer: 'No. Publicar no garantiza indexación ni posicionamiento. El sitio necesita ser rastreable, contener información útil, estar enlazado y competir por consultas relevantes. Search Console permite observar qué ocurre después de publicar.',
  },
  {
    id: 'garantia-posicion',
    category: 'seo',
    question: '¿Pueden garantizar la primera posición en Google?',
    answer: 'No. Ningún trabajo responsable puede garantizar una posición concreta. Se pueden mejorar bases técnicas, contenido, arquitectura y visibilidad, y medir impresiones, clics y consultas para decidir los siguientes pasos.',
  },
  {
    id: 'paginas-comuna',
    category: 'seo',
    question: '¿Las páginas por comuna ayudan a aparecer “cerca de mí”?',
    answer: 'Pueden ayudar a posicionar búsquedas orgánicas relacionadas con una comuna, pero no crean cercanía física. Los resultados locales de Google consideran relevancia, distancia y prominencia. Para Maps importan la ubicación real, el Perfil de Empresa y las reseñas.',
    link: { href: '/seo-local/', label: 'Entender el SEO local' },
    featured: true,
  },
  {
    id: 'google-business',
    category: 'seo',
    question: '¿Gestionan Google Business Profile?',
    answer: 'Se puede revisar o trabajar dentro de un plan cuando el negocio cumple los requisitos de Google y tiene un perfil válido. No creamos perfiles falsos ni uno por cada comuna. El negocio debe representar una ubicación o zona de servicio real.',
  },
  {
    id: 'ia',
    category: 'seo',
    question: '¿Pueden garantizar que ChatGPT o Google AI citen la web?',
    answer: 'No. El trabajo se centra en que la página sea accesible, clara, útil y verificable. Esas condiciones facilitan la comprensión, pero ninguna etiqueta o archivo garantiza menciones o citas en plataformas de IA.',
    link: { href: '/seo-ia/', label: 'Conocer GEO y AEO' },
  },
  {
    id: 'accesos',
    category: 'soporte',
    question: '¿Quién controla el dominio, hosting y cuentas?',
    answer: 'El acceso del cliente a las cuentas clave debe quedar definido en el proyecto. RDS puede trabajar con accesos autorizados, pero la titularidad de dominio, infraestructura y herramientas debe ser transparente.',
  },
  {
    id: 'soporte',
    category: 'soporte',
    question: '¿Qué ocurre después del lanzamiento?',
    answer: 'La entrega incluye las revisiones y la documentación acordadas. Los ajustes, la mantención y las nuevas funcionalidades pueden incluirse en el proyecto o cotizarse por separado. El alcance posterior se define antes de publicar.',
  },
  {
    id: 'auditoria',
    category: 'soporte',
    question: 'Si mi sitio actual fue creado por otro equipo, ¿qué hacen primero?',
    answer: 'Revisamos plataforma, accesos, hosting, CMS, tema, plugins y dependencias conocidas antes de intervenir. La auditoría permite documentar el estado, riesgos y prioridades; la implementación se cotiza después.',
    link: { href: '/auditoria-seo/', label: 'Ver auditoría SEO' },
  },
];

export const FEATURED_FAQS = FAQ_ITEMS.filter((item) => item.featured);
