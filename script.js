// ═══════════════════════════════════════
// DATA: FRAMEWORKS
// ═══════════════════════════════════════
const CATS = {
  fe:  {label:'Frontend UI',   color:'#c0392b', cls:'c-fe'  },
  meta:{label:'Meta-framework',color:'#1a5276', cls:'c-meta'},
  be:  {label:'Backend/API',   color:'#196f3d', cls:'c-be'  },
  cms: {label:'CMS Headless',  color:'#6c3483', cls:'c-cms' },
  nc:  {label:'No-Code',       color:'#d35400', cls:'c-nc'  },
};
const CAT_ORDER = ['fe','meta','be','cms','nc'];

const FWS = [
  {id:'react',     cat:'fe',   name:'React',       color:'#0f9aba', tagline:'La librería dominante de UI',           desc:'Librería de Facebook para interfaces basadas en componentes. Sin opiniones sobre router o estado — tú eliges todo. Base de Next.js, Remix y Gatsby.', uses:['SPA y dashboards interactivos','Apps con estado complejo','Cuando el equipo ya conoce React','Base para meta-frameworks']},
  {id:'angular',   cat:'fe',   name:'Angular',     color:'#dd0031', tagline:'Framework enterprise de Google',        desc:'Framework opinado y completo: router, HTTP, forms y DI incluidos. TypeScript obligatorio. Curva alta pero muy estructurado para equipos grandes.', uses:['Proyectos enterprise y corporativos','Equipos grandes con convenciones estrictas','Apps de gestión interna','Cuando TypeScript nativo importa']},
  {id:'vue',       cat:'fe',   name:'Vue.js',      color:'#42b883', tagline:'Progresivo y fácil de adoptar',         desc:'El equilibrio entre Angular y React. Progresivo: puedes añadirlo a una web existente o construir una SPA completa. Sintaxis limpia y curva suave.', uses:['Apps medianas con estado moderado','Equipos que vienen de templates HTML','Base para Nuxt','Proyectos que prefieren Vue sobre React']},
  {id:'svelte',    cat:'fe',   name:'Svelte',      color:'#ff3e00', tagline:'Sin virtual DOM, compilado',            desc:'Compila a JS vanilla en build time: sin runtime, sin virtual DOM. Bundle muy pequeño y sintaxis limpia. Base para SvelteKit.', uses:['Componentes con máximo rendimiento','Bundle muy reducido','Aprender compilación moderna','Base para SvelteKit']},
  {id:'next',      cat:'meta', name:'Next.js',     color:'#888',    tagline:'React full-stack, el estándar',         desc:'Meta-framework React más usado. Combina SSR, SSG, ISR, API Routes y Server Actions. Enorme ecosistema. Algo complejo en su App Router nuevo.', uses:['Apps React con SEO y SSR','SaaS y dashboards full-stack','Máxima demanda laboral JS','Cuando el equipo usa React']},
  {id:'astro',     cat:'meta', name:'Astro',       color:'#ff5d01', tagline:'HTML primero, JS mínimo',               desc:'Genera HTML estático por defecto y añade JS solo donde se necesita (Islands). Multi-framework. Ideal para sitios de contenido con SEO crítico.', uses:['Webs corporativas y portfolios','Blogs con SEO fuerte','Multiidioma (i18n nativo)','Rendimiento y velocidad críticos']},
  {id:'nuxt',      cat:'meta', name:'Nuxt',        color:'#00dc82', tagline:'El Next.js del ecosistema Vue',         desc:'Meta-framework Vue equivalente a Next.js. Excelente DX, auto-imports, i18n integrado y soporte SSR/SSG/ISR.', uses:['Webs Vue con SSR y SEO','Full-stack con convenciones Vue','Proyectos multiidioma','Si el equipo prefiere Vue']},
  {id:'remix',     cat:'meta', name:'Remix',       color:'#3992ff', tagline:'Web standards, rutas anidadas',         desc:'Abraza la plataforma web: loaders, actions y rutas anidadas. Excelente gestión de errores y formularios. Ahora parte de React Router v7.', uses:['SaaS con formularios complejos','Apps resilientes','Arquitectura web clásica actualizada','Cuando la DX de datos importa']},
  {id:'sveltekit', cat:'meta', name:'SvelteKit',   color:'#ff3e00', tagline:'Svelte con full-stack integrado',       desc:'Meta-framework sobre Svelte. Bundle mínimo, rendimiento top, DX excelente. Menos ecosistema que React/Vue pero creciendo.', uses:['Máximo rendimiento con SSR','Bundle pequeño prioritario','Full-stack Svelte','Apps donde JS mínimo importa']},
  {id:'gatsby',    cat:'meta', name:'Gatsby',      color:'#663399', tagline:'SSG pionero, hoy superado',             desc:'Pionero del SSG con React y GraphQL. Todavía funcional para sitios estáticos, pero Astro y Next.js lo superan en la mayoría de casos.', uses:['Proyectos legacy en Gatsby','Sites con fuentes GraphQL complejas','Migración progresiva','Blogs con plugin ecosystem']},
  {id:'express',   cat:'be',   name:'Express.js',  color:'#68a063', tagline:'Backend Node.js minimalista',           desc:'El framework Node.js más usado. Minimalista y sin opiniones: tú eliges todo. Base de miles de APIs REST y stacks MERN/MEAN.', uses:['APIs REST rápidas','Microservicios Node.js','Máxima libertad en backend','Base para aprender backend JS']},
  {id:'nest',      cat:'be',   name:'NestJS',      color:'#e0234e', tagline:'Node.js enterprise con TypeScript',     desc:'Framework Node.js opinado inspirado en Angular. TypeScript nativo, modular, soporte GraphQL, WebSockets y microservicios.', uses:['Backends enterprise con Node.js','APIs GraphQL y REST complejas','Equipos con experiencia Angular','Estructura estricta en backend']},
  {id:'fastapi',   cat:'be',   name:'FastAPI',     color:'#009688', tagline:'Python moderno y ultrarrápido',         desc:'El framework Python más rápido. Async nativo, validación automática con Pydantic, documentación Swagger auto-generada.', uses:['APIs de AI/ML','Data pipelines Python','Documentación automática','Prototipos rápidos en Python']},
  {id:'django',    cat:'be',   name:'Django',      color:'#2d7a4f', tagline:'Python batteries-included',             desc:'Framework Python completo con ORM, admin, auth y todo incluido. Seguro, estable y con décadas de producción.', uses:['Apps con datos complejos y admin','Plataformas con ML/AI integrado','Sectores educación, gobierno, fintech','Equipo Python-first']},
  {id:'laravel',   cat:'be',   name:'Laravel',     color:'#ff2d20', tagline:'PHP elegante y productivo',             desc:'El framework PHP más popular y elegante. Ecosistema maduro, Eloquent ORM, queues y broadcasting.', uses:['Apps de negocio en PHP','Equipo PHP existente','SaaS con backend robusto','Ecosistema PHP']},
  {id:'rails',     cat:'be',   name:'Ruby on Rails',color:'#cc0000',tagline:'Convenciones sobre configuración',     desc:'Convention over configuration. Productivísimo para CRUDs y MVPs. Dos décadas de track record.', uses:['Startups que necesitan ir rápido','MVPs y prototipos CRUD','Equipo con experiencia Ruby','REST arquitectura clásica']},
  {id:'strapi',    cat:'cms',  name:'Strapi',      color:'#4945ff', tagline:'CMS headless open-source',             desc:'CMS headless Node.js open-source. Panel de admin personalizable, API REST y GraphQL automáticas. Self-hosted o cloud.', uses:['CMS con control total','Backend de contenido para Astro/Next','Sin vendor lock-in','API de contenido personalizada']},
  {id:'sanity',    cat:'cms',  name:'Sanity',      color:'#f03e2f', tagline:'CMS estructurado y flexible',           desc:'CMS headless con editor (Sanity Studio) personalizable en React. Esquemas en código, tiempo real, excelente DX para devs.', uses:['CMS como producto','Contenido muy estructurado','CMS como código','Tiempo real y colaboración']},
  {id:'contentful',cat:'cms',  name:'Contentful',  color:'#2478cc', tagline:'CMS headless SaaS líder',              desc:'El CMS headless SaaS más adoptado en enterprise. Fiable, bien documentado, con SDKs para todo.', uses:['Enterprise con presupuesto CMS','Equipos no técnicos','CDN global','Integraciones marketing']},
  {id:'wordpress', cat:'cms',  name:'WordPress',   color:'#21759b', tagline:'El rey del CMS clásico',               desc:'El CMS más usado del mundo. Puede usarse como headless (REST API + WPGraphQL) o clásico. Enorme ecosistema de plugins.', uses:['Marketing publicando a diario','Blogs y medios','Cuando el cliente exige WordPress','CMS headless con WPGraphQL']},
  {id:'webflow',   cat:'nc',   name:'Webflow',     color:'#4353ff', tagline:'Diseño visual sin backend',            desc:'La herramienta no-code más potente para marketing. Editor visual, CMS integrado, animaciones CSS avanzadas.', uses:['Sites de marketing y landings','Agencias con clientes no técnicos','Time-to-market muy corto','Diseño como prioridad']},
  {id:'framer',    cat:'nc',   name:'Framer',      color:'#0055ff', tagline:'Diseño + publicación en uno',           desc:'Herramienta de diseño que genera sitios publicables. Basada en React, soporte CMS, animaciones avanzadas. Popular en diseño.', uses:['Portfolios de diseñadores','Landings con animaciones complejas','Equipos sin devs','Prototipado que va a producción']},
  {id:'bubble',    cat:'nc',   name:'Bubble',      color:'#4040c8', tagline:'No-code para apps complejas',           desc:'Plataforma no-code para construir apps web con lógica real: bases de datos, flujos, pagos, auth incluidos.', uses:['MVPs sin equipo técnico','Apps con lógica de negocio','Startups validando ideas','Presupuesto de desarrollo bajo']},
  {id:'shopify',   cat:'nc',   name:'Shopify',     color:'#96bf48', tagline:'E-commerce sin reinventar la rueda',   desc:'Plataforma SaaS de e-commerce más usada. Checkout, pagos, inventario y logística integrados.', uses:['Tiendas online','Sin gestionar infra','Headless commerce + Next.js','Escalabilidad e-commerce']},
  {id:'supabase',  cat:'nc',   name:'Supabase',    color:'#3ecf8e', tagline:'Firebase open-source alternativo',     desc:'Backend-as-a-Service open-source: PostgreSQL, auth, storage, realtime y edge functions incluidos. Combina con cualquier frontend.', uses:['Backend rápido con auth','SQL con BaaS','Alternativa open-source a Firebase','Full-stack React/Vue/Svelte']},
];
const FW_MAP = {};
FWS.forEach(f => FW_MAP[f.id] = f);

const CRITERIA = [
  {crit:'SEO y rendimiento inicial',        cond:'Cargar rápido, posicionar bien',                 wins:{astro:2,nuxt:2,sveltekit:2,next:1,gatsby:1,wordpress:1,webflow:1,framer:1}},
  {crit:'Sitio de contenido / corporativo', cond:'Web empresa, landing, portfolio, blog',           wins:{astro:2,webflow:2,framer:2,next:1,nuxt:1,gatsby:1,wordpress:1}},
  {crit:'Multiidioma (i18n)',               cond:'Muchas páginas por idioma',                       wins:{astro:2,nuxt:2,next:1,sveltekit:1,wordpress:1}},
  {crit:'App interactiva compleja',         cond:'Dashboard, panel, estados complejos',             wins:{react:2,angular:2,next:2,remix:2,nuxt:1,vue:1}},
  {crit:'Backend integrado',                cond:'APIs, auth, server actions, SSR avanzado',        wins:{next:2,nuxt:2,remix:2,sveltekit:2,nest:2,django:2,laravel:2,rails:2,express:1}},
  {crit:'APIs REST o GraphQL',              cond:'Exponer endpoints para consumir desde frontend',  wins:{fastapi:2,nest:2,express:2,django:2,laravel:2,strapi:2,supabase:2,rails:1}},
  {crit:'AI / ML integrado',               cond:'Modelos de IA, data pipelines, inferencia',       wins:{fastapi:2,django:2,express:1,nest:1,supabase:1}},
  {crit:'Máxima flexibilidad de stack',     cond:'Elegir tú router, estado, librerías',             wins:{react:2,express:2,svelte:1,vue:1}},
  {crit:'Curva de entrada baja',            cond:'Avanzar rápido con menos complejidad',            wins:{astro:2,vue:2,webflow:2,framer:2,bubble:2,nuxt:1,supabase:1}},
  {crit:'Ecosistema y empleo',              cond:'Stack muy demandado en mercado laboral',          wins:{react:2,next:2,angular:2,django:1,laravel:1,vue:1}},
  {crit:'Full-stack con convenciones',      cond:'El framework marca la estructura',                wins:{next:2,nuxt:2,sveltekit:2,remix:2,laravel:2,rails:2,django:2}},
  {crit:'CMS para equipo no técnico',       cond:'Equipo editorial publicando a diario',            wins:{wordpress:2,contentful:2,sanity:2,strapi:1,webflow:1}},
  {crit:'E-commerce',                       cond:'Tienda, checkout, catálogo de productos',         wins:{shopify:2,next:1,nuxt:1,laravel:1,wordpress:1}},
  {crit:'Bundle pequeño / JS mínimo',       cond:'Máximo rendimiento, menos KB al cliente',         wins:{astro:2,svelte:2,sveltekit:2,remix:1,vue:1}},
  {crit:'Time-to-market muy rápido',        cond:'Entregar en días, sin montar infra compleja',     wins:{webflow:2,framer:2,bubble:2,shopify:2,supabase:2,astro:1,rails:1}},
  {crit:'Proyecto enterprise / gran equipo',cond:'Estructura, tipado, gobernanza del código',       wins:{angular:2,nest:2,django:2,laravel:2,next:1,contentful:1}},
  {crit:'MVP / startup validando idea',     cond:'Ir rápido, pivotar fácil, mínima infra',          wins:{bubble:2,supabase:2,rails:2,laravel:1,next:1,webflow:1}},
  {crit:'Realtime (websockets, live data)', cond:'Chat, notificaciones, datos en tiempo real',      wins:{supabase:2,nest:2,express:1,next:1,sveltekit:1}},
];

const GUIDE_RULES = [
  {if_:'El 80% del proyecto es contenido, SEO y páginas informativas',  then:'Astro',            note:'Añade un CMS headless (Strapi, Sanity) para contenido dinámico'},
  {if_:'Necesitas una app React con lógica compleja y SEO',             then:'Next.js',           note:'El estándar del mercado para React full-stack'},
  {if_:'El equipo prefiere Vue en lugar de React',                      then:'Nuxt',              note:'Equivalente a Next.js en el ecosistema Vue'},
  {if_:'Quieres aprender las bases puras del frontend',                 then:'React + Vite',      note:'Sin opiniones, tú montas todas las piezas'},
  {if_:'Necesitas máximo rendimiento y bundle mínimo',                  then:'Astro / SvelteKit', note:'Ambos priorizan JS mínimo al cliente'},
  {if_:'API en Python para proyectos AI/ML',                            then:'FastAPI',           note:'Async nativo, validación automática, Swagger incluido'},
  {if_:'El stack es PHP o el cliente lo exige',                         then:'Laravel',           note:'El framework PHP más elegante y productivo'},
  {if_:'Startup validando un MVP lo antes posible',                     then:'Rails o Bubble',    note:'Rails si hay dev, Bubble si no hay equipo técnico'},
  {if_:'Backend Node.js para proyecto enterprise',                      then:'NestJS',            note:'Modular, TypeScript nativo, inspirado en Angular'},
  {if_:'Equipo de contenido no técnico publicando a diario',            then:'WordPress / Contentful', note:'Headless o clásico según complejidad del frontend'},
  {if_:'CMS headless personalizable open-source',                       then:'Strapi',            note:'Self-hosted, API automática, sin vendor lock-in'},
  {if_:'Prioridad: entrega rápida con diseño visual sin backend',       then:'Webflow / Framer',  note:'No-code para sites de marketing y portfolios'},
  {if_:'Tienda online funcional desde el primer día',                   then:'Shopify',           note:'Checkout, pagos y logística incluidos'},
  {if_:'Backend con auth, DB y storage sin configurar servidores',      then:'Supabase',          note:'Firebase open-source con PostgreSQL real'},
  {if_:'App con alta interactividad y formularios complejos',           then:'Remix',             note:'Loaders y actions sobre estándares web'},
  {if_:'Proyecto enterprise JS con estructura muy estricta',            then:'Angular + NestJS',  note:'El stack más opinado del mundo JS'},
];

// ═══════════════════════════════════════
// DATA: GLOSSARY
// ═══════════════════════════════════════
const GLOSSARY = [
  {term:'SSR',             cat:'rendering',     def:'Server-Side Rendering. La página HTML se genera en el servidor en cada petición. El usuario recibe HTML listo, no un JS vacío que luego se rellena. Mejora SEO y primera carga visible.', example:'Next.js con getServerSideProps genera una página de producto en el servidor antes de enviarla al browser.'},
  {term:'SSG',             cat:'rendering',     def:'Static Site Generation. Las páginas HTML se generan en el momento del build, no en cada petición. Velocísimo y barato de servir. Ideal cuando el contenido no cambia por usuario.', example:'Astro genera tu blog completo en HTML durante el deploy. No hay servidor procesando cada visita.'},
  {term:'CSR',             cat:'rendering',     def:'Client-Side Rendering. El servidor envía un HTML casi vacío + un JS grande. El browser ejecuta el JS y construye la página. Peor SEO y primera carga más lenta, pero muy reactivo tras cargar.', example:'Una SPA de React pura (Create React App) es CSR: el HTML inicial tiene un solo div vacío.'},
  {term:'ISR',             cat:'rendering',     def:'Incremental Static Regeneration. Híbrido: genera páginas estáticas pero las regenera en background cada N segundos. Combina velocidad de SSG con frescura de SSR.', example:'Tu tienda en Next.js regenera la página de producto cada 60 segundos aunque sirva HTML estático en cache.'},
  {term:'Hydration',       cat:'rendering',     def:'El proceso de "dar vida" al HTML estático: el JS descargado conecta los event handlers y el estado a la estructura HTML ya existente. Si falla, el HTML se ve pero los botones no hacen nada.', example:'Astro envía HTML puro. Cuando el usuario hace scroll y aparece un slider, Astro hidrata solo ese componente.'},
  {term:'Islands Architecture',cat:'rendering',def:'Patrón donde la mayoría de la página es HTML estático y solo pequeñas "islas" son componentes interactivos que se hidratan. Minimiza el JS enviado al cliente.', example:'Astro usa este patrón: tu navbar y footer son HTML puro, pero el carrusel es una isla React que carga solo cuando es visible.'},
  {term:'API Endpoint',    cat:'arquitectura',  def:'Una URL específica que tu servidor expone para recibir o devolver datos. Como una ventanilla: tú preguntas a /api/productos y el servidor te devuelve la lista en JSON.', example:'GET /api/users/123 devuelve el usuario con id 123. POST /api/users crea uno nuevo.'},
  {term:'REST',            cat:'arquitectura',  def:'Estilo de diseño de APIs usando HTTP (GET, POST, PUT, DELETE) con URLs que representan recursos. El estándar más común para comunicar frontend y backend.', example:'GET /api/posts → lista posts. POST /api/posts → crea post. DELETE /api/posts/5 → borra post 5.'},
  {term:'GraphQL',         cat:'arquitectura',  def:'Alternativa a REST donde el cliente especifica exactamente qué datos quiere en una sola petición. Evita over-fetching (recibir más datos de los necesarios) y under-fetching.', example:'En REST necesitarías 3 llamadas para usuario + posts + comentarios. En GraphQL una sola query trae exactamente lo que pides.'},
  {term:'Middleware',      cat:'arquitectura',  def:'Código que se ejecuta entre que llega una petición al servidor y llega a tu lógica principal. Útil para auth, logging, validación o transformar datos en tránsito.', example:'En Express: el middleware de auth verifica el token JWT antes de que la petición llegue a tu función que devuelve los datos del usuario.'},
  {term:'State Management',cat:'datos',         def:'Sistema para gestionar el estado (datos que cambian) de tu app. Cuando el estado es complejo o compartido entre muchos componentes, necesitas una solución dedicada como Redux, Zustand o Pinia.', example:'Un carrito de compra que debe estar disponible en el header, la página de producto y el checkout necesita state management.'},
  {term:'Fetch / Data Fetching',cat:'datos',    def:'El proceso de obtener datos de una API externa o propia. En el frontend se hace con fetch(), axios o librerías como React Query / TanStack Query que añaden cache y estados de carga.', example:'Al cargar tu perfil, el frontend hace fetch(\'/api/me\') y mientras espera muestra un spinner.'},
  {term:'ORM',             cat:'datos',         def:'Object-Relational Mapper. Librería que te permite interactuar con la base de datos usando código en lugar de SQL puro. Convierte filas de tabla en objetos de tu lenguaje.', example:'Con Prisma (ORM): const users = await prisma.user.findMany() en lugar de SELECT * FROM users;'},
  {term:'Token / JWT',     cat:'datos',         def:'JSON Web Token. Un string codificado que contiene información del usuario (id, rol, expiración) y viaja en cada petición para demostrar que estás autenticado sin consultar la DB cada vez.', example:'Tras hacer login, el servidor te da un JWT. Lo guardas en localStorage y lo mandas en el header de cada petición: Authorization: Bearer <token>'},
  {term:'Build',           cat:'deploy',        def:'El proceso de transformar tu código fuente (TypeScript, JSX, SCSS) en archivos optimizados que el browser puede entender (JS, CSS, HTML). Incluye minificación, tree-shaking y optimización de imágenes.', example:'npm run build convierte tus archivos .jsx en un directorio /dist con JS minimizado y con hash en el nombre para cache-busting.'},
  {term:'CI/CD',           cat:'deploy',        def:'Continuous Integration / Continuous Deployment. Sistema que automáticamente testea y despliega tu código cada vez que haces push. Si los tests pasan, va a producción solo.', example:'Cada vez que haces git push, GitHub Actions ejecuta los tests y si pasan, Vercel despliega automáticamente en 2 minutos.'},
  {term:'CDN',             cat:'deploy',        def:'Content Delivery Network. Red de servidores distribuidos por el mundo que sirven tus archivos estáticos desde el servidor más cercano al usuario. Reduce latencia enormemente.', example:'Un usuario en Tokio que visita tu web europea recibe las imágenes y CSS desde un servidor CDN en Asia, no desde tu servidor en Frankfurt.'},
  {term:'Edge Functions',  cat:'deploy',        def:'Funciones que se ejecutan en los nodos del CDN, no en un servidor central. Latencia casi cero porque se ejecutan "cerca" del usuario. Perfectas para auth, personalizaciones y A/B testing.', example:'Vercel Edge Functions: la lógica de redirección según el país del usuario se ejecuta en el nodo CDN más cercano, no en tu servidor de Frankfurt.'},
  {term:'Design Token',    cat:'ds',            def:'Variable que almacena un valor de diseño (color, tamaño, espaciado, tipografía) de forma nombrada y reutilizable. Son la fuente de verdad que conecta Figma con el código.', example:'El token --color-primary: #0055FF en CSS corresponde al "Primary/500" en Figma. Si cambia en Figma, se actualiza en código automáticamente.'},
  {term:'Component Library',cat:'ds',           def:'Colección de componentes UI reutilizables (botones, inputs, modales) con su código y documentación. Es la implementación en código del Design System.', example:'shadcn/ui es una component library: instalas el paquete y tienes Button, Dialog, Input listos para usar con tokens ya configurados.'},
  {term:'Headless Component',cat:'ds',          def:'Componente que provee la lógica y accesibilidad (ARIA, keyboard nav, estados) pero sin estilos visuales. Tú añades el CSS. Máxima flexibilidad visual manteniendo la funcionalidad.', example:'Radix UI provee un Headless Dialog: gestiona el foco, el escape, el overlay y el ARIA, pero tú le pones los estilos que quieras.'},
  {term:'Storybook',       cat:'ds',            def:'Herramienta para desarrollar y documentar componentes UI de forma aislada. Cada componente tiene sus "stories" que muestran todos sus estados posibles. Es la UI del Design System.', example:'En Storybook puedes ver tu Button en estado default, hover, disabled, loading y con icono, todo sin abrir la app real.'},
  {term:'OKLCH',           cat:'ds',            def:'Modelo de color perceptual: L (lightness), C (chroma) y H (hue). En muchos flujos de diseño el chroma se gestiona como porcentaje relativo para mantener una intensidad coherente entre tonos y estados.', example:'En una rampa: mismo hue, L de 95 a 25 y C ajustado por porcentaje según cada paso para conservar contraste visual.'},
];

// ═══════════════════════════════════════
// DATA: VIBETIPS
// ═══════════════════════════════════════
const VIBETIPS = [
  {fw:'next',    fwlabel:'Next.js', fwcolor:'#888', type:'Arquitectura', title:'App Router con Server Components', desc:'Indica el patrón correcto de Next.js 14+ para que la IA no mezcle paradigmas viejos con nuevos.', prompt:'Actúa como experto en Next.js 14 con App Router. Usa Server Components por defecto y solo añade "use client" cuando sea estrictamente necesario (eventos, hooks de estado). Estructura el proyecto así: /app para rutas, /components/ui para componentes reutilizables, /lib para utilidades. No uses getServerSideProps ni getStaticProps — esos son del Pages Router antiguo.'},
  {fw:'next',    fwlabel:'Next.js', fwcolor:'#888', type:'Datos',        title:'Fetching de datos con cache',      desc:'Evita que la IA genere fetch sin control de cache, lo más común en código Next.js de mala calidad.', prompt:'En Next.js App Router, implementa fetching de datos con estas reglas: usa fetch() nativo con opciones de revalidación explícitas ({next: {revalidate: 60}} para ISR, {cache: "no-store"} para datos en tiempo real). Nunca uses useEffect para fetching en Server Components. Para datos de usuario, usa cookies() o headers() del paquete next/headers.'},
  {fw:'astro',   fwlabel:'Astro',   fwcolor:'#ff5d01', type:'Rendimiento', title:'Islands con carga diferida',   desc:'El error más común en Astro es hidratar todo. Este prompt fuerza el patrón correcto.', prompt:'Actúa como experto en Astro. Sigue estas reglas de hidratación: usa client:load solo si el componente es crítico y visible al inicio. Usa client:idle para componentes secundarios. Usa client:visible para componentes que aparecen con scroll. Usa client:only para componentes que no pueden renderizarse en el servidor (mapas, gráficos con DOM). El resto del HTML debe ser estático sin JS.'},
  {fw:'react',   fwlabel:'React',   fwcolor:'#0f9aba', type:'Estado',     title:'Estado con Zustand',             desc:'Zustand es la solución de estado más limpia para React. Este prompt genera código idiomático.', prompt:'Usa Zustand para gestionar el estado global de esta feature. Crea el store en /store/[nombre]Store.ts con tipado TypeScript completo. Estructura el store con: state (los datos), actions (funciones que modifican el estado, siempre inmutables con set()), y selectors (funciones para derivar datos del estado). No uses Redux ni Context API para esto.'},
  {fw:'astro',   fwlabel:'Astro',   fwcolor:'#ff5d01', type:'i18n',       title:'Multiidioma con i18n nativo',   desc:'La forma correcta de implementar i18n en Astro sin librerías externas.', prompt:'Implementa multiidioma en Astro usando su sistema de i18n nativo (Astro 4+). Configura en astro.config.mjs: i18n con defaultLocale y locales. Crea la estructura /src/i18n/[idioma].json para las traducciones. Genera rutas automáticas por idioma. Usa la función getRelativeLocaleUrl() para los enlaces entre idiomas. No uses react-i18next ni i18next — Astro tiene esto integrado.'},
  {fw:'fastapi', fwlabel:'FastAPI', fwcolor:'#009688', type:'API',        title:'Endpoint con validación Pydantic', desc:'FastAPI sin Pydantic bien definido es código frágil. Este prompt genera el patrón correcto.', prompt:'Actúa como experto en FastAPI. Para cada endpoint: define un modelo Pydantic de Request y otro de Response con tipos explícitos y validaciones (Field con constraints). Usa status_code explícito en el decorador. Documenta con docstring para la descripción en Swagger. Gestiona errores con HTTPException y códigos semánticos (400 para validación, 404 para no encontrado, 422 para datos inválidos). Añade el router en un archivo separado, no todo en main.py.'},
  {fw:'supabase',fwlabel:'Supabase',fwcolor:'#3ecf8e', type:'Auth',       title:'Auth con Row Level Security', desc:'Supabase sin RLS es una base de datos abierta. Este prompt genera el patrón seguro.', prompt:'Implementa auth con Supabase siguiendo estas reglas de seguridad: activa Row Level Security (RLS) en todas las tablas. Crea policies específicas: SELECT para que cada usuario solo vea sus propios datos (auth.uid() = user_id). Usa el cliente de servidor (createServerClient) en Next.js Server Components, nunca el cliente browser para operaciones sensibles. Nunca expongas el service_role key en el frontend.'},
  {fw:'general', fwlabel:'General', fwcolor:'#5a6080', type:'Estructura', title:'Estructura de proyecto limpia', desc:'El prompt más universal: fuerza al agente a generar código organizado desde el principio.', prompt:'Antes de escribir código, define la estructura de carpetas completa y el propósito de cada una. Sigue estas reglas: separa concerns (UI, lógica de negocio, acceso a datos). Usa barrel files (index.ts) para re-exportar. Nombra archivos en kebab-case, componentes en PascalCase, hooks con use prefix. Escribe TypeScript estricto (no any). Añade comentarios solo cuando el "por qué" no es obvio — nunca el "qué".'},
  {fw:'general', fwlabel:'General', fwcolor:'#5a6080', type:'Revisión',   title:'Auditar código generado',       desc:'Usa este prompt para que la IA revise código que ya generó antes de aceptarlo.', prompt:'Revisa el código anterior como si fueras un senior developer haciendo code review. Identifica: 1) Problemas de seguridad (datos expuestos, validación faltante). 2) Problemas de rendimiento (renders innecesarios, fetching ineficiente, N+1 queries). 3) Malas prácticas del framework usado. 4) Código duplicado que debería extraerse. 5) Tipado incompleto o uso de any. Proporciona el código corregido con comentarios explicando cada cambio.'},
];

// ═══════════════════════════════════════
// DATA: HOSTING
// ═══════════════════════════════════════
const HOSTING = [
  {name:'Vercel',        color:'#fff',    tagline:'El hosting de Next.js y meta-frameworks', desc:'Creado por el equipo de Next.js. Despliega con git push, preview URLs automáticas, Edge Functions y CDN global. El estándar para proyectos JS modernos.', pills:['Next.js','Astro','Nuxt','SvelteKit','Remix'], best:'Frontend y full-stack JS. Gratis para proyectos pequeños.'},
  {name:'Netlify',       color:'#00c7b7', tagline:'Hosting JAMstack maduro y fiable',        desc:'Pionero en el hosting estático con CI/CD integrado. Excelente para sitios Astro o sites puramente estáticos. Forms y functions incluidas.', pills:['Astro','Gatsby','Vue','Svelte'], best:'Sites estáticos y JAMstack. Muy estable y bien documentado.'},
  {name:'Railway',       color:'#7b5ea7', tagline:'Backend en contenedores sin fricción',    desc:'Despliega cualquier backend con Dockerfile o buildpack automático. Bases de datos PostgreSQL, MySQL y Redis incluidas. El Heroku moderno.', pills:['Django','Laravel','Rails','Express','NestJS'], best:'Backend Python, PHP, Ruby o Node.js. Bases de datos incluidas.'},
  {name:'Render',        color:'#46e3b7', tagline:'Alternativa a Railway más económica',     desc:'Similar a Railway pero con tier gratuito generoso. Auto-deploy desde Git, bases de datos, cron jobs y services. Buena opción para proyectos con presupuesto ajustado.', pills:['Django','Express','FastAPI','Laravel'], best:'Backend con poco presupuesto. Tier gratuito incluye bases de datos.'},
  {name:'Fly.io',        color:'#8b5cf6', tagline:'Despliegue global cercano al usuario',   desc:'Ejecuta contenedores Docker en múltiples regiones simultáneamente. Latencia mínima para apps con usuarios en todo el mundo. Más técnico pero muy potente.', pills:['Cualquier Docker','Elixir','Go','Rails'], best:'Apps que necesitan presencia multi-región y baja latencia global.'},
  {name:'Cloudflare Pages', color:'#f38020', tagline:'CDN + deploy estático ultrarrápido', desc:'Build y deploy de sites estáticos sobre la CDN más grande del mundo. Workers para lógica edge. Tier gratuito muy generoso con límites altos.', pills:['Astro','SvelteKit','Vue','React'], best:'Sites con tráfico alto y rendimiento crítico. El CDN es imbatible.'},
  {name:'Supabase',      color:'#3ecf8e', tagline:'Backend-as-a-Service completo',          desc:'No es solo hosting: es PostgreSQL + Auth + Storage + Realtime + Edge Functions en un paquete. El backend de tu app sin gestionar servidores.', pills:['Next.js','Astro','Nuxt','SvelteKit'], best:'Cuando necesitas base de datos + auth + backend sin devops.'},
  {name:'AWS / GCP / Azure', color:'#ff9900', tagline:'Cloud enterprise para escala real',  desc:'Los tres grandes clouds. Máxima flexibilidad y escala, pero complejidad alta. Necesitas conocimientos de devops o un equipo dedicado. Para proyectos enterprise o con requerimientos específicos.', pills:['Cualquier stack'], best:'Proyectos enterprise, compliance específico o escala masiva.'},
];

// ═══════════════════════════════════════
// DATA: ROADMAP
// ═══════════════════════════════════════
const PHASES = [
  {
    num:'Fase 01', title:'Fundamentos de Decisión', status:'live', statusLabel:'En vivo',
    why:'La base de todo: entender qué tecnología usar en cada contexto y cómo medir si lo que construyes tiene calidad. Sin esto, el VibeCoding produce cajas negras que no entiendes.',
    connection:'Elegir Astro (Frameworks) afecta directamente las métricas de "Velocidad de entrega" y "Bundle pequeño" del Design System.',
    items:[
      {name:'Matriz de Frameworks', tag:'live', tagColor:'#a8f0c8', desc:'25 tecnologías, 5 categorías, criterios de decisión y guía rápida. Base para decidir qué pedirle a la IA.'},
      {name:'Métricas de Design Systems', tag:'live', tagColor:'#a8f0c8', desc:'6 categorías de métricas para medir si lo que la IA construye es consistente, reutilizable y de calidad.'},
    ]
  },
  {
    num:'Fase 02', title:'Vocabulario y Recetas', status:'next', statusLabel:'Siguiente',
    why:'La IA usa términos técnicos constantemente. Sin entenderlos, no puedes guiarla bien ni detectar cuando el código que genera es incorrecto. Los prompts estructurales son las "recetas" para obtener código de calidad.',
    connection:'Entender "Hydration" (Glosario) te permite usar correctamente el prompt de Islands Architecture (VibeTips) para que Astro genere el código óptimo.',
    items:[
      {name:'Glosario Técnico', tag:'wip', tagColor:'var(--t1)', desc:'~25 términos que la IA usa y confunden. Con definición, ejemplo práctico y relación con los frameworks de la Fase 01.'},
      {name:'VibeTips · Prompts', tag:'wip', tagColor:'var(--t1)', desc:'Recetas de prompts estructurales por framework y tipo de tarea. Copia, adapta y úsalos para guiar a la IA hacia código de calidad.'},
    ]
  },
  {
    num:'Fase 03', title:'Infraestructura y Deploy', status:'later', statusLabel:'Planificado',
    why:'Saber hacer algo no sirve si no sabes dónde "vivirá". Esta fase cierra el ciclo: desde decidir el framework hasta dónde y cómo desplegarlo, con los costes reales de cada opción.',
    connection:'"Elegí Astro → ¿Vercel o Cloudflare Pages? ¿Qué es una Edge Function?" — conecta decisiones de Frameworks con el destino final del proyecto.',
    items:[
      {name:'Matriz de Hosting', tag:'plan', tagColor:'var(--muted)', desc:'Vercel, Netlify, Railway, Render, Fly.io, Cloudflare. Cuándo usar cada uno, costes reales y compatibilidad con frameworks.'},
      {name:'Guía de Dominio y DNS', tag:'plan', tagColor:'var(--muted)', desc:'Qué es un dominio, qué es DNS, cómo conectar tu dominio a Vercel/Netlify. El paso que siempre confunde a no-devs.'},
    ]
  },
  {
    num:'Fase 04', title:'Flujo de Trabajo Completo', status:'later', statusLabel:'Planificado',
    why:'Integrar todo en un flujo de trabajo real de VibeCoding: desde la idea hasta producción, usando las herramientas de este OS como brújula en cada decisión.',
    connection:'Un flujo que conecta todos los módulos: Idea → Glosario (entiendo los términos) → Frameworks (elijo la tecnología) → VibeTips (prompts correctos) → Hosting (dónde lo subo) → DS Metrics (mido la calidad).',
    items:[
      {name:'Canvas de Proyecto', tag:'plan', tagColor:'var(--muted)', desc:'Plantilla interactiva para definir un proyecto: tipo de web, interactividad, equipo, budget y tiempo → el OS recomienda el stack completo.'},
      {name:'Checklist de Calidad', tag:'plan', tagColor:'var(--muted)', desc:'Lista de verificación antes de publicar: accesibilidad, rendimiento, consistencia de DS, seguridad básica. Adaptada a no-devs.'},
      {name:'Diario de Aprendizaje', tag:'plan', tagColor:'var(--muted)', desc:'Sección para registrar decisiones tomadas, errores cometidos y conceptos aprendidos en cada proyecto de VibeCoding.'},
    ]
  },
];

// ═══════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════

let currentGlosaryCat = 'all';

function renderFrameworks() {
  // CRITERIA TABLE
  const fwOrder = [];
  CAT_ORDER.forEach(c => FWS.filter(f=>f.cat===c).forEach(f=>fwOrder.push(f.id)));

  const head = document.getElementById('fw-crit-head');
  head.innerHTML = '<th>Criterio</th><th>Cuando esta es tu prioridad…</th>';
  fwOrder.forEach(id => {
    const fw = FW_MAP[id], cat = CATS[fw.cat];
    const th = document.createElement('th');
    th.textContent = fw.name; th.className = cat.cls;
    head.appendChild(th);
  });

  const tbody = document.getElementById('fw-crit-body');
  CRITERIA.forEach(row => {
    const tr = document.createElement('tr');
    let c = `<td>${row.crit}</td><td>${row.cond}</td>`;
    fwOrder.forEach(id => {
      const v = row.wins[id]||0;
      c += v===2 ? `<td><span class="w2 s2">★</span></td>`
         : v===1 ? `<td><span class="w2 s1">◆</span></td>`
         :         `<td><span class="w2 s0">·</span></td>`;
    });
    tr.innerHTML = c; tbody.appendChild(tr);
  });

  // PROFILES
  const wrap = document.getElementById('fw-profiles-wrap');
  CAT_ORDER.forEach(cat => {
    const fws = FWS.filter(f=>f.cat===cat);
    const info = CATS[cat];
    const block = document.createElement('div');
    block.className = 'cat-block';
    block.innerHTML = `<div class="cat-title" style="color:${info.color}">${info.label} <span class="cat-count">${fws.length} tecnologías</span></div>`;
    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    fws.forEach(fw => {
      const card = document.createElement('div');
      card.className = 'fw-card';
      card.innerHTML = `
        <div class="fw-card-bar" style="background:${fw.color}"></div>
        <div class="fw-name" style="color:${fw.color}">${fw.name}</div>
        <div class="fw-tagline">${fw.tagline}</div>
        <div class="fw-desc">${fw.desc}</div>
        <div class="fw-uses-label">Ideal cuando…</div>
        <ul class="fw-uses">${fw.uses.map(u=>`<li>${u}</li>`).join('')}</ul>
      `;
      grid.appendChild(card);
    });
    block.appendChild(grid);
    wrap.appendChild(block);
  });

  // GUIDE
  const guide = document.getElementById('fw-guide-grid');
  GUIDE_RULES.forEach(r => {
    const card = document.createElement('div');
    card.className = 'guide-card';
    card.innerHTML = `
      <div class="guide-if"><strong>Si…</strong>${r.if_}</div>
      <div class="guide-then">→ ${r.then}</div>
      <div class="guide-note">${r.note}</div>
    `;
    guide.appendChild(card);
  });
}

function renderGlossary() {
  const grid = document.getElementById('glossary-grid');
  const catColors = {rendering:'rgba(126,184,247,0.15)',arquitectura:'rgba(168,240,200,0.15)',datos:'rgba(245,169,127,0.15)',deploy:'rgba(201,167,245,0.15)',ds:'rgba(126,184,247,0.12)'};
  const catText = {rendering:'#1e40af',arquitectura:'#065f46',datos:'#9a3412',deploy:'#6d28d9',ds:'#1e40af'};
  const catLabels = {rendering:'Renderizado',arquitectura:'Arquitectura',datos:'Datos y estado',deploy:'Deploy',ds:'Design Systems'};

  GLOSSARY.forEach(g => {
    const item = document.createElement('div');
    item.className = 'gterm';
    item.dataset.cat = g.cat;
    item.dataset.term = g.term.toLowerCase() + ' ' + g.def.toLowerCase();
    item.innerHTML = `
      <div>
        <div class="gterm-name">${g.term}</div>
        <span class="gterm-cat-tag" style="background:${catColors[g.cat]};color:${catText[g.cat]}">${catLabels[g.cat]}</span>
      </div>
      <div>
        <div class="gterm-def">${g.def}</div>
        <div class="gterm-example">${g.example}</div>
      </div>
    `;
    grid.appendChild(item);
  });
}

function filterGlossary() {
  const q = document.getElementById('glosario-search').value.toLowerCase();
  document.querySelectorAll('.gterm').forEach(el => {
    const matchSearch = !q || el.dataset.term.includes(q);
    const matchCat = currentGlosaryCat === 'all' || el.dataset.cat === currentGlosaryCat;
    el.classList.toggle('hidden', !matchSearch || !matchCat);
  });
}

function filterGlossaryBycat(cat, btn) {
  currentGlosaryCat = cat;
  document.querySelectorAll('.gcat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterGlossary();
}

function renderVibetips() {
  const filters = document.getElementById('vibe-filter');
  const grid = document.getElementById('vibe-grid');
  const fws = [...new Set(VIBETIPS.map(v=>v.fw))];

  const allBtn = document.createElement('button');
  allBtn.className = 'vfil active'; allBtn.textContent = 'Todos';
  allBtn.onclick = () => { document.querySelectorAll('.vfil').forEach(b=>b.classList.remove('active')); allBtn.classList.add('active'); document.querySelectorAll('.vibe-card').forEach(c=>c.classList.remove('hidden')); };
  filters.appendChild(allBtn);

  fws.forEach(fw => {
    const tip = VIBETIPS.find(v=>v.fw===fw);
    const btn = document.createElement('button');
    btn.className = 'vfil'; btn.textContent = tip.fwlabel;
    btn.style.setProperty('--hover-color', tip.fwcolor);
    btn.onclick = function() {
      document.querySelectorAll('.vfil').forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.vibe-card').forEach(c => c.classList.toggle('hidden', c.dataset.fw !== fw));
    };
    filters.appendChild(btn);
  });

  VIBETIPS.forEach((tip, i) => {
    const card = document.createElement('div');
    card.className = 'vibe-card'; card.dataset.fw = tip.fw;
    card.innerHTML = `
      <div class="vibe-card-top">
        <span class="vibe-fw-tag" style="background:${tip.fwcolor}22;color:${tip.fwcolor};border:1px solid ${tip.fwcolor}44">${tip.fwlabel}</span>
        <span class="vibe-type-tag">${tip.type}</span>
      </div>
      <div class="vibe-title">${tip.title}</div>
      <div class="vibe-desc">${tip.desc}</div>
      <div class="vibe-prompt" id="vp-${i}">${tip.prompt}<button class="copy-btn" onclick="copyPrompt(${i},this)">copiar</button></div>
    `;
    grid.appendChild(card);
  });
}

function copyPrompt(idx, btn) {
  navigator.clipboard.writeText(VIBETIPS[idx].prompt);
  btn.textContent = '✓ copiado'; btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'copiar'; btn.classList.remove('copied'); }, 2000);
}

function renderHosting() {
  const grid = document.getElementById('hosting-grid');
  HOSTING.forEach(h => {
    const card = document.createElement('div');
    card.className = 'hosting-card';
    card.innerHTML = `
      <div class="hcard-bar" style="background:${h.color}"></div>
      <div class="hcard-name" style="color:${h.color}">${h.name}</div>
      <div class="hcard-tagline">${h.tagline}</div>
      <div class="hcard-desc">${h.desc}</div>
      <div class="hcard-pills">${h.pills.map(p=>`<span class="hpill">${p}</span>`).join('')}</div>
      <div class="hcard-best"><strong>Mejor para:</strong> ${h.best}</div>
    `;
    grid.appendChild(card);
  });
}

function renderRoadmap() {
  const wrap = document.getElementById('roadmap-phases');
  const statusMap = {live:{cls:'ps-live',label:'En vivo'},next:{cls:'ps-next',label:'Siguiente'},later:{cls:'ps-later',label:'Planificado'}};

  PHASES.forEach(p => {
    const phase = document.createElement('div');
    phase.className = 'phase';
    const sm = statusMap[p.status];
    phase.innerHTML = `
      <div class="phase-header">
        <div class="phase-num">${p.num}</div>
        <div class="phase-title">${p.title}</div>
        <div class="phase-status ${sm.cls}">${sm.label}</div>
      </div>
      <div class="phase-body">
        <div class="phase-why">${p.why.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</div>
        <div class="phase-items">${p.items.map(i=>`
          <div class="pitem">
            <div class="pitem-name">${i.name} <span class="pitem-tag" style="background:${i.tagColor}22;color:${i.tagColor};border:1px solid ${i.tagColor}44">${i.tag}</span></div>
            <div class="pitem-desc">${i.desc}</div>
          </div>
        `).join('')}</div>
        <div class="phase-connection">${p.connection}</div>
      </div>
    `;
    wrap.appendChild(phase);
  });
}

// ═══════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════
function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tabitem').forEach(b=>b.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  btn.classList.add('active');
}

function showStab(id, btn, prefix) {
  document.querySelectorAll('.'+prefix+'-sub').forEach(s=>{s.style.display='none';});
  document.querySelectorAll('.stab').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).style.display='block';
  btn.classList.add('active');
}

// Generic panel+tab switcher
function _sp(panelSel, btnSel, id, btn) {
  document.querySelectorAll(panelSel).forEach(p => p.classList.remove('active'));
  document.querySelectorAll(btnSel).forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

function showDsTab(id, btn)  { _sp('.ds-panel',      '.ds-stab',  id, btn); }

function showDisenoSection(id, btn) {
  document.querySelectorAll('.diseno-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.diseno-navitem').forEach(b => b.classList.remove('active'));
  document.getElementById('diseno-' + id).classList.add('active');
  btn.classList.add('active');
  if (id === 'ds-glosario') renderDsGlosario();
}

function showA11yTab(id, btn) { _sp('.a11y-tabpanel', '.a11y-tab', id, btn); }
function showGitTab(id, btn) { _sp('.git-panel', '.git-stab', id, btn); }
function showWatanTab(id, btn) { _sp('.wa-panel', '.wa-stab', id, btn); }

// ═══════════════════════════════════════
// DATA: DS GLOSARIO
// ═══════════════════════════════════════

const DSG_CATS = [
  { id: 'arquitectura', label: 'Arquitectura',  color: '#818cf8' },
  { id: 'tokens',       label: 'Tokens',         color: '#34d399' },
  { id: 'componentes',  label: 'Componentes',    color: '#f59e0b' },
  { id: 'organizacion', label: 'Organización',   color: '#06b6d4' },
  { id: 'figma',        label: 'Figma Patterns', color: '#d4a574' },
  { id: 'proceso',      label: 'Proceso',        color: '#f87171' },
  { id: 'gobernanza',   label: 'Gobernanza',     color: '#c084fc' },
  { id: 'patron',       label: 'Patrón',         color: '#60a5fa' },
];

const DSG_TERMS = [
  {
    term: 'Single Brand', en: 'Single Brand', cat: 'arquitectura',
    def: 'Design System construido para servir exclusivamente a un producto o marca. Es el caso más común y el punto de partida natural. Toda la toma de decisiones está centrada en un único contexto visual y funcional.',
    features: ['Menor complejidad de tokens', 'Iteración más rápida', 'Equipo reducido', 'Sin fricción por multi-contexto'],
    example: 'color.primary = #1a56db — hardcoded, sin capa de abstracción adicional',
    related: ['Multibrand', 'White label'],
  },
  {
    term: 'Multibrand', en: 'Multibrand', cat: 'arquitectura',
    def: 'Design System que soporta múltiples marcas o productos desde una misma base de componentes, cambiando únicamente la capa de tokens. Un mismo componente se renderiza con identidades visuales distintas. <strong>Nace por una cuestión de coste y eficiencia</strong>: en lugar de mantener sistemas independientes para cada marca (costoso, duplicado), un único sistema con tokens parametrizados es más ágil y sostenible. <strong>Según Raúl Marín</strong>: requiere fondo, resistencia y paciencia; cada marca tiene su tradición y orgullo; la meta es eliminar la idea de que un sistema restringe la creatividad; hay que enfocar la estrategia en la independencia e individualidad de cada marca; necesitas aprender a hablar el idioma de negocio.',
    features: ['Capa de tokens separada por marca', 'Componentes agnósticos de marca', 'Mayor complejidad de mantenimiento', 'Economía de escala en componentes', 'Reducción de costes de mantenimiento'],
    example: 'color.primary = brand-a: #1a56db · brand-b: #e11d48 · brand-c: #7c3aed',
    related: ['Single Brand', 'White label', 'Design Token', 'Multidimensional'],
  },
  {
    term: 'White label', en: 'White label', cat: 'arquitectura',
    def: 'Sistema diseñado para ser rebrandeado completamente por clientes o partners (ocultando la identidad del creador original).',
    features: ['Altamente configurable y personalizable', 'Sin marca predeterminada visible', 'Documentación para personalización por terceros'],
    example: 'color.primary = var(--client-color, #666666) · font.family = var(--client-font, \'Inter\')',
    related: ['Multibrand', 'Design Token'],
  },
  {
    term: 'Headless', en: 'Headless', cat: 'componentes',
    def: 'Sistema que separa la lógica de componentes (comportamiento, accesibilidad) de la presentación visual, permitiendo libertad total en el estilo. <em>Raúl lo considera la tipología de DS del futuro.</em>',
    features: ['Componentes sin estilos predefinidos (unstyled)', 'Enfoque en funcionalidad, accesibilidad y comportamiento', 'Máxima flexibilidad visual', 'APIs y hooks reutilizables', 'Lógica y accesibilidad preresueltas', 'Compatible con cualquier sistema de diseño visual', 'Ejemplos: Radix UI, Headless UI, React Aria (el componente gestiona foco y ARIA; tú defines los estilos)'],
    example: 'color.primary = platform.color.primary · font.family = platform.typography.body (solo referencias, no valores visuales concretos)',
    related: ['Componente', 'Accesibilidad', 'Tokens', 'Design Token', 'White label'],
  },
  {
    term: 'Design Token', en: 'Design Token', cat: 'tokens',
    def: 'Unidad mínima de decisión de diseño almacenada como dato (nombre → valor). Abstrae valores concretos (color, espaciado, tipografía) para que puedan ser consumidos por cualquier plataforma.',
    features: ['Independiente de plataforma', 'Fuente de verdad única', 'Permite theming y multibrand'],
    example: 'color.primary.500 = #1a56db · space.4 = 16px · font.size.body = 1rem',
    related: ['Single Brand', 'Multibrand', 'Theming'],
  },
  {
    term: 'Atomic Design', en: 'Atomic Design', cat: 'arquitectura',
    def: 'Metodología que organiza los componentes UI en cinco niveles de complejidad creciente: átomos, moléculas, organismos, plantillas y páginas.',
    features: ['Reutilización máxima', 'Jerarquía clara', 'Nomenclatura compartida entre design y dev'],
    example: 'Átomo: Button · Molécula: SearchBar (Input + Button) · Organismo: Header (Logo + Nav + SearchBar)',
    related: ['Componente', 'Arquitectura de componentes'],
  },
  {
    term: 'Design System (DS)', en: 'Design System', cat: 'arquitectura',
    def: 'Conjunto cohesionado de componentes reutilizables, tokens visuales (colores, tipografía, espaciado) y documentación que define cómo construir productos digitales consistentes. Es la fuente de verdad visual y funcional de una marca o familia de productos.',
    features: ['Documentación centralizada', 'Componentes reutilizables', 'Tokens agnósticos de implementación', 'Guías de uso y patrones', 'Versioning y evolución controlada'],
    example: 'Figma library + componentes React + tokens JSON + documentación = Design System',
    related: ['Design Token', 'Componente', 'Single Brand', 'Multibrand', 'Headless'],
  },
  {
    term: 'Multidimensional', en: 'Multidimensional', cat: 'tokens',
    def: 'Capacidad de un Design System para gestionar múltiples dimensiones de variación dentro de un único contexto (no múltiples marcas). Ejemplos: breakpoints para responsive (mobile, tablet, desktop), espacios según densidad (compact, normal, spacious), o temas visuales (light, dark). Los tokens varían en función de estas dimensiones, pero siguen siendo <strong>un único sistema</strong>, no multibrand.',
    features: ['Variaciones por breakpoint (responsive)', 'Variaciones por tema (light/dark)', 'Variaciones por densidad de espaciado', 'Escalabilidad dentro de un contexto único', 'Diferente a multibrand (no se cambia identidad)'],
    example: 'space.sm = 8px (compact) · space.sm = 12px (normal) · color.bg = #fff (light) · color.bg = #1a1a1a (dark)',
    related: ['Design Token', 'Single Brand', 'Theming'],
  },
  {
    term: 'State Layer', en: 'State Layer', cat: 'componentes',
    def: 'Capa semitransparente (overlay) que se coloca entre el container y el contenido de un componente para indicar su estado de interacción (hover, focus, press, drag, disabled). Usa opacidades fijas según el estado en lugar de cambiar el color base, proporcionando un enfoque sistemático y predecible. Originada en <strong>Material Design 3</strong> y adoptada por Figma, Atlassian, Stripe y otros grandes sistemas. El state layer usa el mismo color que el contenido (generalmente el "on color") con diferentes niveles de opacidad, eliminando la necesidad de múltiples paletas de color por estado.',
    features: ['Opacidad fija por estado: hover 8%, focus 10%, press 10%, drag 16%, disabled 38%', 'Un único color para todos los estados (variable solo la opacidad)', 'Coherencia visual garantizada', 'Sin dicotomía de paletas por estado', 'Mejora accesibilidad (legibilidad preservada)', 'Agnóstica al color base del componente', 'Escalable entre temas (light/dark)'],
    example: 'Button.primary: bg=#0066cc + on-color(#fff) + state-layer-8%-opacity(hover) = capa blanca semi-visible, sin necesidad de #0052a3 alternativo',
    related: ['Componente', 'Design Token', 'Theming', 'Accesibilidad', 'Multidimensional'],
  },
  {
    term: 'Variante', en: 'Variant', cat: 'organizacion',
    def: 'Versión específica de un componente con comportamiento o apariencia diferente pero manteniendo la misma funcionalidad base. Las variantes permiten un único componente adaptarse a múltiples contextos sin duplicar código. Se controlan mediante props (size, color, state, variant).',
    features: ['Control mediante props o enum', 'Reutilización de lógica base', 'Reducción de duplicación', 'Consistencia visual garantizada', 'Fácil mantenimiento centralizado'],
    example: 'Button con variantes: primary | secondary | tertiary. O tamaños: sm, md, lg. O estado: default, loading, disabled',
    related: ['Componente', 'Component API', 'Controlled Component', 'State Layer'],
  },
  {
    term: 'Compound Component', en: 'Compound Component', cat: 'organizacion',
    def: 'Patrón donde múltiples componentes trabajan juntos como una unidad implícita, compartiendo estado interno sin props explícitas. El padre gestiona el estado, los hijos lo leen del contexto. Usado en: Dialog (Dialog + DialogTitle + DialogContent), Form (Form + FormField + Input), etc. Permite composición flexible sin props "perforadas" a través de niveles.',
    features: ['Patrón implicit state sharing', 'API simple para el consumidor', 'Flexibilidad en la estructura interna', 'Contexto compartido entre hijos', 'Usado en librerías: Headless UI, Radix UI'],
    example: '<Dialog><DialogTitle/><DialogContent/></Dialog> — el content no necesita saber que está dentro del Dialog; lo detecta vía contexto',
    related: ['Componente', 'Component API', 'Composition'],
  },
  {
    term: 'Component API', en: 'Component API', cat: 'organizacion',
    def: 'Interfaz pública de un componente: props que acepta, eventos que emite, métodos que expone y el estado que gestiona. Una buena API es intuitiva, consistente con otros componentes del sistema, y documenta qué es obligatorio vs opcional con ejemplos de uso.',
    features: ['Props tipadas y documentadas', 'Valores por defecto razonables', 'Eventos/callbacks claramente nombrados', 'Métodos accesibles si aplica', 'JSDoc o documentación paralela'],
    example: 'Button API: <Button size="sm|md|lg" variant="primary|secondary" disabled={bool} onClick={fn} {...props}/>',
    related: ['Componente', 'Variante', 'Compound Component'],
  },
  {
    term: 'Primitives', en: 'Primitives', cat: 'tokens',
    def: 'Nivel base fundamental de tokens: valores sin contexto (colors, sizes, values). También llamados "core tokens", "global tokens" u "options". Son los datos crudos sobre los cuales se construyen tokens semánticos y específicos. No tienen significado funcional, solo valores brutos.',
    features: ['Valores sin contexto (color hexadecimal puro, número de pixel)', 'Base numérica o matemática (ej: 4px, 8px, 16px)', 'Agnósticos de uso (no dicen para qué sirven)', 'Reutilizables en múltiples tokens semánticos', 'Nivel más bajo de la jerarquía de tokens'],
    example: 'Primitives: color-raw-blue-600: #0066cc · space-base-unit: 4px · size-full: 100%. Semantic: color-primary: color-raw-blue-600',
    related: ['Design Token', 'Semantic tokens', 'Specific tokens', 'Color Scale', 'Spacing Scale'],
  },
  {
    term: 'Semantic tokens', en: 'Semantic Tokens', cat: 'tokens',
    def: 'Tokens que añaden contexto y significado a los valores primitivos. Usan nombres que describen su propósito funcional (color-primary, color-error, space-padding-md) en lugar de valores literales. Permiten fácil cambio de temas y multibrand. Nivel intermedio entre primitivos y específicos.',
    features: ['Nombres descriptivos y contextuales', 'Reutilizan primitives como referencia', 'Facilita theming y multibrand', 'Mantiene semántica entre plataformas', 'Evita tener colores hardcodeados en componentes', 'Pueden ser alias de primitives o funciones derivadas'],
    example: 'Semantic: color-primary: {light: #0066cc, dark: #3b9bff} · color-error: #e11d48 · space-padding: {sm: 8px, md: 16px, lg: 24px}',
    related: ['Design Token', 'Primitives', 'Specific tokens', 'Multidimensional'],
  },
  {
    term: 'Specific tokens', en: 'Specific Tokens', cat: 'tokens',
    def: 'Tokens aplicados a componentes o patrones específicos del sistema. Nivel más granular: color-button-primary-bg, space-input-padding-vertical. Usan semánticos como base pero especifican exactamente dónde y cómo se aplican. No deben usarse directamente en markup (solo design tokens semánticos).',
    features: ['Nombres específicos a componente (button-*, input-*, modal-*)', 'Derivan de semantic tokens', 'Mayor granularidad que semánticos', 'Documentación en componentes individuales', 'Optional: puede no existir si semantic es suficiente'],
    example: 'Specific: button-primary-bg: color-primary · button-primary-text: color-inverse · input-padding-x: space-padding-md · modal-border-radius: radius-lg',
    related: ['Design Token', 'Primitives', 'Semantic tokens', 'Component API'],
  },
  {
    term: 'Breakpoints', en: 'Breakpoints', cat: 'tokens',
    def: 'Valores de ancho (width) que definen los puntos de cambio para diseño responsive. Típicamente en píxeles: mobile (320px), tablet (768px), laptop (1024px), desktop (1280px). Usados en media queries CSS y en lógica condicional de componentes. Son tokens multidimensionales que coordinan toda la jerarquía de otros tokens (spacing, typography, grid).',
    features: ['Puntos de quiebre predefinidos', 'Aplicados en media queries', 'Disponibles en código y Figma', 'Consistentes entre diseño y desarrollo', 'Usualmente nombrados semánticamente (mobile, tablet) o por rango (sm, md, lg)', 'Alteran valores de otros tokens (ej: font-size sube en desktop)'],
    example: 'phone (portrait): 320px · tablet: 601px · laptop: 1023px · desktop: 1281px. En CSS: @media (min-width: 768px) { ... }',
    related: ['Design Token', 'Spacing Scale', 'Typographic Scale', 'Multidimensional'],
  },
  {
    term: 'Color Scale', en: 'Color Scale', cat: 'tokens',
    def: 'Conjunto ordenado de variaciones de un color base, organizadas por luminosidad o intensidad. Típicamente 11 pasos: 50 (casi blanco), 100, 200... 900, 950 (casi negro). Permite coherencia visual en contraste, legibilidad y state layers sin hardcodear colores.',
    features: ['11 escalones estándar (50–950)', 'Escalones impares para perceptibilidad', 'Base matemática (interpolación de LAB o LCH)', 'Versiones light/dark', 'Usadas en Tailwind, Material Design, Stripe'],
    example: 'primary-50: #f0f9ff · primary-100: #e0f2fe · ... primary-900: #0c2d57 · primary-950: #001a33',
    related: ['Design Token', 'Multidimensional', 'Theming'],
  },
  {
    term: 'OKLCH Chroma (%)', en: 'OKLCH Chroma Percentage', cat: 'tokens',
    def: 'En flujos basados en OKLCH, el canal C (chroma) puede expresarse y gestionarse como proporción o porcentaje relativo respecto al máximo útil del tono, no como valor absoluto fijo. Esto ayuda a construir rampas más uniformes perceptualmente y evita saltos bruscos de saturación entre pasos.',
    features: ['C controla intensidad/saturación percibida', 'Gestionarlo por porcentaje mantiene coherencia entre pasos 50–950', 'Facilita adaptación a light/dark sin recalcular todo', 'Mejora decisiones de contraste para accesibilidad', 'Evita oversaturation en tonos medios y oscuros'],
    example: 'Mismo hue (H=260): paso 100 con C al 12%, paso 500 al 36%, paso 900 al 18% (porcentaje relativo), ajustando L para lograr contraste AA/AAA según el uso.',
    related: ['OKLCH', 'Color Scale', 'Design Token', 'Theming', 'Accesibilidad'],
  },
  {
    term: 'Typographic Scale', en: 'Typographic Scale', cat: 'tokens',
    def: 'Sistema de tamaños, pesos y espacios de línea para tipografía consistente. Basado en ratios o pasos discretos (xs, sm, base, lg, xl, 2xl...). Define no solo tamaño sino también line-height, letter-spacing y peso para cada nivel.',
    features: ['Ratios consistentes (1.25x, 1.5x, etc.)', 'Categorías semánticas (xs, sm, base, lg, xl)', 'Múltiples pesos por tamaño si aplica', 'Line-height y letter-spacing integrados', 'Compatible con responsive (cambios por breakpoint)'],
    example: 'h1: 48px, weight 700, line-height 1.1 · body: 16px, weight 400, line-height 1.5 · caption: 12px, weight 500, line-height 1.4',
    related: ['Design Token', 'Spacing Scale', 'Multidimensional'],
  },
  {
    term: 'Spacing Scale', en: 'Spacing Scale', cat: 'tokens',
    def: 'Sistema de espaciados consistentes basado en múltiplos de una unidad base (usualmente 4px u 8px). Proporciona valores discretos para márgenes, paddings, gaps, etc. Garantiza alineación visual y ritmo consistente en toda la interfaz.',
    features: ['Unidad base: 4px u 8px', 'Múltiplos: 4, 8, 12, 16, 24, 32, 48, 64, 96...', 'Nombres semánticos: xs, sm, md, lg, xl', 'Aplicable a margin, padding, gap, border-radius', 'Versiones responsive por breakpoint'],
    example: 'space-2: 8px · space-4: 16px · space-6: 24px · space-8: 32px (multíplos de 8 base)',
    related: ['Design Token', 'Color Scale', 'Multidimensional'],
  },
  {
    term: 'Token Naming Convention', en: 'Token Naming', cat: 'tokens',
    def: 'Convención sistemática para nombrar tokens en el Design System. Típicamente: category/subcategory/variant (color/primary/500 o space/padding/md). Un buen naming es semántico (color-primary, no color-azul), jerárquico y predecible, facilitando autocompletado y búsqueda.',
    features: ['Estructura jerárquica consistente', 'Semántica clara (no hardcodeo de atributos)', 'Evita nombres ambiguos o redundantes', 'Facilita búsqueda y autocompletado', 'Agnóstico a plataforma (CSS, Figma, Tokens Studio)'],
    example: 'color/primary/50, color/primary/500, color/primary/900 · space/padding/sm, space/padding/md · font/size/body, font/size/heading',
    related: ['Design Token', 'Composition'],
  },
  {
    term: 'Component Maturity', en: 'Component Maturity', cat: 'gobernanza',
    def: 'Nivel de estabilidad y adopción de un componente en el Design System: Alpha (experimental), Beta (funcional pero puede cambiar), Stable (producción, contrato estable), Deprecated (marcado para retiro). Comunica a los equipos el riesgo de usar un componente.',
    features: ['Alpha: cambios frecuentes, testing en progreso', 'Beta: funcional, breaking changes posibles', 'Stable: contrato garantizado, cambios mínimos', 'Deprecated: anuncios con plazo para retiro', 'Migración path documentada'],
    example: 'Button: Stable · NewModal: Alpha · OldSelectNative: Deprecated (usar Select nuevo en 3 meses)',
    related: ['Design System (DS)', 'Gobernanza'],
  },
  {
    term: 'Composition', en: 'Composition', cat: 'organizacion',
    def: 'Técnica de construir interfaces complejas componiendo componentes simples. Un Header se compone de Logo + Nav + SearchBar. Favorece reutilización, mantenibilidad y claridad. Alternativa a herencia o props profundas.',
    features: ['Componentes pequeños y enfocados', 'Composición flexible en lugar de herencia', 'Props fluyen hacia abajo (unidireccionales)', 'Fácil de testear y mantener', 'Facilita design systems escalables'],
    example: 'Header = Logo + Nav + SearchBar · Nav = NavList + NavItems · NavItems map sobre array de items',
    related: ['Componente', 'Atomic Design', 'Compound Component'],
  },
  {
    term: 'Theming', en: 'Theming', cat: 'tokens',
    def: 'Capacidad de cambiar la apariencia global de una interfaz (colores, tipografía, espaciados) sin cambiar la estructura o lógica de componentes. Típicamente implementado mediante tokens globales (CSS variables, Figma variables, Design Token SDK) que los componentes consultan en tiempo de renderizado.',
    features: ['Cambio global sin refactor de código', 'Temas predefinidos (light/dark, brand-a/brand-b)', 'Tokens centralizados como fuente de verdad', 'Transiciones suaves entre temas', 'Runtime o build-time según plataforma'],
    example: 'CSS: body { color-scheme: light; } body.dark { --color-bg: #1a1a1a; } · O Figma: File Settings > Variables > Brand A/Brand B',
    related: ['Design Token', 'Multidimensional', 'Multibrand', 'Color Scale'],
  },
  {
    term: 'Asset availability', en: 'Asset Availability', cat: 'figma',
    def: 'Colección de Figma que documenta la disponibilidad de assets (colores, tipografías, iconos, componentes) según su estado: available (usable ahora), deprecated (retirado próximamente), new (recién añadido), restricted (uso limitado). Permite rastrear qué assets están en uso, cuáles son obsoletos y cuáles están en beta.',
    features: ['Estatus para cada asset: available, deprecated, new, restricted', 'Versionado de componentes', 'Facilita migraciones planificadas', 'Documentación de lifecyclo de assets', 'Visible en Figma inspection panel', 'Sincronizable con Design System documentation'],
    example: 'Color: primary-blue available · old-navy deprecated (usar navy-dark) · new-teal new (beta, testing). Component: Modal available · OldSelectNative deprecated · NewMultiSelect new',
    related: ['Design Token', 'Component Maturity', 'Gobernanza'],
  },
  {
    term: 'Brands collection', en: 'Brands Collection', cat: 'figma',
    def: 'Colección de Figma (o archivo de variables en Tokens Studio) que gestiona variables por marca dentro del mismo sistema. Cada marca tiene sus propios valores para color-primary, typography, etc., pero comparten componentes. Similar a Multibrand pero organizado como una sola colección de variables con sub-sets por brand. Permite switching visual instant en Figma.',
    features: ['Sub-sets de variables por marca (Brand A, Brand B, Brandless)', 'Componentes agnósticos de marca', 'Switching visual instantáneo en Figma', 'Sincronizable con Tokens Studio o similar', 'Facilita QA y testing multi-brand', 'Patrón moderno de multibrand en Figma 4.0+'],
    example: 'Variable: Brand/Brand A/primary = #1a56db · Brand/Brand B/primary = #e11d48 · Brand/Brandless/primary = #666666. Switch en inspection: selecciona Brand A y todos los componentes se renderizan con esa paleta.',
    related: ['Multibrand', 'Design Token', 'Theming', 'Subscription level collection'],
  },
  {
    term: 'Promotions collection', en: 'Promotions Collection', cat: 'figma',
    def: 'Colección de Figma para gestionar estados visuales relacionados con promociones (sale, Black Friday, holiday, etc.). Contiene variables para colores, iconografía y tipografía adaptadas a cada contexto promocional. Permite a designers visualizar cómo lucen componentes bajo diferentes escenarios comerciales sin duplicar componentes.',
    features: ['Sub-sets: None, Standard Sale, Black Friday, Holiday, Limited Time', 'Variables para sale-badge color, sale-price-color, promotion-icon', 'Cambios visuales sin alterar componentes base', 'Fácil A/B testing de escenarios', 'Visible en Figma para QA y stakeholders'],
    example: 'Variable: Promotion/None/sale-badge = hidden · Promotion/Black Friday/sale-badge = #ff3e00 · Promotion/Holiday/accent = #c1121f. Switch en Figma: ver el mismo componente renderizarse bajo diferentes contextos de venta.',
    related: ['Theming', 'Brands collection', 'Multidimensional'],
  },
  {
    term: 'Subscription level collection', en: 'Subscription Level Collection', cat: 'figma',
    def: 'Colección de Figma para modelar diferencias visuales y de componentes según nivel de suscripción del usuario (None, Professional, Organization, Enterprise). Controla qué características se muestran, qué botones están habilitados, qué iconografía aparece. Permite diseñadores visualizar la experiencia de cada tier sin crear mockups separados.',
    features: ['Sub-sets por nivel: None, Professional, Organization, Enterprise', 'Variables para visibility, enable state, badge color de tier', 'Iconografía diferente por tier (ej: pro badge, enterprise badge)', 'Facilita conversión funnel design', 'Testing de paywall flows en Figma'],
    example: 'Variable: Subscription/Professional/premium-features-visible = true · Subscription/None/premium-features-visible = false · Subscription/Enterprise/badge-color = #c084fc. Diseñadores switchean para ver qué ve cada tier.',
    related: ['Theming', 'Brands collection', 'Multidimensional'],
  },
  {
    term: 'Loyalty status collection', en: 'Loyalty Status Collection', cat: 'figma',
    def: 'Colección de Figma para estados de lealtad del usuario (None, Silver, Gold, Titanium, etc.). Maneja paletas de color, iconografía y tipografía específicas para cada tier de programa de fidelización. Permite visualizar cómo la interfaz se transforma según estatus de cliente sin duplicar diseños.',
    features: ['Sub-sets por estatus: None, Silver, Gold, Titanium, Diamond', 'Paleta de colores diferenciada por tier', 'Iconografía y badge exclusiva por tier', 'Tipografía o weight diferenciada (ej: gold = peso 700)', 'Facilitadesenio de loyalty rewards experience', 'Testing visual de gradientes de premium'],
    example: 'Variable: Loyalty/Silver/card-color = #d4d4d8 · Loyalty/Gold/card-color = #fbbf24 · Loyalty/Titanium/card-color = #a78bfa. Cardholders ven su card renderizada con el color de su tier.',
    related: ['Theming', 'Subscription level collection', 'Multidimensional'],
  },
  {
    term: 'Authentication status collection', en: 'Logged In / Logged Out Collection', cat: 'figma',
    def: 'Colección de Figma que modela diferencias visuales entre estado autenticado (Logged In) y no autenticado (Logged Out). Controla visibilidad de elementos (profile menu, saved items), textos ("Log in" vs "Profile"), e iconografía. Permite diseñadores visualizar ambos flujos en un mismo archivo sin mockups duplicados.',
    features: ['Sub-sets: Logged Out, Logged In', 'Variables para visibility, button labels, menu items', 'Iconografía diferente por estado (user icon vs profile badge)', 'Facilita auth flow design', 'Testing de conditional rendering en Figma', 'Navega diferente según estado'],
    example: 'Variable: Auth/Logged Out/menu-items = [Home, About, Log in, Sign up] · Auth/Logged In/menu-items = [Home, About, Courses, Profile (AP), Logout]. UI cambia automáticamente al switchear.',
    related: ['Theming', 'Multidimensional', 'Conditional Component Patterns'],
  },
  {
    term: 'Extended Collections', en: 'Extended Collections', cat: 'figma',
    def: 'Patrón avanzado de organización de variables en Figma Enterprise donde una colección base (core) puede extenderse por colecciones derivadas que solo sobrescriben (override) los valores necesarios. Evita duplicar todo el sistema por cada marca y mejora mantenibilidad multimarca.',
    features: ['Herencia de variables core', 'Overrides mínimos por marca o contexto', 'Menos duplicación de tokens', 'Escalado más limpio cuando crecen marcas/modos', 'Reduce listas gigantes de variables'],
    example: 'Core/color.text.primary = #111; Brand B solo sobrescribe color.accent.* y hereda el resto del core sin copiar toda la colección.',
    related: ['Brands collection', 'Multibrand', 'Design Token', 'Theming'],
  },
  {
    term: 'Slots', en: 'Slots / Space Property', cat: 'figma',
    def: 'Mecanismo para reservar un hueco configurable dentro de un componente y permitir insertar instancias distintas sin crear una variante por cada combinación posible. Es clave para organismos complejos (cards, modals, headers) sin explosión de variantes.',
    features: ['Composición flexible en Figma', 'Menos variantes difíciles de mantener', 'Mayor reutilización de componentes base', 'Modela contenido dinámico en diseño'],
    example: 'Un componente Card define un slot de media: hoy insertas icono, mañana avatar o ilustración, sin crear Card-icon, Card-avatar, Card-illustration.',
    related: ['Composition', 'Compound Component', 'Component API'],
  },
  {
    term: 'APCA', en: 'Advanced Perceptual Contrast Algorithm', cat: 'tokens',
    def: 'Modelo de contraste perceptual que estima mejor la legibilidad real en diferentes fondos, tamaños y pesos, especialmente útil en dark mode. No reemplaza automáticamente el cumplimiento legal WCAG vigente, pero aporta una señal práctica de calidad visual más realista en interfaces modernas.',
    features: ['Sensibilidad a polaridad (texto claro sobre oscuro vs oscuro sobre claro)', 'Más útil en fondos oscuros complejos', 'Complementa métricas WCAG 2.x', 'Ayuda a priorizar legibilidad efectiva'],
    example: 'Un par de colores puede pasar WCAG AA y aun así sentirse débil en dark mode; APCA detecta ese problema perceptual y sugiere ajuste de L/C.',
    related: ['OKLCH Chroma (%)', 'Theming', 'Color Scale', 'Accesibilidad'],
  },
  {
    term: 'Token Pipeline', en: 'Design Token Pipeline', cat: 'proceso',
    def: 'Flujo automatizado que conecta diseño y código: definición de tokens, versionado, transformación por plataforma y publicación de artefactos listos para consumo. Es la base operativa para escalar un Design System multimarca sin depender de copias manuales.',
    features: ['Fuente de verdad única', 'Push/Pull entre diseño y repositorio', 'Build reproducible por entorno', 'Publicación versionada de tokens', 'Reduce drift entre Figma y código'],
    example: 'Figma/Tokens Studio -> GitHub (JSON) -> Style Dictionary -> CSS variables + iOS + Android -> release del paquete de tokens.',
    related: ['Design Token', 'Style Dictionary', 'Tokens Studio', 'Theming'],
  },
  {
    term: 'Style Dictionary', en: 'Style Dictionary', cat: 'proceso',
    def: 'Herramienta de transformación de design tokens que convierte un formato fuente (JSON) en salidas específicas para cada plataforma. Permite centralizar naming, escalas y formatos de salida para web, iOS, Android o sistemas propietarios.',
    features: ['Transformaciones por plataforma', 'Build configurable por tema/marca', 'Output en múltiples formatos', 'Automatizable en CI/CD'],
    example: 'Con un solo comando generas tokens CSS, Android XML e iOS Swift a partir de la misma fuente de datos.',
    related: ['Token Pipeline', 'Design Token', 'Theming'],
  },
  {
    term: 'Web Components en DS', en: 'Web Components for Design Systems', cat: 'componentes',
    def: 'Estrategia para construir componentes encapsulados y agnósticos de framework, reutilizables en ecosistemas React, Vue, Angular o vanilla. Muy útil en organizaciones multimarca y multi-stack donde mantener librerías separadas por framework sería costoso.',
    features: ['Interoperabilidad entre frameworks', 'Encapsulación por Shadow DOM (según estrategia)', 'Contrato estable de API por atributos/eventos', 'Ideal para plataformas heterogéneas'],
    example: 'Un mismo <x-button> puede consumirse en React y Angular sin reescribir lógica base de accesibilidad y comportamiento.',
    related: ['Headless', 'Component API', 'Multibrand'],
  },
  {
    term: 'Snowflakes', en: 'Snowflake Components', cat: 'gobernanza',
    def: 'Componentes o variaciones que solo necesita una marca o contexto muy específico. No son un fallo por sí mismos: el problema aparece cuando entran sin control al core del sistema y erosionan su coherencia.',
    features: ['Excepciones legítimas en multimarca', 'Deben vivir fuera del core por defecto', 'Necesitan revisión periódica', 'Riesgo de deuda si se multiplican'],
    example: 'Un widget promocional exclusivo para Brand C se mantiene en capa de marca, no en el paquete central de componentes.',
    related: ['Multibrand', 'Component Maturity', 'Gobernanza'],
  },
  {
    term: 'Federated Governance', en: 'Federated Governance Model', cat: 'gobernanza',
    def: 'Modelo de gobernanza donde existe un equipo core que define estándares globales y equipos de producto/marca que contribuyen con necesidades locales. Equilibra consistencia y velocidad, evitando tanto el caos distribuido como el cuello de botella central.',
    features: ['Core team con decisiones globales', 'Contribución distribuida por dominios', 'Reglas claras de aceptación al core', 'Backlog compartido y priorización transparente'],
    example: 'El core define tokens y componentes base; Brand squads proponen extensiones vía RFC y solo las generalizables se promueven al sistema central.',
    related: ['Snowflakes', 'Design System (DS)', 'Component Maturity'],
  },
  {
    term: 'DS Maturity Horizon', en: 'Design System Maturity Horizon', cat: 'proceso',
    def: 'Marco temporal para entender que un Design System multimarca no madura en semanas. Normalmente requiere 18-24 meses para estabilizar lenguaje, componentes, pipeline técnico y adopción real en producto y desarrollo.',
    features: ['Expectativas realistas con negocio', 'Plan por fases (fundación, adopción, escalado, optimización)', 'Métricas progresivas según etapa', 'Evita abandono prematuro'],
    example: 'Fase 1: core tokens y base components; fase 2: adopción y docs; fase 3: multimarca/automatización; fase 4: optimización y métricas de ROI.',
    related: ['Token Pipeline', 'Federated Governance', 'Design System (DS)'],
  },
  {
    term: 'Tipografía semántica multimarca', en: 'Multibrand Semantic Typography', cat: 'tokens',
    def: 'Estrategia tipográfica donde los tokens se nombran por función (title-1, body-2, label-sm) en vez de por tamaño absoluto. Cada marca asigna su familia, peso y ajustes ópticos a esos roles, preservando consistencia funcional aunque cambien las fuentes.',
    features: ['Roles tipográficos estables entre marcas', 'Mapeo por marca sin romper componentes', 'Mejor compatibilidad con fuentes heterogéneas', 'Facilita theming y accesibilidad'],
    example: 'title-1 en Brand A usa 700/44px y en Brand B usa 600/42px; ambos mantienen la misma jerarquía en UI.',
    related: ['Typographic Scale', 'Multibrand', 'Theming'],
  },
];

function renderDsGlosario() {
  const listEl = document.getElementById('dsg-list');
  const noRes  = document.getElementById('dsg-no-results');
  const countEl= document.getElementById('dsg-count');
  if (!listEl) return;

  // Build tabs (exclusive filter)
  const tabsEl = document.getElementById('dsg-filters');
  if (tabsEl && !tabsEl.dataset.built) {
    tabsEl.dataset.built = '1';
    tabsEl.classList.add('dsg-tabs');
    
    // Tab "todos"
    let tabsHTML = `<button class="dsg-tab active" data-cat="*" onclick="dsgFilterTab(this)">Todos</button>`;
    
    // Tabs por categoría
    tabsHTML += DSG_CATS.map(c =>
      `<button class="dsg-tab" data-cat="${c.id}" style="--tc:${c.color}" onclick="dsgFilterTab(this)">${c.label}</button>`
    ).join('');
    
    tabsEl.innerHTML = tabsHTML;
  }

  dsgFilter();
}

function dsgFilterTab(tabEl) {
  // Remover active de todos los tabs
  document.querySelectorAll('.dsg-tab').forEach(t => t.classList.remove('active'));
  // Activar solo el tab clickeado
  tabEl.classList.add('active');
  // Filtrar
  dsgFilter();
}

function dsgFilter() {
  const q = (document.getElementById('dsg-search')?.value || '').toLowerCase();
  const activeTab = document.querySelector('.dsg-tab.active');
  const activeCat = activeTab?.dataset.cat || '*';
  const listEl = document.getElementById('dsg-list');
  const noRes  = document.getElementById('dsg-no-results');
  const countEl= document.getElementById('dsg-count');

  const filtered = DSG_TERMS.filter(t => {
    const matchCat = activeCat === '*' || t.cat === activeCat;
    const matchQ   = !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  countEl.textContent = filtered.length + ' término' + (filtered.length !== 1 ? 's' : '');

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';

  listEl.innerHTML = filtered.map(t => {
    const cat = DSG_CATS.find(c => c.id === t.cat);
    const featuresHtml = t.features ? `<div class="dsg-features"><span class="dsg-features-label">Características</span><ul class="dsg-features-list">${t.features.map(f=>`<li>${f}</li>`).join('')}</ul></div>` : '';
    const exampleHtml  = t.example ? `<div class="dsg-example"><strong>Ejemplo</strong> · ${t.example}</div>` : '';
    const relatedHtml  = t.related ? `<div class="dsg-related"><span class="dsg-related-label">Relacionados</span>${t.related.map(r=>`<span class="dsg-rel-tag">${r}</span>`).join('')}</div>` : '';
    return `<div class="dsg-entry">
      <div class="dsg-entry-term">
        <span class="dsg-term-name">${t.term}</span>
        <span class="dsg-term-tag" style="--fc:${cat?.color||'#818cf8'}">${cat?.label||t.cat}</span>
        ${t.en && t.en !== t.term ? `<span class="dsg-term-en">${t.en}</span>` : ''}
      </div>
      <div class="dsg-entry-body">
        <div class="dsg-def">${t.def}</div>
        ${featuresHtml}${exampleHtml}${relatedHtml}
      </div>
    </div>`;
  }).join('');
}

function dsgSyncFilters() {
  // Reset to "Todos" tab
  document.querySelectorAll('.dsg-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.dsg-tab[data-cat="*"]')?.classList.add('active');
}

function dsgSearchFor(q) {
  const inp = document.getElementById('dsg-search');
  if (inp) { inp.value = q; dsgFilter(); }
}

// ═══════════════════════════════════════
// DATA: DESPLIEGUE
// ═══════════════════════════════════════

const DNS_RECORDS = [
  { type:'A',      full:'Address Record',        desc:'Apunta un dominio a una dirección IPv4. Es el registro más básico — sin él tu web no carga.', example:'miweb.com → 185.42.10.22', warn:'' },
  { type:'AAAA',   full:'IPv6 Address Record',   desc:'Como el registro A pero para IPv6. Cada vez más importante para redes modernas.', example:'miweb.com → 2001:db8::1', warn:'' },
  { type:'CNAME',  full:'Canonical Name (Alias)', desc:'Alias de otro dominio. En lugar de apuntar a una IP, apunta a otro nombre de dominio. Útil para subdominios.', example:'www.miweb.com → miweb.com (no a una IP)', warn:'Un CNAME no puede coexistir con otros registros en el mismo nombre. No uses CNAME en el root (@).' },
  { type:'MX',     full:'Mail Exchange',          desc:'Indica qué servidor gestiona el email de tu dominio. Tiene prioridad numérica: el número más bajo es el prioritario.', example:'miweb.com MX 10 → mail.google.com', warn:'Si tu MX apunta a Google Workspace o similar, la config de email en cPanel no funcionará — el email lo gestiona el servicio externo.' },
  { type:'TXT',    full:'Text Record',            desc:'Texto libre. Se usa para verificaciones de dominio (Google, HubSpot), SPF (anti-spam de email) y DKIM (firma de emails).', example:'v=spf1 include:_spf.google.com ~all', warn:'' },
  { type:'NS',     full:'Nameserver',             desc:'Define qué servidores tienen la autoridad sobre la zona DNS de tu dominio. Cambiar los NS es cambiar quién controla el DNS.', example:'ns1.verpex.com, ns2.verpex.com', warn:'Cambiar NS puede tardar hasta 48h en propagarse. Durante ese tiempo puede haber inconsistencias.' },
  { type:'SRV',    full:'Service Record',         desc:'Especifica servicios disponibles en un dominio (puerto, protocolo, prioridad). Usado por VoIP, juegos, etc.', example:'_sip._tcp.miweb.com', warn:'' },
  { type:'CAA',    full:'Certification Authority', desc:'Define qué autoridades de certificación (CA) pueden emitir certificados SSL para tu dominio.', example:'miweb.com CAA 0 issue "letsencrypt.org"', warn:'' },
];

const DNS_CONCEPTS = [
  { name:'Nameserver (NS)', type:'Concepto DNS', color:'#0a6b72', def:'El servidor que almacena y sirve la tabla de registros DNS de tu dominio. Cuando compras un dominio, puedes apuntar sus NS a los de tu hosting (Verpex, Cloudflare, etc.) para que ese servidor controle todos tus registros.', example:'Compras el dominio en Namecheap → cambias los NS a ns1.verpex.com → ahora cPanel de Verpex gestiona el DNS.', warn:'' },
  { name:'Zona DNS', type:'Concepto DNS', color:'#0a6b72', def:'El archivo completo de configuración de todos los registros DNS de un dominio. En cPanel puedes editarla directamente desde "Zone Editor" o "DNS Zone". Un error aquí puede tumbar tu web o email.', example:'La zona DNS de miweb.com contiene sus registros A, MX, TXT, CNAME y NS en un único archivo de configuración.', warn:'' },
  { name:'TTL (Time To Live)', type:'Concepto DNS', color:'#0a6b72', def:'Tiempo en segundos que los resolvers DNS cachean un registro antes de volver a consultarlo. TTL bajo (300s) = cambios rápidos pero más consultas. TTL alto (86400s = 24h) = cambios lentos pero más eficiente.', example:'Antes de migrar un servidor, baja el TTL a 300s. Así si hay problemas, la reversión se propaga en minutos.', warn:'' },
  { name:'Propagación DNS', type:'Concepto DNS', color:'#0a6b72', def:'El tiempo que tarda un cambio de DNS en llegar a todos los resolvers del mundo. Puede tardar desde minutos hasta 48h dependiendo del TTL anterior y los caches de los ISPs.', example:'Cambias el registro A de tu dominio. En España ya apunta al nuevo servidor pero en EEUU aún va al antiguo. Esto es propagación en curso.', warn:'' },
];

const CPANEL_CONCEPTS = [
  { name:'Virtual Host', type:'Servidor web', color:'#6d28d9', def:'Configuración que permite a un mismo servidor físico responder a múltiples dominios. cPanel crea automáticamente un virtual host por cada dominio/subdominio que añades, configurando desde dónde sirve los archivos (public_html) y cómo los procesa.', example:'En un servidor con cPanel puedes tener miweb.com → /home/user/public_html y tienda.miweb.com → /home/user/tienda/public_html', warn:'' },
  { name:'public_html', type:'Estructura archivos', color:'#6d28d9', def:'La carpeta raíz pública de tu dominio en cPanel. Todo lo que pones aquí es accesible desde el browser. Es el equivalente al /dist o /out de tu build de Astro/Next.js que subas por FTP o deploy.', example:'Subes index.html a public_html → el usuario accede a miweb.com y ve ese archivo.', warn:'Nunca pongas archivos con credenciales (.env) dentro de public_html — serían accesibles desde internet.' },
  { name:'PHP vs HTML en servidor', type:'Procesamiento', color:'#6d28d9', def:'cPanel sirve archivos HTML directamente (el servidor los lee y los envía). PHP se procesa primero: el servidor ejecuta el código PHP, genera HTML y lo envía. Por eso PHP puede leer bases de datos y HTML no.', example:'WordPress es PHP: el servidor ejecuta WordPress, que consulta MySQL y genera el HTML de cada página antes de enviarlo.', warn:'' },
  { name:'phpMyAdmin', type:'Base de datos', color:'#6d28d9', def:'Interfaz web para gestionar bases de datos MySQL/MariaDB incluida en cPanel. Permite crear bases de datos, tablas, ejecutar queries SQL, importar/exportar datos y ver la estructura sin usar línea de comandos.', example:'WordPress necesita una base de datos MySQL. En cPanel: crear DB → crear usuario → asignar permisos → conectar WordPress con las credenciales.', warn:'' },
  { name:'JetBackup 5', type:'Backup y recuperación', color:'#6d28d9', def:'Plugin de backup para cPanel que permite hacer y restaurar copias de seguridad completas (archivos, bases de datos, emails, configuraciones). Permite restaurar desde puntos específicos sin perder todo.', example:'Tu WordPress se rompe tras una actualización. Con JetBackup restauras el backup de ayer en 2 minutos.', warn:'' },
  { name:'SSH (Secure Shell)', type:'Acceso y seguridad', color:'#6d28d9', def:'Protocolo de acceso remoto seguro al servidor mediante línea de comandos. Cifrado extremo-a-extremo. Más potente que FTP: puedes ejecutar cualquier comando, instalar software, reiniciar servicios.', example:'ssh usuario@85.43.22.10 → accedes al servidor y puedes ejecutar git pull, npm install, reiniciar Nginx, etc.', warn:'Desactiva el acceso root por SSH. Usa claves SSH en lugar de contraseñas.' },
  { name:'SSL/TLS con Let\'s Encrypt', type:'Seguridad', color:'#6d28d9', def:'cPanel incluye AutoSSL para instalar certificados SSL gratuitos de Let\'s Encrypt automáticamente. SSL cifra la comunicación entre el browser y el servidor (el candado verde). Sin SSL, los datos viajan en texto plano.', example:'cPanel instala automáticamente un certificado para miweb.com y www.miweb.com. El browser muestra el candado.', warn:'Let\'s Encrypt caduca cada 90 días. cPanel lo renueva automáticamente, pero vigila que no falle.' },
  { name:'Verpex', type:'Hosting', color:'#6d28d9', def:'Hosting que habilita y gestiona cPanel para sus clientes. Con Verpex tienes acceso a un cPanel completo donde puedes crear múltiples dominios, bases de datos, emails y configurar todo el servidor desde la interfaz visual.', example:'Con tu cuenta Verpex accedes a cPanel → Domains → Add Domain → introduces tu dominio → cPanel crea la carpeta, el virtual host y la zona DNS.', warn:'' },
];

const CACHE_TYPES = [
  { name:'Caché estática', type:'Archivos JS/CSS/imágenes', color:'#065f46', desc:'El servidor guarda en memoria o disco los archivos estáticos (JS, CSS, imágenes) y los sirve sin leerlos de disco cada vez. Headers Cache-Control y ETag controlan cuánto tiempo los guarda el browser.', pros:'Trivial de implementar. Nginx/Apache lo hacen solos.', cons:'Si actualizas un archivo, el browser puede seguir usando la versión vieja hasta que expire el caché.' },
  { name:'Caché de objeto (Redis)', type:'Datos de base de datos', color:'#1d4ed8', desc:'Redis guarda en memoria los resultados de consultas a la base de datos. Próximas peticiones idénticas se responden desde RAM sin tocar MySQL. En WordPress lo gestiona el plugin LiteSpeed Cache u Object Cache Pro.', pros:'Drástica reducción de queries a DB. Ideal para sites con mucho tráfico.', cons:'Requiere configurar Redis (host, puerto, contraseña, memoria máxima). Si el caché y la DB desincroniza hay problemas.' },
  { name:'Caché de página completa', type:'HTML generado', color:'#f5a97f', desc:'Guarda el HTML completo de cada página en disco. La siguiente visita recibe el HTML directo sin ejecutar PHP ni consultar la BD. LiteSpeed Cache en WordPress hace esto muy bien.', pros:'Máximo rendimiento. El servidor solo lee un archivo HTML.', cons:'Si el contenido cambia (post nuevo, precio actualizado) el caché puede quedar obsoleto. Hay que configurar reglas de invalidación.' },
  { name:'CDN (Content Delivery Network)', type:'Red distribuida global', color:'#6d28d9', desc:'Tu web se replica en servidores de todo el mundo. El visitante recibe los datos del nodo más cercano a su ubicación. Cloudflare es el CDN más usado — también actúa como proxy de seguridad.', pros:'Latencia mínima para usuarios globales. Protección DDoS incluida en Cloudflare.', cons:'Cambios pueden tardar en propagarse (purgar caché del CDN). Más complejo de configurar correctamente.' },
];

const CACHE_CONCEPTS = [
  { name:'Redis', type:'Motor de caché', color:'#1d4ed8', def:'Base de datos en memoria ultrarrápida usada principalmente como caché. Guarda pares clave-valor en RAM. En un servidor cPanel tienes que activar el módulo PHP de Redis, conocer host/puerto/contraseña y configurarlo en WordPress con un plugin como LiteSpeed Cache.', example:'WordPress hace 80 queries a MySQL por pageview. Con Redis Object Cache, las queries se cachean: segunda visita → 3 queries.', warn:'Redis tiene memoria máxima configurable. Si se llena, empieza a borrar datos. Configura la política de eviction correctamente (allkeys-lru).' },
  { name:'LiteSpeed Cache (WordPress)', type:'Plugin de caché', color:'#f5a97f', def:'Plugin de WordPress que gestiona múltiples capas de caché: página completa, objeto (Redis), browser y CDN. Es el plugin de caché más potente para WordPress en servidores LiteSpeed (habitual en Verpex).', example:'En LiteSpeed Cache: activas caché de página → activas Object Cache con Redis → defines exclusiones (páginas de carrito, perfil) → defines TTL por tipo de contenido.', warn:'' },
  { name:'Cache-Control headers', type:'Caché de browser', color:'#065f46', def:'Headers HTTP que le dicen al browser (y a los proxies/CDNs) durante cuánto tiempo puede guardar en caché un recurso sin volver a pedirlo al servidor. Cache-Control: max-age=31536000 = caché 1 año.', example:'Nginx: location ~* \\.(js|css)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }', warn:'' },
];

const DOCKER_CONCEPTS = [
  { name:'Contenedor (Container)', type:'Docker fundamental', color:'#0a6b72', def:'Unidad de software empaquetada con el código, runtime y dependencias. Aislado del sistema host pero más ligero que una VM. Cada servicio (Nginx, Express, Redis) corre en su propio contenedor.', example:'docker run -d nginx → lanza un contenedor Nginx aislado. El host no necesita tener Nginx instalado.', warn:'' },
  { name:'Docker Compose', type:'Orquestación local', color:'#0a6b72', def:'Herramienta para definir y arrancar múltiples contenedores con un solo archivo (docker-compose.yml). Define servicios, redes internas, volúmenes y variables de entorno. Ideal para desarrollo y proyectos pequeños.', example:'docker-compose up -d → arranca Nginx + Express + Redis todos juntos con su red interna configurada.', warn:'' },
  { name:'Imagen (Image)', type:'Docker fundamental', color:'#0a6b72', def:'Plantilla inmutable de la que se crean los contenedores. Se construye desde un Dockerfile. Una imagen de Node.js incluye el sistema base, Node, npm y tu código. El contenedor es una instancia en ejecución de una imagen.', example:'FROM node:20-alpine → COPY . . → RUN npm install → CMD ["node","index.js"] → este Dockerfile define la imagen.', warn:'' },
  { name:'Red interna Docker', type:'Seguridad de red', color:'#0a6b72', def:'Docker Compose crea una red privada entre los contenedores. Solo Nginx es accesible desde fuera. El contenedor Express solo es alcanzable desde dentro de esa red — jamás desde internet directamente.', example:'Nginx hace proxy_pass http://express:3000. "express" es el nombre del servicio — resuelve solo dentro de la red Docker.', warn:'' },
  { name:'Nginx como Reverse Proxy', type:'Servidor web / Proxy', color:'#0a6b72', def:'Nginx recibe todas las peticiones públicas (HTTPS). Las que son archivos estáticos (/, /assets) las sirve directamente desde disco. Las que empiezan por /api/* las reenvía (proxy_pass) al contenedor Express interno.', example:'location /api/ { proxy_pass http://express:3000; } location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; }', warn:'' },
  { name:'Variables de entorno (.env)', type:'Seguridad de credenciales', color:'#f5a97f', def:'Forma de pasar configuración sensible (tokens de API, contraseñas de DB) al contenedor sin hardcodearla en el código. Se definen en un archivo .env que nunca se sube a Git (.gitignore).', example:'En docker-compose.yml: environment: - HUBSPOT_API_KEY=${HUBSPOT_API_KEY}. El contenedor lo lee como process.env.HUBSPOT_API_KEY.', warn:'Nunca hagas console.log de variables de entorno en producción. Nunca las expongas en el frontend — el browser es público.' },
  { name:'Volumen (Volume)', type:'Persistencia de datos', color:'#0a6b72', def:'Mecanismo para persistir datos generados por un contenedor. Sin volumen, los datos desaparecen cuando el contenedor se reinicia. Las bases de datos siempre deben usar volúmenes.', example:'volumes: - ./data/mysql:/var/lib/mysql → los datos de MySQL persisten en tu host aunque el contenedor se destruya y recree.', warn:'' },
];

const SECURITY_ITEMS = [
  { icon:'🔒', name:'SSL/TLS (HTTPS)', level:'critical', desc:'Cifra toda la comunicación entre browser y servidor. Sin SSL los datos van en texto plano — contraseñas, formularios, tokens incluidos. <strong>Let\'s Encrypt</strong> lo da gratis. cPanel lo instala con AutoSSL. Obliga siempre al redirect HTTP→HTTPS.' },
  { icon:'🤖', name:'Bloqueo de bots IA', level:'high', desc:'Los crawlers de IA (GPTBot, ClaudeBot, Bingbot) pueden sobrecargar tu servidor haciendo miles de peticiones. <strong>Cloudflare WAF</strong> permite crear reglas para bloquearlos por User-Agent o por comportamiento anómalo. También puedes usar robots.txt aunque no todos lo respetan.' },
  { icon:'🛡️', name:'Cloudflare WAF', level:'high', desc:'Web Application Firewall. Filtra tráfico malicioso antes de que llegue a tu servidor. Puedes definir <strong>security rules</strong>: bloquear IPs, países, User-Agents, patrones de request. Gratuito en el plan Free de Cloudflare para reglas básicas.' },
  { icon:'🖼️', name:'Image Hammering', level:'medium', desc:'Ataque donde bots hacen miles de peticiones a tus imágenes para consumir bandwidth y sobrecargar el servidor. En Cloudflare puedes crear reglas que limiten requests por IP/tiempo o bloqueen peticiones de imágenes sin referrer válido.' },
  { icon:'🔑', name:'SSH con claves', level:'critical', desc:'Desactiva el acceso SSH por contraseña — son vulnerables a ataques de fuerza bruta. Usa <strong>pares de clave pública/privada</strong>. La clave privada nunca sale de tu máquina. En cPanel puedes gestionar las SSH keys autorizadas.' },
  { icon:'🌐', name:'Cloudflare como proxy', level:'high', desc:'Al poner tu dominio detrás de Cloudflare (proxy activado, icono naranja), la IP real de tu servidor queda oculta. Los atacantes solo ven IPs de Cloudflare. Esto también activa DDoS protection automática y el CDN.' },
  { icon:'📧', name:'SPF / DKIM / DMARC', level:'medium', desc:'Registros DNS que autentican tus emails y evitan que otros envíen emails suplantando tu dominio. SPF define qué servidores pueden enviar email por ti. DKIM firma los emails. DMARC define qué hacer si fallan las verificaciones.' },
  { icon:'💾', name:'Backups regulares', level:'critical', desc:'<strong>JetBackup 5</strong> en cPanel automatiza copias de archivos y bases de datos. La regla 3-2-1: 3 copias, en 2 medios distintos, 1 fuera del servidor. Prueba la restauración periódicamente — un backup no verificado no es un backup.' },
];

const INTEGRATION_CONCEPTS = [
  { name:'HubSpot Private App (API Token)', type:'CRM Integration', color:'#f5a97f', def:'La forma correcta de autenticarte con la API de HubSpot desde tu backend. Creas una Private App en HubSpot, defines los scopes (permisos) que necesitas, y obtienes un token. Este token va en el header de cada request: Authorization: Bearer TOKEN.', example:'En Express: axios.post("https://api.hubapi.com/crm/v3/objects/contacts", payload, { headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` } })', warn:'El token de HubSpot nunca va en el frontend. Si alguien lo extrae puede crear/borrar contactos en tu CRM.' },
  { name:'Flujo de formulario seguro', type:'Patrón arquitectura', color:'#f5a97f', def:'Browser → POST /api/contact (tu servidor) → validación + anti-spam → POST HubSpot API. El browser nunca habla directamente con HubSpot. Tu Express valida los datos, aplica rate limiting y gestiona errores antes de reenviar a HubSpot.', example:'El formulario hace fetch("/api/contact", { method: "POST", body: JSON.stringify({name, email, message}) }). Nginx lo redirige a Express. Express valida y llama a HubSpot.', warn:'' },
  { name:'Variables de entorno en producción', type:'Seguridad', color:'#f5a97f', def:'En producción no hay archivo .env en disco — las variables se inyectan directamente en el entorno del proceso. En Railway/Render/Fly.io hay un panel de "Environment Variables". En Docker Compose en tu servidor las defines en el .env (que está en .gitignore).', example:'process.env.HUBSPOT_TOKEN en Express lee la variable de entorno. En Railway la defines en Settings → Variables.', warn:'' },
  { name:'Rate Limiting en Express', type:'Anti-abuso', color:'#0a6b72', def:'Limitar cuántas peticiones puede hacer una misma IP en un período de tiempo. Previene que un bot envíe 1000 formularios. Librería express-rate-limit: máximo N requests por IP en M minutos.', example:'rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }) → máximo 5 envíos de formulario por IP cada 15 minutos.', warn:'' },
  { name:'CORS (Cross-Origin Resource Sharing)', type:'Seguridad web', color:'#0a6b72', def:'Mecanismo que controla qué dominios pueden hacer peticiones a tu API. Sin CORS configurado, un JS de otra web podría llamar a tu /api/contact. En Express: cors({ origin: "https://miweb.com" }) → solo tu dominio puede usar la API.', example:'El frontend en miweb.com hace fetch("/api/contact"). Como es mismo origen (Nginx redirige internamente) no hay problema de CORS.', warn:'' },
  { name:'Logs y monitorización', type:'Operaciones', color:'#065f46', def:'En producción necesitas saber qué está pasando. Nginx tiene access.log y error.log. Express puede usar Morgan para logs de requests. En cPanel tienes métricas de tráfico y puedes ver los logs de Apache/Nginx desde el panel.', example:'tail -f /var/log/nginx/error.log → en tiempo real ves errores de Nginx. En Express: morgan("combined") → loguea cada request con IP, status, tiempo.', warn:'' },
];

// ═══════════════════════════════════════
// RENDER: DESPLIEGUE
// ═══════════════════════════════════════

function renderDespliegue() {
  // DNS records table
  const tableWrap = document.getElementById('dns-records-table-wrap');
  const t = document.createElement('div');
  t.className = 'dns-table-wrap';
  t.innerHTML = `<table class="dns-table">
    <thead><tr><th>Tipo</th><th>Nombre completo</th><th>Para qué sirve</th><th>Ejemplo</th><th>Precaución</th></tr></thead>
    <tbody>${DNS_RECORDS.map(r=>`<tr>
      <td>${r.type}</td><td>${r.full}</td><td>${r.desc}</td>
      <td style="font-family:var(--mono);font-size:0.58rem;color:var(--t7)">${r.example}</td>
      <td style="font-size:0.6rem;color:${r.warn?'#f5a97f':'var(--border2)'}">${r.warn||'—'}</td>
    </tr>`).join('')}</tbody>
  </table>`;
  tableWrap.appendChild(t);

  // DNS concept cards
  renderDepCards('dns-concepts-grid', DNS_CONCEPTS);
  renderDepCards('cpanel-grid', CPANEL_CONCEPTS);

  // Cache compare
  const cacheGrid = document.getElementById('cache-compare-grid');
  CACHE_TYPES.forEach(c => {
    const col = document.createElement('div');
    col.className = 'cache-col';
    col.innerHTML = `
      <div class="cache-col-name" style="color:${c.color}">${c.name}</div>
      <div class="cache-col-type">${c.type}</div>
      <div class="cache-col-desc">${c.desc}</div>
      <div class="cache-pros">✓ ${c.pros}</div>
      <div class="cache-cons">✗ ${c.cons}</div>
    `;
    cacheGrid.appendChild(col);
  });
  renderDepCards('cache-concepts-grid', CACHE_CONCEPTS);

  // Docker
  renderDepCards('docker-grid', DOCKER_CONCEPTS);

  // Security
  const secGrid = document.getElementById('security-grid');
  SECURITY_ITEMS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'sec-card';
    const lvlCls = {critical:'sl-critical',high:'sl-high',medium:'sl-medium'}[s.level];
    const lvlLabel = {critical:'Crítico',high:'Alto',medium:'Medio'}[s.level];
    card.innerHTML = `
      <div class="sec-card-head">
        <span class="sec-icon">${s.icon}</span>
        <span class="sec-name">${s.name}</span>
        <span class="sec-level ${lvlCls}">${lvlLabel}</span>
      </div>
      <div class="sec-desc">${s.desc}</div>
    `;
    secGrid.appendChild(card);
  });

  // Integrations
  renderDepCards('integrations-grid', INTEGRATION_CONCEPTS);
}

function renderDepCards(containerId, items) {
  const grid = document.getElementById(containerId);
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dep-card';
    card.innerHTML = `
      <div class="dep-card-accent" style="background:${item.color}"></div>
      <div class="dep-card-name" style="color:${item.color}">${item.name}</div>
      <div class="dep-card-type">${item.type}</div>
      <div class="dep-card-def">${item.def}</div>
      ${item.example ? `<div class="dep-card-example">${item.example}</div>` : ''}
      ${item.warn ? `<div class="dep-card-warn">${item.warn}</div>` : ''}
    `;
    grid.appendChild(card);
  });
}

function showDepTab(id, btn) { _sp('.dep-panel', '.dep-stab', id, btn); }

// ═══════════════════════════════════════
// DATA: DOCKER CURSO
// ═══════════════════════════════════════

const DK_COLOR = 'var(--t8)';

const DK_FUNDAMENTOS = [
  { name:'Contenedor', cat:'Concepto base', color:'#3b6fd4', def:'Proceso aislado que corre sobre el kernel del host compartido. Tiene su propio sistema de archivos, red y espacio de procesos, pero no virtualiza hardware. Arranca en milisegundos y usa mucha menos RAM que una VM.', cmd:'docker run hello-world', tip:'Un contenedor SÍ comparte el kernel del host. Una VM NO — virtualiza hardware completo. Por eso los contenedores son tan más ligeros.' },
  { name:'Imagen', cat:'Concepto base', color:'#3b6fd4', def:'Plantilla inmutable de solo lectura que define el sistema de archivos y la configuración de un contenedor. Se construye en capas. El contenedor es una instancia en ejecución de una imagen. Las imágenes se almacenan en registros (Docker Hub, GHCR, etc.).', cmd:'docker pull nginx:alpine', tip:'Las imágenes son inmutables. Cuando un contenedor escribe datos, lo hace en una capa extra de escritura por encima de la imagen.' },
  { name:'Docker Engine', cat:'Arquitectura', color:'#5b8fd4', def:'El daemon dockerd que gestiona contenedores, imágenes, redes y volúmenes. El cliente docker se comunica con él a través de una API REST (normalmente vía socket UNIX /var/run/docker.sock).', cmd:'systemctl status docker', tip:'El socket /var/run/docker.sock es la puerta trasera al host. Montar este socket en un contenedor le da acceso total al host — nunca lo hagas en producción con contenedores no confiables.' },
  { name:'Docker Hub', cat:'Registro', color:'#5b8fd4', def:'El registro de imágenes oficial de Docker. Contiene millones de imágenes públicas: ubuntu, nginx, node, postgres, redis, etc. También puedes crear imágenes privadas. Alternativas: GHCR (GitHub), ECR (AWS), GCR (Google).', cmd:'docker search nginx\ndocker pull nginx:1.25-alpine', tip:'Siempre especifica la versión de la imagen (tag). Usar :latest puede romperte el deploy cuando publican una nueva versión incompatible.' },
  { name:'Capa (Layer)', cat:'Sistema de archivos', color:'#3b6fd4', def:'Cada instrucción de un Dockerfile crea una capa inmutable. Docker cachea cada capa — si no ha cambiado, la reutiliza en el siguiente build. El orden importa: pon las capas que cambian menos arriba (FROM, RUN apt) y las que cambian más abajo (COPY código).', cmd:'docker history mi-imagen:latest', tip:'Si cambias el package.json, Docker invalida la caché a partir de ese COPY y reconstruye todo lo que viene después. Copia el package.json antes que el resto del código para aprovechar la caché de dependencias.' },
  { name:'VM vs Contenedor', cat:'Comparación', color:'#5b8fd4', def:'VM: virtualiza hardware completo, necesita SO invitado propio (GBs), arranca en minutos, aislamiento total. Contenedor: comparte kernel del host, solo empaqueta la app y sus dependencias (MBs), arranca en segundos, aislamiento a nivel de proceso.', cmd:'docker stats  # vs htop en una VM', tip:'En producción moderna, muchas veces se combinan: VMs para aislamiento de infraestructura, contenedores dentro de las VMs para aislamiento de apps.' },
  { name:'Instalación Docker', cat:'Setup', color:'#5b8fd4', def:'Linux: instalar docker-ce vía repositorio oficial. No uses el docker.io del repositorio del sistema operativo — suele estar desactualizado. macOS/Windows: Docker Desktop incluye VM ligera + GUI. En servidor: añadir tu usuario al grupo docker para no usar sudo.', cmd:'curl -fsSL https://get.docker.com | sh\nusermod -aG docker $USER', tip:'En producción en Linux, nunca uses Docker Desktop — usa docker-ce directamente. Docker Desktop está diseñado para desarrollo local.' },
  { name:'Modo detached (-d)', cat:'Ejecución', color:'#3b6fd4', def:'Por defecto docker run bloquea el terminal. Con -d el contenedor corre en background. Usa docker logs para ver su salida, docker attach para conectarte, docker exec para ejecutar comandos dentro.', cmd:'docker run -d --name mi-nginx nginx\ndocker logs mi-nginx\ndocker exec -it mi-nginx bash', tip:'-it en docker exec: -i mantiene stdin abierto, -t asigna un pseudo-terminal. Necesitas ambos para tener una shell interactiva.' },
];

const DK_CHEATSHEET = [
  { section: 'CONTENEDORES' },
  { cmd:'docker run [opts] IMAGEN [cmd]',  desc:'Crear y arrancar contenedor',         note:'--name, -d, -p, -v, -e, --rm, --network' },
  { cmd:'docker run -it IMAGEN bash',      desc:'Contenedor interactivo con shell',     note:'-i stdin, -t pseudo-tty' },
  { cmd:'docker start / stop / restart',   desc:'Arrancar / parar / reiniciar',         note:'Usa el nombre o ID del contenedor' },
  { cmd:'docker ps',                       desc:'Listar contenedores en ejecución',     note:'-a para ver todos, incluidos parados' },
  { cmd:'docker rm [-f] CONTENEDOR',       desc:'Eliminar contenedor',                  note:'-f para forzar si está corriendo' },
  { cmd:'docker logs [-f] CONTENEDOR',     desc:'Ver logs del contenedor',              note:'-f para seguir en tiempo real' },
  { cmd:'docker exec -it CONT cmd',        desc:'Ejecutar comando en contenedor vivo',  note:'exec -it CONT bash para entrar' },
  { cmd:'docker inspect CONTENEDOR',       desc:'Info detallada en JSON',               note:'IPs, volúmenes, variables de entorno…' },
  { cmd:'docker stats',                    desc:'Monitor de CPU/RAM en tiempo real',    note:'Similar a htop para contenedores' },
  { cmd:'docker top CONTENEDOR',           desc:'Procesos dentro del contenedor',       note:'' },
  { cmd:'docker cp CONT:/ruta ./local',    desc:'Copiar archivos host ↔ contenedor',   note:'Funciona en ambas direcciones' },
  { cmd:'docker commit CONT nueva-imagen', desc:'Crear imagen desde contenedor',        note:'Útil para debug, no para producción' },
  { section: 'IMÁGENES' },
  { cmd:'docker images',                   desc:'Listar imágenes locales',              note:'-a incluye imágenes intermedias' },
  { cmd:'docker pull IMAGEN[:TAG]',        desc:'Descargar imagen del registro',        note:'Por defecto tag = latest' },
  { cmd:'docker push USUARIO/IMAGEN',      desc:'Subir imagen al registro',             note:'Necesitas docker login primero' },
  { cmd:'docker build -t nombre:tag .',    desc:'Construir imagen desde Dockerfile',    note:'. = contexto de build (directorio actual)' },
  { cmd:'docker rmi IMAGEN',               desc:'Eliminar imagen',                      note:'-f para forzar. Libera espacio en disco' },
  { cmd:'docker tag ORIG USER/NUEVO:TAG',  desc:'Renombrar/etiquetar imagen',           note:'No duplica datos, es un alias' },
  { cmd:'docker history IMAGEN',           desc:'Ver capas de una imagen',              note:'Muestra tamaño y comando de cada capa' },
  { cmd:'docker save -o file.tar IMAGEN',  desc:'Exportar imagen a .tar',               note:'Para transferir sin registro' },
  { cmd:'docker load -i file.tar',         desc:'Importar imagen desde .tar',           note:'' },
  { section: 'REDES' },
  { cmd:'docker network ls',               desc:'Listar redes',                         note:'bridge, host, none por defecto' },
  { cmd:'docker network create NOMBRE',    desc:'Crear red bridge personalizada',       note:'--driver bridge|host|overlay|macvlan' },
  { cmd:'docker network connect RED CONT', desc:'Conectar contenedor a red',            note:'Un contenedor puede estar en varias redes' },
  { cmd:'docker network inspect RED',      desc:'Detalles de la red',                   note:'Muestra contenedores conectados y sus IPs' },
  { section: 'VOLÚMENES' },
  { cmd:'docker volume ls',                desc:'Listar volúmenes',                     note:'' },
  { cmd:'docker volume create NOMBRE',     desc:'Crear volumen',                        note:'Gestionado por Docker en /var/lib/docker/volumes' },
  { cmd:'docker volume inspect NOMBRE',    desc:'Ver detalles del volumen',             note:'Mountpoint en el host' },
  { cmd:'docker volume rm NOMBRE',         desc:'Eliminar volumen',                     note:'El contenedor debe estar parado' },
  { section: 'SISTEMA Y LIMPIEZA' },
  { cmd:'docker system prune',             desc:'Limpiar recursos no usados',           note:'-a elimina también imágenes sin usar' },
  { cmd:'docker system df',                desc:'Espacio usado por Docker',             note:'Imágenes, contenedores, volúmenes' },
  { cmd:'docker info',                     desc:'Info del daemon Docker',               note:'Versión, storage driver, memoria…' },
  { section: 'DOCKER COMPOSE' },
  { cmd:'docker compose up -d',            desc:'Levantar stack en background',         note:'-d detached, --build para rebuild' },
  { cmd:'docker compose down',             desc:'Parar y eliminar contenedores',        note:'-v también elimina volúmenes' },
  { cmd:'docker compose ps',               desc:'Estado de los servicios',              note:'' },
  { cmd:'docker compose logs -f [SVC]',    desc:'Logs del stack o servicio',            note:'-f sigue en tiempo real' },
  { cmd:'docker compose exec SVC cmd',     desc:'Ejecutar comando en servicio',         note:'docker compose exec web bash' },
  { cmd:'docker compose build [SVC]',      desc:'Construir imágenes del Compose',       note:'Solo las que tienen build: en el yml' },
  { cmd:'docker compose pull',             desc:'Actualizar imágenes del stack',        note:'Descarga versiones nuevas del registro' },
  { cmd:'docker compose scale SVC=N',      desc:'Escalar servicio a N réplicas',        note:'Requiere no tener puerto fijo asignado' },
  { cmd:'docker compose config',           desc:'Validar y ver compose.yml resuelto',   note:'Útil para debug de variables de entorno' },
];

const DK_DOCKERFILE = [
  { instr:'FROM',       code:'node:20-alpine',              desc:'Imagen base. Siempre la primera instrucción. alpine = imagen minimal (5MB). Especifica versión exacta, nunca latest.' },
  { instr:'WORKDIR',    code:'/app',                        desc:'Directorio de trabajo dentro del contenedor. Todas las instrucciones siguientes se ejecutan desde aquí. Crea la carpeta si no existe.' },
  { instr:'COPY',       code:'package*.json ./',            desc:'Copia archivos del host al contenedor. Primero copia package.json solo (para cachear npm install) y luego el resto del código.' },
  { instr:'RUN',        code:'npm ci --only=production',    desc:'Ejecuta comando durante el build. Cada RUN crea una nueva capa. Encadena comandos con && para reducir capas.' },
  { instr:'COPY',       code:'. .',                         desc:'Copia el resto del código fuente. Va después de RUN npm install para aprovechar la caché de dependencias.' },
  { instr:'ENV',        code:'NODE_ENV=production',         desc:'Variables de entorno disponibles en build y runtime. Para secretos usa ARG (solo build) o variables inyectadas en runtime.' },
  { instr:'EXPOSE',     code:'3000',                        desc:'Documenta el puerto que usa el contenedor. No abre el puerto realmente — eso lo hace -p en docker run o ports: en Compose.' },
  { instr:'USER',       code:'node',                        desc:'Ejecuta el proceso como usuario no-root. Buena práctica de seguridad. Las imágenes node incluyen el usuario "node".' },
  { instr:'HEALTHCHECK',code:'--interval=30s CMD curl -f http://localhost:3000/health', desc:'Docker verifica periódicamente si el contenedor está sano. Compose puede reiniciar contenedores unhealthy.' },
  { instr:'CMD',        code:'["node", "index.js"]',        desc:'Comando por defecto al arrancar el contenedor. Formato JSON (exec form) preferido — no usa shell, recibe señales correctamente.' },
  { instr:'ENTRYPOINT', code:'["docker-entrypoint.sh"]',    desc:'Script que siempre se ejecuta. CMD se pasa como argumentos a ENTRYPOINT. Útil para init scripts.' },
  { instr:'ARG',        code:'VERSION=1.0',                 desc:'Variable solo disponible durante el build. Se pasa con --build-arg. Nunca para secretos — son visibles en docker history.' },
  { instr:'LABEL',      code:'maintainer="yo@miweb.com"',   desc:'Metadatos de la imagen. Útil para documentación y filtrado.' },
  { instr:'VOLUME',     code:'["/data"]',                   desc:'Declara un punto de montaje. Docker crea un volumen anónimo si no se especifica uno explícito.' },
];

const DK_IMG_CARDS = [
  { name:'Multi-stage build', cat:'Optimización', color:'#3b6fd4', def:'Usar múltiples FROM en un Dockerfile para separar el entorno de build del de producción. La imagen final solo contiene lo necesario para ejecutar, no las herramientas de compilación.', cmd:'FROM node:20 AS builder\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html', tip:'Una imagen React con multi-stage pesa ~25MB. Sin multi-stage, 800MB. La diferencia está en no incluir node_modules ni devDependencies en la imagen final.' },
  { name:'Docker Hub Registry', cat:'Distribución', color:'#3b6fd4', def:'Para publicar tu imagen: hacer login, etiquetar la imagen con tu usuario/repositorio y hacer push. Para registros privados (GHCR, ECR) el proceso es similar pero con credenciales distintas.', cmd:'docker login\ndocker tag mi-app:latest usuario/mi-app:1.0\ndocker push usuario/mi-app:1.0', tip:'' },
  { name:'.dockerignore', cat:'Optimización', color:'#5b8fd4', def:'Como .gitignore pero para el contexto de build. Excluye archivos que no necesita el contenedor: node_modules, .git, .env, logs. Reduce el tamaño del contexto y acelera el build.', cmd:'node_modules\n.git\n.env\n*.log\ndist', tip:'El contexto de build se envía entero al daemon. Sin .dockerignore, enviar node_modules puede tardar minutos y añadir GB innecesarios.' },
  { name:'Caché de capas', cat:'Performance', color:'#3b6fd4', def:'Docker cachea cada capa del Dockerfile. Si una capa cambia, invalida todas las siguientes. Estrategia: ordena las instrucciones de menos a más cambiante. Dependencias primero, código después.', cmd:'# MAL: invalida caché de deps en cada cambio de código\nCOPY . .\nRUN npm install\n\n# BIEN: deps cacheadas independientemente\nCOPY package*.json ./\nRUN npm install\nCOPY . .', tip:'' },
];

const DK_NETWORKS = [
  { name:'bridge', type:'Red por defecto', color:'#3b6fd4', desc:'Red virtual privada en el host. Los contenedores pueden comunicarse por IP o nombre (en redes bridge personalizadas). Los puertos se publican explícitamente con -p.', cmd:'docker network create mi-red\ndocker run --network mi-red ...' },
  { name:'host', type:'Sin aislamiento de red', color:'#5b8fd4', desc:'El contenedor usa directamente la red del host. No hay NAT ni traducción de puertos. Solo disponible en Linux. Máxima performance de red pero sin aislamiento.', cmd:'docker run --network host nginx' },
  { name:'none', type:'Sin red', color:'#5b8fd4', desc:'El contenedor no tiene ninguna interfaz de red excepto loopback. Máximo aislamiento. Para contenedores batch que no necesitan red.', cmd:'docker run --network none mi-batch' },
  { name:'overlay', type:'Multi-host (Swarm)', color:'#3b6fd4', desc:'Red que abarca múltiples hosts Docker. Solo disponible en Swarm. Los contenedores en distintas máquinas se ven como si estuvieran en la misma red.', cmd:'docker network create --driver overlay mi-overlay' },
  { name:'macvlan', type:'IP real en LAN', color:'#5b8fd4', desc:'Asigna una IP real de tu LAN al contenedor. Útil para servicios legacy que necesitan estar visibles en la red local como si fueran un dispositivo físico.', cmd:'docker network create --driver macvlan ...' },
];

const DK_VOLUMES = [
  { name:'Volumen gestionado', sub:'docker volume', color:'#065f46', desc:'Docker gestiona el almacenamiento en /var/lib/docker/volumes. Independiente de la estructura del host. Portátil entre hosts. El modo recomendado para datos de producción.', when:'Bases de datos, datos persistentes de apps, backups.' },
  { name:'Bind mount', sub:'ruta del host', color:'#1d4ed8', desc:'Monta una carpeta específica del host en el contenedor. El contenedor ve y modifica los archivos del host directamente. Ideal para desarrollo: editas en el host y el contenedor lo recoge.', when:'Desarrollo local, archivos de config, logs accesibles desde el host.' },
  { name:'tmpfs mount', sub:'solo en memoria', color:'#f5a97f', desc:'Almacenamiento temporal en RAM. Rapidísimo pero volátil — desaparece al parar el contenedor. Caso de uso del curso: acelerar juegos de prueba con dumps de SQL.', when:'Datos temporales, caches de build, datos sensibles que no deben tocar disco.' },
];

const DK_NET_CONCEPTS = [
  { name:'DNS interno de Docker', cat:'Red', color:'#3b6fd4', def:'En redes bridge personalizadas, Docker incluye un servidor DNS interno. Los contenedores se pueden referir entre sí por nombre de servicio (no por IP). En Docker Compose esto es automático: el servicio "db" es accesible como hostname "db".', cmd:'# En Compose, postgres accesible como "db"\nservices:\n  web:\n    environment:\n      DB_HOST: db', tip:'' },
  { name:'Publicar puertos (-p)', cat:'Red', color:'#3b6fd4', def:'Mapea un puerto del host a un puerto del contenedor. El tráfico que llega al puerto del host se reenvía al contenedor. Formato: HOST_PORT:CONTAINER_PORT. Sin -p, el contenedor está aislado de la red externa.', cmd:'docker run -p 8080:80 nginx\n# localhost:8080 → contenedor:80', tip:'Para bind solo en localhost (no exponer al exterior): -p 127.0.0.1:8080:80. En producción, expón solo lo que necesites.' },
  { name:'Proxy inverso con Traefik', cat:'Avanzado', color:'#5b8fd4', def:'Alternativa a Nginx como reverse proxy para contenedores. Traefik se integra con Docker y descubre automáticamente los servicios vía labels en el Compose. Gestiona certificados SSL automáticamente con Let\'s Encrypt.', cmd:'labels:\n  - "traefik.enable=true"\n  - "traefik.http.routers.web.rule=Host(`miweb.com`)"', tip:'Para stacks en VPS con múltiples servicios, Traefik + Docker Compose es mucho más fácil de mantener que configurar Nginx manualmente para cada servicio.' },
  { name:'HAProxy balanceo de carga', cat:'Avanzado', color:'#5b8fd4', def:'Proxy TCP/HTTP de alto rendimiento. El curso lo usa para distribuir tráfico entre múltiples réplicas del mismo contenedor. Junto con docker compose scale, puedes escalar horizontalmente un servicio.', cmd:'docker compose up --scale web=3 -d', tip:'' },
];

const DK_COMPOSE_ANATOMY = [
  { key:'services:', fields:[
    { k:'image:', d:'Imagen del registro a usar. Si se especifica build: se construye localmente.' },
    { k:'build:', d:'Ruta al Dockerfile para construir la imagen. Alternativa a image:.' },
    { k:'container_name:', d:'Nombre fijo para el contenedor. Sin esto, Compose genera uno automático.' },
    { k:'ports:', d:'Mapeo de puertos HOST:CONTENEDOR. Solo exponer los necesarios externamente.' },
    { k:'environment:', d:'Variables de entorno. Pueden venir de un archivo .env con env_file:.' },
    { k:'volumes:', d:'Montajes: volumen gestionado, bind mount o tmpfs.' },
    { k:'depends_on:', d:'Orden de arranque. Con condition: service_healthy para esperar health check.' },
    { k:'restart:', d:'Política: no | always | on-failure | unless-stopped. En producción: unless-stopped.' },
    { k:'networks:', d:'Redes a las que conectar el servicio. Por defecto Compose crea una red para el proyecto.' },
    { k:'healthcheck:', d:'Comando que Compose ejecuta para verificar si el servicio está sano.' },
    { k:'labels:', d:'Metadatos. Traefik y otras herramientas los usan para configuración automática.' },
    { k:'deploy:', d:'Config de despliegue (réplicas, recursos). Relevante en Swarm mode.' },
  ]},
  { key:'volumes:', fields:[
    { k:'nombre-volumen:', d:'Declara un volumen gestionado. Los servicios lo referencian por este nombre.' },
    { k:'external: true', d:'Usa un volumen ya existente, no creado por Compose.' },
  ]},
  { key:'networks:', fields:[
    { k:'nombre-red:', d:'Declara una red. Por defecto bridge. Los servicios la referencian por nombre.' },
    { k:'external: true', d:'Usa una red existente, creada fuera de este Compose.' },
  ]},
];

const DK_COMPOSE_CARDS = [
  { name:'Variables con .env', cat:'Configuración', color:'#3b6fd4', def:'Docker Compose lee automáticamente el archivo .env del mismo directorio. Las variables se usan en el compose.yml con sintaxis ${VARIABLE}. El .env nunca va a Git — usa env.example como plantilla documentada.', cmd:'# .env\nPOSTGRES_PASSWORD=secreto123\n\n# compose.yml\nenvironment:\n  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}', tip:'' },
  { name:'depends_on + healthcheck', cat:'Orden de arranque', color:'#3b6fd4', def:'depends_on garantiza que un servicio arranque antes que otro, pero no espera a que esté listo (conexión a DB, etc.). Combinar con condition: service_healthy y un healthcheck: sí espera a que el servicio esté operativo.', cmd:'depends_on:\n  db:\n    condition: service_healthy\nhealthcheck:\n  test: ["CMD", "pg_isready"]\n  interval: 10s', tip:'Sin healthcheck, tu app puede intentar conectar a la DB antes de que Postgres haya terminado de arrancar. Esto causa errores de "connection refused" intermitentes.' },
  { name:'Profiles', cat:'Entornos', color:'#5b8fd4', def:'Los profiles permiten activar servicios opcionales. Por ejemplo, tener un servicio de debug o un adminer solo cuando lo necesitas, sin que arranque en producción.', cmd:'services:\n  adminer:\n    image: adminer\n    profiles: ["debug"]\n\n# Activar:\ndocker compose --profile debug up', tip:'' },
  { name:'Override files', cat:'Entornos', color:'#5b8fd4', def:'Docker Compose fusiona automáticamente docker-compose.yml con docker-compose.override.yml. Útil para tener configuración base + overrides por entorno (dev, prod). Puedes especificar archivos con -f.', cmd:'docker compose -f compose.yml -f compose.prod.yml up -d', tip:'' },
];

const DK_TOOLS = [
  { name:'Portainer CE', kind:'Panel web', color:'#3b6fd4', desc:'Interfaz web completa para gestionar Docker. Visualiza contenedores, imágenes, redes, volúmenes y stacks Compose. Permite gestionar múltiples hosts Docker remotos. Se despliega él mismo como contenedor.', cmd:'docker run -d -p 9000:9000 --name portainer -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer-ce' },
  { name:'LazyDocker', kind:'TUI (terminal)', color:'#5b8fd4', desc:'Interfaz Docker en terminal. Sin instalar nada extra — muestra contenedores, logs, stats y permite acciones con teclado. Alternativa rápida a Portainer para quien prefiere la terminal.', cmd:'lazydocker' },
  { name:'VS Code Dev Containers', kind:'IDE integration', color:'#3b6fd4', desc:'Extensión de VS Code que abre tu proyecto directamente dentro de un contenedor Docker. El entorno de desarrollo está definido en .devcontainer/devcontainer.json. Elimina el "funciona en mi máquina".', cmd:'# .devcontainer/devcontainer.json\n{ "image": "node:20", "extensions": [...] }' },
  { name:'cTop', kind:'Monitor terminal', color:'#5b8fd4', desc:'Monitor de recursos de contenedores en tiempo real similar a htop. Muestra CPU, RAM, red y disco por contenedor. Útil para identificar cuellos de botella sin salir de la terminal.', cmd:'docker run --rm -ti -v /var/run/docker.sock:/var/run/docker.sock quay.io/vektorlab/ctop' },
  { name:'Glances', kind:'Monitor sistema', color:'#3b6fd4', desc:'Monitor de sistema completo con integración Docker. Muestra métricas del host Y de los contenedores en una sola vista. Tiene modo web accesible desde el browser.', cmd:'docker run -d -p 61208:61208 -v /var/run/docker.sock:/var/run/docker.sock nicolargo/glances' },
  { name:'Watchtower', kind:'Auto-update', color:'#5b8fd4', desc:'Monitoriza los contenedores y automáticamente actualiza las imágenes cuando hay nuevas versiones disponibles. Útil para mantener servicios actualizados sin intervención manual.', cmd:'docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower' },
];

const DK_K8S_CONCEPTS = [
  { name:'¿Cuándo usar K8s vs Compose?', cat:'Decisión', color:'#3b6fd4', def:'Docker Compose: un solo host, desarrollo, proyectos pequeños/medianos, simplicidad. Kubernetes: múltiples hosts, alta disponibilidad, auto-scaling automático, rolling updates sin downtime, gran escala. La mayoría de proyectos empiezan con Compose y escalan a K8s cuando lo necesitan.', cmd:'', tip:'Un proyecto con < 10 servicios en un VPS no necesita K8s. La complejidad operativa de K8s se justifica cuando Compose no puede gestionar la escala o la disponibilidad requerida.' },
  { name:'Clúster K8s', cat:'Arquitectura', color:'#5b8fd4', def:'Conjunto de nodos (máquinas) donde K8s ejecuta los contenedores. Un nodo master (control plane) gestiona el estado deseado. Los nodos worker ejecutan los Pods. Herramientas locales: minikube, kind, k3s para aprender sin un cloud.', cmd:'minikube start\nkubectl cluster-info', tip:'' },
  { name:'kubectl', cat:'CLI', color:'#3b6fd4', def:'La herramienta de línea de comandos para interactuar con K8s. Equivale al docker CLI pero para el clúster. Casi todo se puede hacer declarativamente con archivos YAML aplicados con kubectl apply.', cmd:'kubectl get pods\nkubectl apply -f deployment.yaml\nkubectl describe pod mi-pod\nkubectl logs mi-pod', tip:'' },
];

const DK_K8S_OBJECTS = [
  { name:'Pod', layer:'Unidad mínima', color:'#3b6fd4', desc:'Uno o más contenedores que comparten red y almacenamiento. La unidad mínima de K8s. No se gestionan directamente — se crean a través de Deployments.' },
  { name:'Deployment', layer:'Gestión de Pods', color:'#3b6fd4', desc:'Define el estado deseado: cuántas réplicas del Pod, qué imagen usar. K8s mantiene ese estado y hace rolling updates y rollbacks.' },
  { name:'Service', layer:'Red interna', color:'#5b8fd4', desc:'Expone un conjunto de Pods con una IP/DNS estable. Los Pods pueden cambiar de IP — el Service los abstrae. Tipos: ClusterIP (interno), NodePort, LoadBalancer.' },
  { name:'Ingress', layer:'Entrada externa', color:'#5b8fd4', desc:'Equivalente a Nginx/Traefik en Compose. Gestiona el acceso HTTP/HTTPS externo, enrutamiento por host/path y terminación SSL.' },
  { name:'ConfigMap', layer:'Configuración', color:'#3b6fd4', desc:'Almacena configuración no sensible (como variables de entorno o archivos de config) separada de la imagen del contenedor.' },
  { name:'Secret', layer:'Secretos', color:'#5b8fd4', desc:'Como ConfigMap pero para datos sensibles (contraseñas, tokens). Codificado en base64. En producción se integra con gestores de secretos externos.' },
  { name:'PersistentVolume', layer:'Almacenamiento', color:'#3b6fd4', desc:'Equivalente a los volúmenes de Docker pero con ciclo de vida independiente del Pod y del Deployment. El PVC (Claim) es la solicitud de almacenamiento.' },
  { name:'Namespace', layer:'Aislamiento lógico', color:'#5b8fd4', desc:'Separa recursos dentro del mismo clúster. Útil para separar entornos (dev, staging, prod) o equipos en el mismo K8s.' },
];

const DK_CASES = [
  { ud:'UD03', title:'Práctica de comandos en contenedor Docker',    stack:['docker run','docker exec','docker logs','Comandos básicos'] },
  { ud:'UD03', title:'LAMP + WordPress en contenedor',               stack:['Apache','MySQL','PHP','WordPress','Contenedor único'] },
  { ud:'UD03', title:'Interfaz gráfica con NoVNC',                   stack:['VNC','NoVNC','Browser UI','Contenedor con GUI'] },
  { ud:'UD04', title:'Imagen Ubuntu personalizada con nano',         stack:['Dockerfile','FROM ubuntu','RUN apt','Build'] },
  { ud:'UD04', title:'App Node.js en imagen Docker',                 stack:['Dockerfile','Node.js','Multi-stage','Docker Hub'] },
  { ud:'UD04', title:'Apache + PHP desde Alpine',                    stack:['Alpine','Apache2','PHP','Imagen ligera'] },
  { ud:'UD05', title:'WordPress + MariaDB con redes Docker',         stack:['bridge network','Volúmenes','MariaDB','WordPress'] },
  { ud:'UD05', title:'Balanceo de carga con HAProxy',                stack:['HAProxy','bridge network','Múltiples réplicas','Round-robin'] },
  { ud:'UD05', title:'Juegos de prueba acelerados con tmpfs',        stack:['tmpfs','RAM mount','SQL dumps','Performance'] },
  { ud:'UD05', title:'Grafana + Prometheus monitorización',          stack:['Grafana','Prometheus','Métricas','Dashboard'] },
  { ud:'UD05', title:'Proxy inverso con Traefik en VPS',             stack:['Traefik','Let\'s Encrypt','Labels','Múltiples servicios'] },
  { ud:'UD06', title:'WordPress con Docker Compose',                 stack:['compose.yml','WordPress','MySQL','Volúmenes','depends_on'] },
  { ud:'UD06', title:'Django con Docker Compose',                    stack:['Django','PostgreSQL','Compose','Migrate','Gunicorn'] },
  { ud:'UD06', title:'Nginx + balanceo escalado con Compose',        stack:['Nginx proxy','Apache','compose scale','Load balancing'] },
  { ud:'UD06', title:'Whisper AI + Web Whisper',                     stack:['OpenAI Whisper','IA local','GPU/CPU','Web UI'] },
  { ud:'UD06', title:'Bot Telegram con Whisper AI',                  stack:['Telegram Bot API','Whisper','Audio→texto','Python'] },
  { ud:'UD06', title:'Stable Diffusion con Compose',                 stack:['Stable Diffusion','GPU','IA generativa','Web UI'] },
  { ud:'UD06', title:'Odoo ERP con Docker Compose',                  stack:['Odoo','PostgreSQL','ERP','Compose'] },
  { ud:'UD06', title:'DeepSeek R1 (Ollama) + Open WebUI',            stack:['Ollama','DeepSeek R1','LLM local','Open WebUI'] },
  { ud:'UD07', title:'VS Code en contenedor remoto',                 stack:['Dev Containers','devcontainer.json','VS Code','Remote'] },
  { ud:'UD07', title:'Portainer CE panel de gestión',                stack:['Portainer','Panel web','Gestión visual','Multi-host'] },
  { ud:'UD07', title:'LazyDocker interfaz terminal',                 stack:['LazyDocker','TUI','Terminal','Monitor'] },
  { ud:'UD07', title:'cTop y Glances monitores',                     stack:['cTop','Glances','CPU/RAM','Métricas tiempo real'] },
  { ud:'UD08', title:'App Flask con Kubernetes',                     stack:['Flask','kubectl','Deployment','Service','Ingress'] },
  { ud:'UD08', title:'WordPress con Kubernetes',                     stack:['K8s','PersistentVolume','ConfigMap','Secret','Ingress'] },
];

// ═══════════════════════════════════════
// RENDER: DOCKER
// ═══════════════════════════════════════

// Shared dk-card template + append helper
const dkCard = c => `<div class="dk-card-bar" style="background:${c.color}"></div>
  <div class="dk-card-name" style="color:${c.color}">${c.name}</div>
  <div class="dk-card-cat">${c.cat}</div>
  <div class="dk-card-def">${c.def}</div>
  ${c.cmd ? `<div class="dk-card-cmd">${c.cmd}</div>` : ''}
  ${c.tip ? `<div class="dk-card-tip">${c.tip}</div>` : ''}`;

function appendDkCards(gridId, items) {
  const g = document.getElementById(gridId);
  items.forEach(c => { const el = document.createElement('div'); el.className = 'dk-card'; el.innerHTML = dkCard(c); g.appendChild(el); });
}

function renderDockerCurso() {
  appendDkCards('dk-fund-cards', DK_FUNDAMENTOS);

  // CheatSheet
  const table = document.getElementById('dk-cheat-table');
  table.innerHTML = '<thead><tr><th>Comando</th><th>Qué hace</th><th>Opciones / notas</th></tr></thead>';
  const tbody = document.createElement('tbody');
  DK_CHEATSHEET.forEach(row => {
    const tr = document.createElement('tr');
    if (row.section) {
      tr.className = 'section-row';
      tr.innerHTML = `<td colspan="3">${row.section}</td>`;
    } else {
      tr.innerHTML = `<td>${row.cmd}</td><td>${row.desc}</td><td>${row.note}</td>`;
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Dockerfile
  const dfWrap = document.getElementById('dk-dockerfile-lines');
  DK_DOCKERFILE.forEach(l => {
    const div = document.createElement('div');
    div.className = 'df-line';
    div.innerHTML = `<span class="df-instr">${l.instr}</span><span class="df-code">${l.code}</span><span class="df-desc">${l.desc}</span>`;
    dfWrap.appendChild(div);
  });
  appendDkCards('dk-img-cards', DK_IMG_CARDS);

  // Networks
  const netGrid = document.getElementById('dk-net-grid');
  DK_NETWORKS.forEach(n => {
    const card = document.createElement('div');
    card.className = 'net-card';
    card.innerHTML = `<div class="net-name" style="color:${n.color}">${n.name}</div>
      <div class="net-type">${n.type}</div>
      <div class="net-desc">${n.desc}</div>
      <div class="net-cmd">${n.cmd}</div>`;
    netGrid.appendChild(card);
  });
  // Volumes
  const volGrid = document.getElementById('dk-vol-grid');
  DK_VOLUMES.forEach(v => {
    const col = document.createElement('div');
    col.className = 'vol-col';
    col.innerHTML = `<div class="vol-name" style="color:${v.color}">${v.name}</div>
      <div class="vol-sub">${v.sub}</div>
      <div class="vol-desc">${v.desc}</div>
      <div class="vol-when">${v.when}</div>`;
    volGrid.appendChild(col);
  });
  // Net concepts
  appendDkCards('dk-net-concepts', DK_NET_CONCEPTS);

  // Compose anatomy
  const composeWrap = document.getElementById('dk-compose-anatomy');
  DK_COMPOSE_ANATOMY.forEach(section => {
    const sec = document.createElement('div');
    sec.className = 'compose-section';
    sec.innerHTML = `<div class="compose-key">${section.key}</div>
      <div class="compose-fields">${section.fields.map(f =>
        `<div class="compose-field">
          <div class="compose-field-key">${f.k}</div>
          <div class="compose-field-desc">${f.d}</div>
        </div>`).join('')}</div>`;
    composeWrap.appendChild(sec);
  });
  // Compose cards
  appendDkCards('dk-compose-cards', DK_COMPOSE_CARDS);

  // Tools
  const toolGrid = document.getElementById('dk-tools-grid');
  DK_TOOLS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML = `<div class="tool-name" style="color:${t.color}">${t.name}</div>
      <div class="tool-kind">${t.kind}</div>
      <div class="tool-desc">${t.desc}</div>
      <div class="tool-cmd dk-card-cmd">${t.cmd}</div>`;
    toolGrid.appendChild(card);
  });

  // K8s concepts
  appendDkCards('dk-k8s-concepts', DK_K8S_CONCEPTS);
  const k8sObj = document.getElementById('dk-k8s-objects');
  DK_K8S_OBJECTS.forEach(o => {
    const card = document.createElement('div');
    card.className = 'k8s-card';
    card.innerHTML = `<div class="k8s-name" style="color:${o.color}">${o.name}</div>
      <div class="k8s-layer">${o.layer}</div>
      <div class="k8s-desc">${o.desc}</div>`;
    k8sObj.appendChild(card);
  });

  // Cases
  const casesGrid = document.getElementById('dk-cases-grid');
  DK_CASES.forEach(c => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.innerHTML = `<div class="case-ud">${c.ud}</div>
      <div class="case-title">${c.title}</div>
      <div class="case-stack">${c.stack.map(s=>`<span class="case-pill">${s}</span>`).join('')}</div>`;
    casesGrid.appendChild(card);
  });
}

function showDkTab(id, btn) { _sp('.dk-panel', '.dk-stab', id, btn); }

// ═══════════════════════════════════════
// DATA: DS TOOLS
// ═══════════════════════════════════════

// Tool shape: { id, name, url, type, cat, desc, emoji }
// Storage key: 'dst_tools_v1'  (localStorage for persistence)

const DST_DEFAULT_CATS = [
  { id:'color',        label:'Color',               emoji:'🎨' },
  { id:'tipografia',   label:'Tipografía',           emoji:'🔤' },
  { id:'espaciado',    label:'Espaciado y Layout',   emoji:'📐' },
  { id:'tokens',       label:'Tokens y Variables',   emoji:'🪙' },
  { id:'accesibilidad',label:'Accesibilidad',        emoji:'♿' },
  { id:'iconos',       label:'Iconos',               emoji:'🔷' },
  { id:'componentes',  label:'Componentes',          emoji:'🧩' },
  { id:'documentacion',label:'Documentación',        emoji:'📚' },
  { id:'inspeccion',   label:'Inspección CSS',       emoji:'🔍' },
  { id:'colaboracion', label:'Colaboración',         emoji:'🤝' },
  { id:'otros',        label:'Otros',                emoji:'⚡' },
];

const DST_SEED_TOOLS = [
  {
    id: 'csspeeper',
    name: 'CSS Peeper',
    url: 'https://csspeeper.com',
    type: 'Extensión',
    cat: 'inspeccion',
    emoji: '🔍',
    desc: 'Extensión de Chrome usada por +500k diseñadores y devs. Inspecciona los estilos CSS de cualquier web con un clic: colores, tipografías, espaciados, assets. Exporta paletas completas sin abrir el inspector del browser.',
  },
  {
    id: 'cssstats',
    name: 'CSS Stats',
    url: 'https://cssstats.com',
    type: 'Web App',
    cat: 'inspeccion',
    emoji: '📊',
    desc: 'Analiza el CSS de cualquier URL y devuelve estadísticas detalladas: número de colores únicos, fuentes, selectores, especificidad, tamaño total. Ideal para auditar la consistencia visual de un proyecto antes de crear un Design System.',
  },
  {
    id: 'color-extractly',
    name: 'Color Extractly · Design Token Studio',
    url: 'https://www.figma.com/community/plugin/1352239985929481996/color-extractly-design-token-studio',
    type: 'Plugin Figma',
    cat: 'color',
    emoji: '🎨',
    desc: 'Plugin de Figma para extraer colores de cualquier diseño y exportarlos directamente como Design Tokens. Compatible con Token Studio. Acelera enormemente la creación de la paleta de color del sistema desde archivos Figma existentes.',
  },
  {
    id: 'figma-color-ramp-generator',
    name: 'Color Ramp Generator',
    url: 'https://www.figma.com/community/search?resource_type=plugins&query=Color%20Ramp%20Generator',
    type: 'Plugin Figma',
    cat: 'color',
    emoji: '🌈',
    desc: 'Plugin de Figma para generar rampas de color (50-900) de forma consistente y validar contraste básico para decisiones de accesibilidad en UI.',
  },
  {
    id: 'ok-color',
    name: 'OK Color',
    url: 'https://www.figma.com/community/search?resource_type=plugins&query=OK%20Color',
    type: 'Plugin Figma',
    cat: 'color',
    emoji: '🎯',
    desc: 'Plugin de Figma para trabajar color en espacios perceptuales tipo OKLCH y construir paletas/rampas más uniformes con mejor control de contraste y accesibilidad.',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    url: 'https://storybook.js.org',
    type: 'Herramienta Open Source',
    cat: 'documentacion',
    emoji: '📚',
    desc: 'Herramienta estándar para desarrollar y documentar componentes UI de forma aislada. Cada componente tiene "stories" que muestran todos sus estados posibles (default, hover, disabled, loading, etc.). Incluye addons para a11y, contraste, responsividad y tests visuales.',
  },
  {
    id: 'figma-library',
    name: 'Figma Component Library',
    url: 'https://www.figma.com/design/',
    type: 'Feature Figma',
    cat: 'componentes',
    emoji: '🧩',
    desc: 'Sistema de componentes compartidos en Figma (main components + instances). Permite sincronizar diseños entre archivos. Versioning de componentes. Base visual para el Design System — documentación viviente de cómo se ven y varían los componentes.',
  },
  {
    id: 'tokens-studio',
    name: 'Tokens Studio (Design Tokens)',
    url: 'https://tokens.studio',
    type: 'Plugin Figma',
    cat: 'tokens',
    emoji: '🪙',
    desc: 'Plugin de Figma para gestionar Design Tokens directamente en Figma (colores, tipografía, espaciado). Exporta tokens en múltiples formatos (CSS, JSON, Tailwind, iOS, Android). Sincronización bidireccional con repos. La herramienta estándar para token management en Figma.',
  },
  {
    id: 'chromatic',
    name: 'Chromatic',
    url: 'https://chromatic.com',
    type: 'Servicio SaaS',
    cat: 'documentacion',
    emoji: '🎨',
    desc: 'Servicio de testing visual para Storybook. Detecta cambios visuales automáticamente en cada cambio de código. Previene regresiones visuales en componentes. Integración directa con CI/CD. Esencial para mantener consistencia del Design System en el tiempo.',
  },
  {
    id: 'supernova',
    name: 'Supernova',
    url: 'https://supernova.io',
    type: 'Plataforma SaaS',
    cat: 'documentacion',
    emoji: '⚡',
    desc: 'Plataforma de documentación de Design Systems con generación automática de documentación desde Figma. Crea sitios bonitos de documentación, mantiene sincronización Figma-Code, genera código para componentes, etc. Alternativa completa a build manual de docs.',
  },
  {
    id: 'zeroheight',
    name: 'Zeroheight',
    url: 'https://zeroheight.com',
    type: 'Plataforma SaaS',
    cat: 'documentacion',
    emoji: '📖',
    desc: 'Plataforma de documentación de Design Systems optimizada para equipos grandes. Documentación visual + código ejemplificado + integración Figma. Gestión de versiones del DS. Usada por Spotify, Slack, IBM. Ideal si tienes presupuesto para herramienta dedicada.',
  },
  {
    id: 'radix-ui',
    name: 'Radix UI',
    url: 'https://www.radix-ui.com',
    type: 'Component Library Open Source',
    cat: 'componentes',
    emoji: '🧩',
    desc: 'Librería de componentes headless para React. Proporciona lógica, accesibilidad (ARIA, keyboard nav) y comportamiento, sin estilos. Tú aplicas tu propio CSS. Usado como base para muchos Design Systems. Documentación impecable.',
  },
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
    type: 'Component Library Open Source',
    cat: 'componentes',
    emoji: '🧩',
    desc: 'Colección de componentes copiables (copy-paste) basados en Radix UI. No es un paquete npm sino código que controlas totalmente en tu repo. Ideal para proyectos que quieren customización máxima desde el inicio. Integrada con Tailwind y Figma Variables.',
  },
  {
    id: 'figma-variables',
    name: 'Figma Variables',
    url: 'https://www.figma.com/design/',
    type: 'Feature Figma',
    cat: 'tokens',
    emoji: '🪙',
    desc: 'Sistema nativo de variables en Figma (sin plugins). Soporta colores, números, strings, booleanos. Vinculación bidireccional con componentes. Modos para themes (light/dark, brand A/B). Sintaxis export-to-code con APIs oficiales. El futuro del token management en Figma.',
  },
  {
    id: 'style-dictionary',
    name: 'Style Dictionary',
    url: 'https://amzn.github.io/style-dictionary',
    type: 'CLI',
    cat: 'tokens',
    emoji: '🧰',
    desc: 'Herramienta open source de Amazon para transformar Design Tokens en artefactos por plataforma (CSS, iOS, Android, etc.). Pieza central para pipelines de tokenización multimarca y publicación automatizada.',
  },
  {
    id: 'shoelace',
    name: 'Shoelace (Web Components)',
    url: 'https://shoelace.style',
    type: 'Component Library Open Source',
    cat: 'componentes',
    emoji: '🧩',
    desc: 'Biblioteca de componentes basada en Web Components, agnóstica de framework. Muy útil para equipos multi-stack que necesitan una base común de componentes reutilizables en React, Vue, Angular o vanilla.',
  },
  {
    id: 'open-props',
    name: 'Open Props',
    url: 'https://open-props.style',
    type: 'Librería',
    cat: 'tokens',
    emoji: '🪙',
    desc: 'Colección de variables CSS predefinidas para color, tipografía, spacing y motion. Útil como referencia de naming y escalas al bootstrapear un sistema de tokens antes de personalizarlo.',
  },
];

const DST_COLOR_TIPS = [
  {
    kicker: 'Fundamentos',
    title: 'OKLCH en práctica: qué significa cada canal',
    text: 'OKLCH describe el color de forma perceptual: L (lightness) controla claridad, C (chroma) controla intensidad y H (hue) define el tono. La ventaja frente a HSL es que los cambios son más uniformes para el ojo humano, especialmente cuando construyes escalas para UI.',
    points: [
      'L te ayuda a ordenar jerarquía visual y contraste entre superficies.',
      'C regula saturación útil sin romper legibilidad de texto/iconos.',
      'H mantiene coherencia de familia cromática en toda la rampa.',
    ],
  },
  {
    kicker: 'Rampas',
    title: 'Chroma en porcentaje relativo: por qué importa',
    text: 'En flujos de OKLCH, muchas veces conviene tratar C como una proporción o porcentaje relativo por escalón, no como un valor absoluto fijo. Esto evita que tonos medios queden demasiado saturados o que los oscuros se ensucien, y produce rampas más estables visualmente.',
    points: [
      'Ejemplo típico: en 100 y 900 usas menos porcentaje de C que en 400-600.',
      'El mismo porcentaje no siempre vale para todos los hue; ajusta por familia.',
      'Después de generar la rampa, valida contraste real AA/AAA en contexto.',
    ],
  },
  {
    kicker: 'Modos de color',
    title: 'sRGB, Display P3, Lab/LCH y OKLab/OKLCH',
    text: 'No todos los modos de color sirven para lo mismo. sRGB es el estándar web más seguro en compatibilidad; Display P3 ofrece gamut más amplio en pantallas modernas; Lab/LCH y OKLab/OKLCH son excelentes para calcular y diseñar rampas perceptuales, aunque el output final suele mapearse a sRGB/P3 según soporte.',
    points: [
      'sRGB: máxima compatibilidad cross-device.',
      'Display P3: colores más vivos en dispositivos compatibles.',
      'OKLCH: ideal para diseñar tokens de color consistentes.',
    ],
  },
  {
    kicker: 'Tematización',
    title: 'Light, Dark y High Contrast no son invertir colores',
    text: 'Cada modo necesita intención semántica. Light mode suele priorizar superficie clara y acentos contenidos; dark mode requiere elevar contraste local en texto y componentes interactivos; high contrast prioriza legibilidad extrema, bordes claros y reducción de ambiguedad cromática.',
    points: [
      'Define tokens semánticos por rol: surface, text, border, accent, danger.',
      'No reutilices exactamente la misma rampa en dark sin recalibrar L y C.',
      'Considera forced-colors y preferencias del sistema cuando aplique.',
    ],
  },
  {
    kicker: 'Accesibilidad',
    title: 'Contraste: medir por uso real, no por intuición',
    text: 'La relación de contraste depende del par final (foreground/background) y del tamaño/peso tipográfico. Una paleta bonita puede fallar si no se prueba en estados reales (hover, disabled, badges, overlays). Usa contraste como criterio de diseño desde el inicio, no como chequeo final.',
    points: [
      'Texto normal: apunta como base a nivel AA.',
      'UI crítica y contenido clave: considera umbrales más exigentes.',
      'Valida también componentes sobre fondos tintados y gradientes.',
    ],
  },
  {
    kicker: 'Operativa DS',
    title: 'Pipeline recomendado para gestión de color',
    text: 'Un flujo robusto suele ser: 1) definir intentos semánticos, 2) construir rampas en OKLCH, 3) validar contraste por casos de uso, 4) exportar tokens a Figma y código, 5) monitorizar regresiones visuales. Así el color deja de ser artesanal y pasa a ser un sistema mantenible.',
    points: [
      'Trabaja con nomenclatura semántica (color.text.primary) y no por hex directo.',
      'Documenta decisiones: por qué ese C%, por qué ese umbral de contraste.',
      'Versiona cambios de tokens igual que versionas componentes.',
    ],
  },
  {
    kicker: 'Contraste avanzado',
    title: 'APCA vs WCAG: cómo usar ambos sin contradicciones',
    text: 'Para cumplimiento formal, WCAG 2.x sigue siendo la referencia principal. Para calidad perceptual real, especialmente en dark mode, APCA ayuda a detectar pares que pasan AA pero se sienten pobres al leer. La práctica recomendable es combinarlos: cumplimiento con WCAG + validación perceptual con APCA en casos críticos de UI.',
    points: [
      'WCAG te da umbrales legales y comparables.',
      'APCA aporta sensibilidad a polaridad, peso y contexto visual.',
      'Si hay conflicto, prioriza legibilidad real y documenta la decisión.',
    ],
  },
  {
    kicker: 'Dark mode',
    title: 'Regla práctica de croma en oscuro (10-20%)',
    text: 'En superficies oscuras, colores muy saturados vibran más y fatigan antes. Como punto de partida, suele funcionar reducir chroma entre 10% y 20% respecto a la versión light, ajustando después por hue y caso de uso. No es una fórmula universal, pero sí una heurística útil para iterar rápido sin perder consistencia.',
    points: [
      'Reduce más en acentos de uso frecuente y texto coloreado.',
      'Revisa estados hover/focus: suelen necesitar menos croma del esperado.',
      'Valida en dispositivos reales con brillo alto y bajo.',
    ],
  },
  {
    kicker: 'Figma strategy',
    title: 'Colecciones, modos y herencia sin caos',
    text: 'La organización de variables impacta rendimiento y mantenimiento. Conviene separar por dominios (color, typo, spacing) y evitar colecciones monolíticas. En escenarios enterprise, usa colecciones extendidas para heredar core y sobrescribir solo diferencias de marca o tema.',
    points: [
      'Core estable + overrides mínimos por marca/contexto.',
      'Evita listas infinitas con naming ambiguo.',
      'Alinea estructura de Figma con estructura de tokens en código.',
    ],
  },
  {
    kicker: 'Tipografía',
    title: 'Semántica tipográfica para marcas con fuentes distintas',
    text: 'En multimarca, lo robusto es definir roles tipográficos (title-1, body-1, caption) y no tamaños fijos por nombre de estilo. Así cada marca mapea su familia, peso y microajustes ópticos manteniendo jerarquía y comportamiento coherente en producto.',
    points: [
      'Los componentes consumen roles, no familias concretas.',
      'Evitas romper layouts al cambiar de marca o idioma.',
      'Facilita accesibilidad y mantenimiento de largo plazo.',
    ],
  },
  {
    kicker: 'Gobernanza',
    title: 'Snowflakes con control: excepción sin contaminar el core',
    text: 'Las excepciones por marca son inevitables. La clave no es prohibirlas, sino gobernarlas: definir dónde viven, cuándo caducan y cómo se evalúa si deben subir al core. Sin este marco, el sistema se fragmenta y pierde su ventaja de escala.',
    points: [
      'Por defecto, snowflakes fuera del paquete central.',
      'Revisión trimestral para eliminar o promover patrones repetidos.',
      'Criterio de promoción: reutilización comprobada en más de un contexto.',
    ],
  },
];

// ═══════════════════════════════════════
// DS TOOLS STATE
// ═══════════════════════════════════════

function dstLoad() {
  try {
    const raw = localStorage.getItem('dst_tools_v1');
    return raw ? JSON.parse(raw) : [...DST_SEED_TOOLS];
  } catch(e) { return [...DST_SEED_TOOLS]; }
}

function dstSave(tools) {
  try { localStorage.setItem('dst_tools_v1', JSON.stringify(tools)); } catch(e) {}
}

let DST_TOOLS = dstLoad();
let DST_ACTIVE_CAT = 'color';

// ═══════════════════════════════════════
// DS TOOLS RENDER
// ═══════════════════════════════════════

function renderDsTools() {
  // Populate category select in form
  const catSelect = document.getElementById('dst-inp-cat');
  const colorGrid = document.getElementById('dst-color-grid');

  if (colorGrid) {
    colorGrid.innerHTML = DST_COLOR_TIPS.map(t => `
      <article class="dst-color-card">
        <div class="dst-color-kicker">${t.kicker}</div>
        <div class="dst-color-title">${t.title}</div>
        <div class="dst-color-text">${t.text}</div>
        <ul class="dst-color-points">${t.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </article>
    `).join('');
  }

  catSelect.innerHTML = DST_DEFAULT_CATS.map(c =>
    `<option value="${c.id}">${c.emoji} ${c.label}</option>`
  ).join('');

  dstRenderAll();
}

function dstRenderAll() {
  const tabsWrap = document.getElementById('dst-cat-tabs');
  const panelsWrap = document.getElementById('dst-panels-wrap');

  tabsWrap.innerHTML = '';
  panelsWrap.innerHTML = '';

  DST_DEFAULT_CATS.forEach(cat => {
    const tools = DST_TOOLS.filter(t => t.cat === cat.id);

    // Tab button
    const btn = document.createElement('button');
    btn.className = 'dst-ctab' + (cat.id === DST_ACTIVE_CAT ? ' active' : '');
    btn.innerHTML = `${cat.emoji} ${cat.label} <span class="cat-count-badge">${tools.length}</span>`;
    btn.onclick = () => { DST_ACTIVE_CAT = cat.id; dstRenderAll(); };
    tabsWrap.appendChild(btn);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'dst-cat-panel' + (cat.id === DST_ACTIVE_CAT ? ' active' : '');
    panel.id = 'dst-panel-' + cat.id;

    if (tools.length === 0) {
      panel.innerHTML = `<div class="dst-empty">Sin herramientas en esta categoría todavía.<br>Añade la primera con el formulario de arriba.</div>`;
    } else {
      const grid = document.createElement('div');
      grid.className = 'dst-grid';
      tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'dst-card';
        card.innerHTML = `
          <div class="dst-card-top">
            <div class="dst-card-icon" style="background:rgba(192,132,252,0.08)">${tool.emoji || '🔧'}</div>
            <div class="dst-card-meta">
              <div class="dst-card-name">${tool.name}</div>
              <div class="dst-card-type">${tool.type}</div>
            </div>
          </div>
          <div class="dst-card-desc">${tool.desc}</div>
          <div class="dst-card-footer">
            <span class="dst-card-tag">${DST_DEFAULT_CATS.find(c=>c.id===tool.cat)?.label || tool.cat}</span>
            <a class="dst-card-link" href="${tool.url}" target="_blank" rel="noopener">↗ abrir</a>
            <button class="dst-card-delete" onclick="dstDeleteTool('${tool.id}')" title="Eliminar">✕</button>
          </div>
        `;
        grid.appendChild(card);
      });
      panel.appendChild(grid);
    }

    panelsWrap.appendChild(panel);
  });
}

function dstAddTool() {
  const name  = document.getElementById('dst-inp-name').value.trim();
  const url   = document.getElementById('dst-inp-url').value.trim();
  const type  = document.getElementById('dst-inp-type').value;
  const cat   = document.getElementById('dst-inp-cat').value;
  const desc  = document.getElementById('dst-inp-desc').value.trim();
  const emoji = document.getElementById('dst-inp-emoji').value.trim() || '🔧';

  if (!name || !url) {
    document.getElementById('dst-inp-name').style.borderColor = '#f09090';
    document.getElementById('dst-inp-url').style.borderColor  = !url ? '#f09090' : '';
    setTimeout(() => {
      document.getElementById('dst-inp-name').style.borderColor = '';
      document.getElementById('dst-inp-url').style.borderColor  = '';
    }, 1500);
    return;
  }

  const tool = {
    id:    'tool_' + Date.now(),
    name, url, type, cat, desc, emoji,
  };

  DST_TOOLS.push(tool);
  dstSave(DST_TOOLS);

  // Clear form
  ['dst-inp-name','dst-inp-url','dst-inp-desc','dst-inp-emoji'].forEach(id => {
    document.getElementById(id).value = '';
  });

  DST_ACTIVE_CAT = cat;
  dstRenderAll();
}

function dstDeleteTool(id) {
  DST_TOOLS = DST_TOOLS.filter(t => t.id !== id);
  dstSave(DST_TOOLS);
  dstRenderAll();
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
renderFrameworks();
renderGlossary();
renderDsGlosario();
renderVibetips();
renderHosting();
renderDespliegue();
renderDockerCurso();
renderDsTools();
renderRoadmap();
