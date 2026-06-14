export interface TranslationKeys {
  title: string;
  subtitle: string;
  heroTagline: string;
  heroViewProjects: string;
  heroOpenTo: string;
  metricsProjects: string;
  metricsClients: string;
  metricsData: string;
  howIBuildTitle: string;
  howIBuildCaption: string;
  howIBuildAlways: string;
  howIBuildDepends: string;
  education: string;
  skills: string;
  certifications: string;
  languages: string;
  experience: string;
  summary: string;
  heroLocation: string;
  experienceTitle: string;
  experienceCompany: string;
  experiencePeriod: string;
  project1: string;
  project1Desc: string;
  project1Designation: string;
  project2: string;
  project2Desc: string;
  project2Designation: string;
  project3: string;
  project3Desc: string;
  project3Designation: string;
  resp1: string;
  resp2: string;
  resp3: string;
  resp4: string;
  resp5: string;
  resp6: string;
  resp7: string;
  resp8: string;
  resp9: string;
  resp11: string;
  resp12: string;
  resp13: string;
  resp14: string;
  resp15: string;
  resp16: string;
  resp17: string;
  resp18: string;
  resp19: string;
  resp20: string;
  educationTitle: string;
  educationSchool: string;
  educationCity: string;
  educationDate: string;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  skill5: string;
  skill6: string;
  spanish: string;
  english: string;
  native: string;
  level: string;
  levelDescription: string;
  copyright: string;
  certReact: string;
  certFastAPI: string;
  certOdoo: string;
  personalProjects: string;
  projectFeatured: string;
  projectLive: string;
  pilatesTitle: string;
  pilatesDesc: string;
  pilatesStatus: string;
  openclawTitle: string;
  openclawDesc: string;
  openclawStatus: string;
  blackjackTitle: string;
  blackjackDesc: string;
  blackjackStatus: string;
  emberizeTitle: string;
  emberizeDesc: string;
  emberizeStatus: string;
  description: string;
  responsibilities: string;
  viewDetails: string;
  project3Card1Title: string;
  project3Card1Content: string;
  project3Card1Designation: string;
  project3Card2Title: string;
  project3Card2Content: string;
  project3Card2Designation: string;
  techStackHint: string;
  skipToContent: string;
  statTechnologies: string;
  statCertifications: string;
  statProjects: string;
  certCambridge: string;
  certElastic: string;
  github: string;
  demo: string;
  viewRepo: string;
  footerRole: string;
  themeToDark: string;
  themeToLight: string;
  availableBadge: string;
  navMenu: string;
  navCloseMenu: string;
  navExperience: string;
  navProjects: string;
  contactMe: string;
  downloadCv: string;
  hireFooterCta: string;
  skillsTechnical: string;
  skillsSoft: string;
  techCategoryDevelopment: string;
  techCategoryInfrastructure: string;
  techCategoryObservability: string;
  viewLinkedIn: string;
}

export type Translations = {
  es: TranslationKeys;
  en: TranslationKeys;
};

export const translations: Translations = {
  es: {
    // Header
    title: "Mario de Pablo Damián",
    subtitle: "Fullstack Developer & DevOps Engineer",
    heroTagline:
      "Uso herramientas de IA en el día a día para iterar y entregar más rápido, sin bajar el listón técnico.",
    heroViewProjects: "Ver proyectos",
    heroOpenTo: "Especializado en",
    metricsProjects: "Proyectos entregados",
    metricsClients: "Clientes",
    metricsData: "Datos migrados sin pérdida",
    howIBuildTitle: "Arquitectura habitual",
    howIBuildCaption:
      "Casi siempre React, FastAPI, Nginx, PostgreSQL y Docker. Según el proyecto añado Redis, n8n, Keycloak, Rust u otras piezas.",
    howIBuildAlways: "Casi siempre",
    howIBuildDepends: "Según el proyecto",

    // Sections
    education: "Formación",
    skills: "Aptitudes",
    certifications: "Diplomas",
    languages: "Idiomas",
    experience: "Experiencia Profesional",

    summary:
      "<strong>DevOps & Fullstack Developer</strong> en CIVIR. Construyo aplicaciones web, APIs e integraciones entre sistemas.",
    heroLocation: "Rivas-Vaciamadrid · Remoto",
    experienceTitle: "DevOps Engineer | Fullstack Developer",
    experienceCompany: "CIVIR",
    experiencePeriod: "Mar 2025 - Actual",
    project1: "Plataforma fullstack — Telefónica",
    project1Desc:
      "Desarrollé la <strong>plataforma de extremo a extremo</strong> para Telefónica, <strong>entregando frontend, APIs, persistencia y pipelines de despliegue</strong>, mediante React, FastAPI, Docker, PostgreSQL y GitHub Actions.",
    project1Designation: "Cliente: Telefónica",
    project2: "Proyecto HORECA - CRM + asistente de IA",
    project2Designation: "Cliente: Vincci Hoteles",
    project2Desc:
      "Estabilicé el <strong>CRM con asistente de IA</strong> de Vincci Hoteles, <strong>recortando incidencias críticas de QA y mejorando usabilidad</strong>, pasando de QA a desarrollo activo en frontend y backend con pruebas automatizadas.",
    project3: "Migración de Salesforce a Odoo",
    project3Desc:
      "Migré el <strong>CRM de Salesforce a Odoo</strong> como responsable único, <strong>conservando el 100% de los campos sin pérdida de datos</strong>, mediante módulo Odoo personalizado, mapeo entre sistemas y despliegue en VPS.",
    project3Designation: "Proyecto de reducción de costes",

    // Responsibilities ES
    resp1:
      "Senté las <strong>bases de arquitectura escalable</strong> del proyecto, <strong>habilitando el arranque coordinado de varios servicios</strong>, mediante definición de entornos y coordinación del stack.",
    resp2:
      "Puse en marcha <strong>pantallas de frontend y APIs de backend</strong>, <strong>acortando el time-to-market de funcionalidades clave</strong>, mediante desarrollo iterativo en React y FastAPI.",
    resp3:
      "Desarrollé e integré un <strong>módulo de captura de red en tiempo real</strong>, <strong>ampliando las capacidades del backend</strong>, mediante un proxy-sniffer propio.",
    resp4:
      "Estructuré el <strong>modelo de datos y la persistencia</strong>, <strong>garantizando integridad y consultas eficientes</strong>, mediante modelado relacional y validación de esquemas en PostgreSQL.",
    resp5:
      "Estandaricé <strong>entornos de desarrollo y producción</strong>, <strong>eliminando divergencias entre local y servidor</strong>.",
    resp6:
      "Extendí la <strong>plataforma a despliegues en planta</strong>, <strong>con servicios edge en entornos de red reales</strong>, mediante configuración de Raspberry Pi y switches en campo.",
    resp7:
      "Reduje <strong>pasos manuales en pruebas y despliegues</strong>, <strong>automatizando el ciclo de entrega del proyecto</strong>, mediante pipelines de CI/CD en GitHub Actions.",
    resp8:
      "Mejoré <strong>rendimiento y mantenibilidad del código</strong>, <strong>elevando la calidad técnica del sistema</strong>, mediante refactorización y mejoras de arquitectura.",
    resp9:
      "Habilité la <strong>gestión de varios clientes en un mismo despliegue</strong>, <strong>con aislamiento seguro por tenant</strong>, mediante personalización multitenant sobre infraestructura compartida.",
    resp11:
      "Corregí <strong>deficiencias críticas detectadas en QA</strong>, <strong>acelerando la salida de fixes a producción</strong>, mediante desarrollo directo en frontend y backend del CRM.",
    resp12:
      "Mejoré <strong>estabilidad y rendimiento del CRM</strong>, <strong>reduciendo fricción en flujos del asistente de IA</strong>, mediante corrección de bugs y optimización de pantallas clave.",
    resp13:
      "Recorté <strong>regresiones en entregas sucesivas</strong>, <strong>documentando incidencias y cubriendo flujos con pruebas</strong>, mediante automatización de tests y seguimiento con el equipo.",
    resp14:
      "Completé en <strong>media jornada</strong> la migración que CIVIR México estimó en <strong>un mes</strong>, <strong>reduciendo el plazo de entrega en órdenes de magnitud</strong>, mediante el MCP de n8n y workflows automatizados.",
    resp15:
      "Preservé <strong>el 100% de los campos del CRM de Salesforce</strong> en Odoo, <strong>sin pérdida de datos en la migración</strong>, mediante mapeo validado campo a campo entre sistemas.",
    resp16:
      "Dejé operativos <strong>entornos de desarrollo y producción en VPS</strong>, <strong>con despliegue endurecido frente a acceso no autorizado</strong>, mediante firewall en servidor y en la capa del proveedor cloud.",
    resp17:
      "Centralicé <strong>gestión empresarial y soporte IT de LEDEC</strong>, <strong>unificando operación en dos plataformas</strong>, mediante implementación conjunta de Odoo y GLPI.",
    resp18:
      "Cubrí <strong>procesos de negocio y ticketing del cliente</strong>, <strong>adaptando ERP y soporte a su operativa real</strong>, mediante configuración, integración y personalización a medida.",
    resp19:
      "Puse en marcha <strong>control horario conforme a normativa</strong>, <strong>con registro fiable de entradas, salidas y horarios</strong>, mediante fichajes y gestión de jornada en producción.",
    resp20:
      "Dejé el <strong>sistema de registro horario listo para auditoría</strong>, <strong>cumpliendo requisitos legales de trazabilidad</strong>, mediante despliegue en producción y validación de flujos normativos.",

    // Education
    educationTitle:
      "Técnico Superior: Desarrollo de Aplicaciones Multiplataforma",
    educationSchool: "Davante MEDAC Albalá",
    educationCity: "Madrid",
    educationDate: "06/2025",

    // Skills
    skill1: "Alta capacidad de aprendizaje",
    skill2: "Razonamiento lógico y analítico",
    skill3: "Observación y atención al detalle",
    skill4: "Adaptabilidad y flexibilidad",
    skill5: "Trabajo en equipo",
    skill6: "Orientación a resultados",

    // Languages
    spanish: "Español",
    english: "Inglés",
    native: "Nativo",
    level: "B2 - C1",
    levelDescription: "Intermedio alto - Avanzado",

    // Footer
    copyright: "© 2025 Mario de Pablo Damián - Fullstack Developer",

    // Certifications
    certReact: "Formación certificada en React",
    certFastAPI: "Formación certificada en FastAPI",
    certOdoo: "Formación certificada en Odoo",

    // Projects
    personalProjects: "Proyectos personales",
    projectFeatured: "Destacado",
    projectLive: "En producción",
    pilatesTitle: "Studio Pilates Lucía Lotero",
    pilatesDesc:
      "CRM completo para gestionar clientes, reservas, pagos y la operativa del estudio en Rivas-Vaciamadrid, con web pública orientada a conversión.",
    pilatesStatus:
      "Posicionamiento #1 en Google para «pilates en rivas»",
    openclawTitle: "OpenClaw self-hosted",
    openclawDesc:
      "Monté un gateway personal para ganar productividad y quitarme tareas tediosas o repetitivas — por ejemplo, análisis SEO y GEO periódicos sobre las URLs que configuro, ejecutados por agentes y automatizaciones.",
    openclawStatus:
      "Uso personal: en la demo solo verás el login, no el interior de la app",
    blackjackTitle: "Blackjack For All",
    blackjackDesc:
      "Calcula las probabilidades de ganar, perder o empatar en cada mano y recomienda la mejor jugada según las condiciones del momento, con algoritmos de probabilidad para optimizar la estrategia.",
    blackjackStatus:
      "Alpha funcional · pendiente tutorial y marketing",
    emberizeTitle: "Emberize - Red Social Deportiva",
    emberizeDesc:
      "Plataforma social tipo Instagram enfocada en deportistas, con funcionalidad de match (similar a Tinder) para encontrar compañeros de entrenamiento. Permite organizar y unirse a eventos deportivos y crear comunidades alrededor del deporte.",
    emberizeStatus:
      "Pospuesto indefinidamente por falta de tiempo y financiación",
    
    // Modal
    description: "Descripción",
    responsibilities: "Responsabilidades",
    viewDetails: "Ver detalles",

    // Project 3 Cards
    project3Card1Title: "Implementación Odoo + GLPI",
    project3Card1Content:
      "Desplegué <strong>Odoo y GLPI para LEDEC</strong>, <strong>centralizando ERP y soporte IT en una sola operación</strong>, mediante configuración completa, integración entre sistemas y personalización a medida.",
    project3Card1Designation: "Cliente: LEDEC",
    project3Card2Title: "Control Horario",
    project3Card2Content:
      "Entregué <strong>control horario legal</strong>, <strong>con registro de jornada auditable y conforme a normativa</strong>, mediante fichajes, gestión de horarios y despliegue en producción.",
    project3Card2Designation: "Proyecto de Cumplimiento Normativo",
    techStackHint: "Arrastra o haz clic en un icono para explorar",
    skipToContent: "Saltar al contenido principal",
    statTechnologies: "Tecnologías",
    statCertifications: "Certificaciones",
    statProjects: "Proyectos",
    certCambridge:
      "Cambridge English Level 1 Certificate in ESOL International (First)",
    certElastic: "Elastic Observability Engineer (On-Demand)",
    github: "GitHub",
    demo: "Demo",
    viewRepo: "Ver repositorio",
    footerRole: "Fullstack Developer & DevOps Engineer",
    themeToDark: "Cambiar a modo oscuro",
    themeToLight: "Cambiar a modo claro",
    availableBadge: "DevOps & Fullstack · CIVIR",
    navMenu: "Menú",
    navCloseMenu: "Cerrar menú",
    navExperience: "Experiencia",
    navProjects: "Proyectos",
    contactMe: "Contactar",
    downloadCv: "Descargar CV",
    hireFooterCta: "¿Te encaja mi perfil? Escríbeme y hablamos.",
    skillsTechnical: "Stack técnico",
    skillsSoft: "Competencias",
    techCategoryDevelopment: "Desarrollo",
    techCategoryInfrastructure: "Infraestructura",
    techCategoryObservability: "Observabilidad",
    viewLinkedIn: "LinkedIn",
  },
  en: {
    // Header
    title: "Mario de Pablo Damián",
    subtitle: "Fullstack Developer & DevOps Engineer",
    heroTagline:
      "I use AI tools day to day to iterate and ship faster, without lowering the technical bar.",
    heroViewProjects: "View projects",
    heroOpenTo: "Specialized in",
    metricsProjects: "Projects shipped",
    metricsClients: "Clients",
    metricsData: "Data migrated, zero loss",
    howIBuildTitle: "Usual architecture",
    howIBuildCaption:
      "Almost always React, FastAPI, Nginx, PostgreSQL and Docker. Depending on the project I add Redis, n8n, Keycloak, Rust or other pieces.",
    howIBuildAlways: "Almost always",
    howIBuildDepends: "Depends on the project",

    // Sections
    education: "Education",
    skills: "Skills",
    certifications: "Certifications",
    languages: "Languages",
    experience: "Professional Experience",

    summary:
      "<strong>DevOps & Fullstack Developer</strong> at CIVIR. I build web applications, APIs, and system integrations.",
    heroLocation: "Rivas-Vaciamadrid · Remote",

    experienceTitle: "DevOps Engineer | Fullstack Developer",
    experienceCompany: "CIVIR",
    experiencePeriod: "Mar 2025 - Present",
    project1: "Fullstack platform — Telefónica",
    project1Desc:
      "Built the <strong>end-to-end platform</strong> for Telefónica, <strong>delivering frontend, APIs, data persistence, and deployment pipelines</strong>, using React, FastAPI, Docker, PostgreSQL, and GitHub Actions.",
    project1Designation: "Client: Telefónica",
    project2: "HORECA Project - CRM + AI assistant",
    project2Designation: "Client: Vincci Hoteles",
    project2Desc:
      "Stabilized Vincci Hoteles' <strong>CRM with AI assistant</strong>, <strong>cutting critical QA defects and improving usability</strong>, by moving from QA to active frontend and backend development with automated testing.",
    project3: "Salesforce to Odoo Migration",
    project3Desc:
      "Migrated the <strong>CRM from Salesforce to Odoo</strong> as sole project lead, <strong>preserving 100% of fields with zero data loss</strong>, with a custom Odoo module, data mapping, and VPS deployment.",
    project3Designation: "Cost reduction project",

    // Responsibilities EN
    resp1:
      "Established <strong>scalable architecture foundations</strong>, <strong>enabling coordinated kickoff of multiple services</strong>, by defining environments and coordinating the technical stack.",
    resp2:
      "Shipped <strong>frontend screens and backend APIs</strong>, <strong>shortening time-to-market for key features</strong>, by iterative development in React and FastAPI.",
    resp3:
      "Built and integrated a <strong>real-time network capture module</strong>, <strong>extending backend capabilities</strong>, with a custom proxy-sniffer.",
    resp4:
      "Structured the <strong>data model and persistence layer</strong>, <strong>ensuring integrity and efficient queries</strong>, by relational modeling and schema validation in PostgreSQL.",
    resp5:
      "Standardized <strong>dev and production environments</strong>, <strong>removing drift between local and server setups</strong>.",
    resp6:
      "Extended the <strong>platform to on-site deployments</strong>, <strong>with edge services in real network environments</strong>, by configuring Raspberry Pi and switches in the field.",
    resp7:
      "Cut <strong>manual steps in testing and deployments</strong>, <strong>automating the project delivery cycle</strong>, by configuring CI/CD pipelines in GitHub Actions.",
    resp8:
      "Improved <strong>performance and code maintainability</strong>, <strong>raising overall technical quality</strong>, by refactoring and architectural improvements.",
    resp9:
      "Enabled <strong>multiple clients on a shared deployment</strong>, <strong>with secure per-tenant isolation</strong>, by multitenant customization on shared infrastructure.",
    resp11:
      "Fixed <strong>critical defects found in QA</strong>, <strong>accelerating production fixes</strong>, by taking on direct frontend and backend development on the CRM.",
    resp12:
      "Improved <strong>CRM stability and performance</strong>, <strong>reducing friction in AI assistant workflows</strong>, by fixing bugs and optimizing key screens.",
    resp13:
      "Reduced <strong>regressions across releases</strong>, <strong>documenting incidents and covering flows with tests</strong>, by test automation and close collaboration with the team.",
    resp14:
      "Completed in <strong>half a day</strong> a migration <strong>CIVIR Mexico had scoped at one month</strong>, <strong>cutting delivery time by orders of magnitude</strong>, using the n8n MCP and automated workflows.",
    resp15:
      "Preserved <strong>100% of Salesforce CRM fields</strong> in Odoo, <strong>with zero data loss in the migration</strong>, by validated field-by-field mapping between systems.",
    resp16:
      "Stood up <strong>dev and production environments on a VPS</strong>, <strong>hardening deployment against unauthorized access</strong>, with firewalls at server and cloud provider level.",
    resp17:
      "Centralized <strong>LEDEC business management and IT support</strong>, <strong>unifying operations across two platforms</strong>, by jointly implementing Odoo and GLPI.",
    resp18:
      "Covered <strong>client business processes and ticketing</strong>, <strong>aligning ERP and support to real operations</strong>, by configuration, integration, and tailored customization.",
    resp19:
      "Launched <strong>legally compliant time tracking</strong>, <strong>with reliable check-in, check-out, and schedule records</strong>, by attendance flows and schedule management in production.",
    resp20:
      "Left the <strong>time-tracking system audit-ready</strong>, <strong>meeting legal traceability requirements</strong>, by production deployment and validation of compliance workflows.",

    // Education
    educationTitle: "Higher Technician: Multi-platform Application Development",
    educationSchool: "Davante MEDAC Albalá",
    educationCity: "Madrid",
    educationDate: "06/2025",

    // Skills
    skill1: "Very fast learning ability",
    skill2: "Logical and analytical reasoning",
    skill3: "Observation and attention to detail",
    skill4: "Adaptability and flexibility",
    skill5: "Teamwork",
    skill6: "Results-oriented",

    // Languages
    spanish: "Spanish",
    english: "English",
    native: "Native",
    level: "B2 - C1",
    levelDescription: "Intermediate high - Advanced",

    // Footer
    copyright: "© 2025 Mario de Pablo Damián - Fullstack Developer",

    // Certifications
    certReact: "Certified Training in React",
    certFastAPI: "Certified Training in FastAPI",
    certOdoo: "Certified Training in Odoo",

    // Projects
    personalProjects: "Personal projects",
    projectFeatured: "Featured",
    projectLive: "Live",
    pilatesTitle: "Studio Pilates Lucía Lotero",
    pilatesDesc:
      "Full CRM to manage clients, bookings, payments, and studio operations in Rivas-Vaciamadrid, with a public conversion-focused website.",
    pilatesStatus:
      "#1 Google ranking for «pilates en rivas»",
    openclawTitle: "OpenClaw self-hosted",
    openclawDesc:
      "Built a personal gateway to boost productivity and offload tedious or repetitive tasks — for example, periodic SEO and GEO analysis on URLs I configure, run by agents and automations.",
    openclawStatus:
      "Personal use: the demo stops at login, the app interior isn't public",
    blackjackTitle: "Blackjack For All",
    blackjackDesc:
      "Calculates win, loss, and tie probabilities for each hand and recommends the best play based on current conditions, using probability algorithms to optimize strategy.",
    blackjackStatus:
      "Working alpha · tutorial and marketing pending",
    emberizeTitle: "Emberize - Sports Social Network",
    emberizeDesc:
      "Instagram-like social platform focused on athletes, with match functionality (similar to Tinder) to find training partners. Allows organizing and joining sports events and creating communities around sports.",
    emberizeStatus: "Indefinitely postponed due to lack of time and funding",
    
    // Modal
    description: "Description",
    responsibilities: "Responsibilities",
    viewDetails: "View details",

    // Project 3 Cards
    project3Card1Title: "Odoo + GLPI Implementation",
    project3Card1Content:
      "Deployed <strong>Odoo and GLPI for LEDEC</strong>, <strong>centralizing ERP and IT support in one operation</strong>, by full configuration, system integration, and tailored customization.",
    project3Card1Designation: "Client: LEDEC",
    project3Card2Title: "Time Control System",
    project3Card2Content:
      "Delivered <strong>legally compliant time tracking</strong>, <strong>with auditable work-hour records</strong>, by check-in/out flows, schedule management, and production deployment.",
    project3Card2Designation: "Regulatory Compliance Project",
    techStackHint: "Drag or click an icon to explore",
    skipToContent: "Skip to main content",
    statTechnologies: "Technologies",
    statCertifications: "Certifications",
    statProjects: "Projects",
    certCambridge:
      "Cambridge English Level 1 Certificate in ESOL International (First)",
    certElastic: "Elastic Observability Engineer (On-Demand)",
    github: "GitHub",
    demo: "Demo",
    viewRepo: "View repository",
    footerRole: "Fullstack Developer & DevOps Engineer",
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
    availableBadge: "DevOps & Fullstack · CIVIR",
    navMenu: "Menu",
    navCloseMenu: "Close menu",
    navExperience: "Experience",
    navProjects: "Projects",
    contactMe: "Contact me",
    downloadCv: "Download CV",
    hireFooterCta: "Interested in my profile? Get in touch.",
    skillsTechnical: "Technical stack",
    skillsSoft: "Core strengths",
    techCategoryDevelopment: "Development",
    techCategoryInfrastructure: "Infrastructure",
    techCategoryObservability: "Observability",
    viewLinkedIn: "LinkedIn",
  },
};
