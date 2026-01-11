export interface TranslationKeys {
  title: string;
  subtitle: string;
  contact: string;
  education: string;
  skills: string;
  certifications: string;
  languages: string;
  about: string;
  experience: string;
  summary: string;
  experienceTitle: string;
  experienceCompany: string;
  experiencePeriod: string;
  project1: string;
  project1Desc: string;
  project2: string;
  project2Desc: string;
  project3: string;
  project3Desc: string;
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
  blackjackTitle: string;
  blackjackDesc: string;
  blackjackStatus: string;
  emberizeTitle: string;
  emberizeDesc: string;
  emberizeStatus: string;
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

    // Sections
    contact: "Contacto",
    education: "Formación",
    skills: "Aptitudes",
    certifications: "Diplomas",
    languages: "Idiomas",
    about: "Sobre Mí",
    experience: "Experiencia Profesional",

    // Summary
    summary:
      "Profesional de software con experiencia en <strong>desarrollo web, móvil e integración de sistemas</strong>, incluyendo proyectos industriales y personales. Utilizo <strong>herramientas de inteligencia artificial</strong> para acelerar el desarrollo, aplicando <strong>validación y revisión crítica</strong> para garantizar la calidad del código. Mi enfoque se centra en la <strong>práctica real</strong> y la <strong>comprensión profunda</strong> de las tecnologías, más allá de certificaciones formales. Me mantengo constantemente actualizado con las <strong>últimas innovaciones y metodologías</strong> del sector para aplicar las mejores prácticas en cada proyecto.",

    // Experience
    experienceTitle: "DevOps Engineer | Fullstack Developer",
    experienceCompany: "CIVIR",
    experiencePeriod: "Mar 2025 - Actual",
    project1: "Proyecto de Observabilidad Industrial",
    project1Desc:
      "Participación activa en el desarrollo e integración de múltiples plataformas orientadas a la observabilidad de entornos industriales.",
    project2: "Proyecto HORECA - CRM + asistente de IA",
    project2Desc:
      "Comencé como QA Tester, encargado de la validación funcional y detección de errores en la plataforma.",
    project3: "Migración de Salesforce a Odoo",
    project3Desc:
      "Proyecto de migración de CRM desde Salesforce a Odoo. <strong>Responsable único del proyecto</strong>, desarrollándolo de forma completamente independiente según los requerimientos del cliente.",

    // Responsibilities ES
    resp1:
      "Colaboración en la <strong>definición de la arquitectura</strong>, configuración de entornos y puesta en marcha del desarrollo.",
    resp2:
      "Desarrollo de <strong>pantallas del frontend</strong> y <strong>endpoints del backend</strong>.",
    resp3:
      "Implementación de un <strong>proxy-sniffer propio</strong> para la captura y análisis de tráfico.",
    resp4:
      "<strong>Diseño y creación de tablas</strong> en la base de datos, garantizando integridad y eficiencia.",
    resp5:
      "<strong>Despliegue de servicios con Docker</strong> y configuración de entornos y contenedores.",
    resp6:
      "<strong>Instalación y configuración de Raspberry Pi y switches de red</strong>, integrando hardware con la infraestructura del proyecto.",
    resp7:
      "Configuración de <strong>pipelines de CI/CD con GitHub Actions</strong> para automatizar pruebas y despliegues.",
    resp8:
      "<strong>Refactorización de código</strong> y propuesta de <strong>mejoras técnicas y arquitectónicas</strong> para optimizar rendimiento y mantenibilidad.",
    resp9:
      "Desarrollo de un entorno <strong>multitenant</strong>, permitiendo gestionar múltiples clientes en una misma infraestructura de forma segura y aislada, <strong>ofreciendo soluciones personalizadas y adaptadas a las necesidades específicas de cada uno</strong>.",
    resp11:
      "Tras identificar deficiencias críticas, asumí un rol activo en el <strong>desarrollo de soluciones</strong>, participando tanto en <strong>frontend como backend</strong>.",
    resp12:
      "Contribuí a <strong>mejorar la estabilidad, usabilidad y rendimiento</strong> general del sistema.",
    resp13:
      "Participación en la <strong>automatización de pruebas</strong>, documentación de incidencias y colaboración directa con el equipo de desarrollo para aplicar mejoras continuas.",
    resp14:
      "Desarrollo de un <strong>módulo personalizado en Odoo</strong> para mantener todos los campos del CRM de Salesforce y garantizar la compatibilidad de datos.",
    resp15:
      "Configuración de <strong>entornos de desarrollo y producción en un VPS</strong>, incluyendo la configuración de <strong>firewall y certificados SSL</strong>.",
    resp16:
      "Análisis y <strong>mapeo de datos</strong> entre Salesforce y Odoo, identificando correspondencias y transformaciones necesarias para garantizar la integridad de la información.",

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

    // Personal Projects
    personalProjects: "Proyectos Personales",
    blackjackTitle: "Calculadora de EV - Blackjack",
    blackjackDesc:
      "Aplicación móvil que calcula matemáticamente las probabilidades de ganar, perder o empatar en cada mano de blackjack, así como la mejor jugada según las condiciones del momento. Utiliza algoritmos de probabilidad avanzados para optimizar la estrategia de juego.",
    blackjackStatus:
      "Funcional en fase alpha, pendiente de implementar sistema de anuncios",
    emberizeTitle: "Emberize - Red Social Deportiva",
    emberizeDesc:
      "Plataforma social tipo Instagram enfocada en deportistas, con funcionalidad de match (similar a Tinder) para encontrar compañeros de entrenamiento. Permite organizar y unirse a eventos deportivos y crear comunidades alrededor del deporte.",
    emberizeStatus:
      "Pospuesto indefinidamente por falta de tiempo y financiación",
  },
  en: {
    // Header
    title: "Mario de Pablo Damián",
    subtitle: "Fullstack Developer & DevOps Engineer",

    // Sections
    contact: "Contact",
    education: "Education",
    skills: "Skills",
    certifications: "Certifications",
    languages: "Languages",
    about: "About Me",
    experience: "Professional Experience",

    // Summary
    summary:
      "Software professional with experience in <strong>web, mobile development and systems integration</strong>, including industrial and personal projects. I leverage <strong>artificial intelligence tools</strong> to accelerate development, applying <strong>validation and critical review</strong> to ensure code quality. My approach focuses on <strong>real-world practice</strong> and <strong>deep understanding</strong> of technologies, beyond formal certifications. I continuously stay updated with the <strong>latest innovations and methodologies</strong> in the industry to apply best practices in every project.",

    // Experience
    experienceTitle: "DevOps Engineer | Fullstack Developer",
    experienceCompany: "CIVIR",
    experiencePeriod: "Mar 2025 - Present",
    project1: "Industrial Observability Project",
    project1Desc:
      "Active participation in the development and integration of multiple platforms oriented to the observability of industrial environments.",
    project2: "HORECA Project - CRM + AI assistant",
    project2Desc:
      "I started as a QA Tester, responsible for functional validation and error detection in the platform.",
    project3: "Salesforce to Odoo Migration",
    project3Desc:
      "CRM migration project from Salesforce to Odoo. <strong>Sole project lead</strong>, developing it completely independently according to client requirements.",

    // Responsibilities EN
    resp1:
      "Collaboration in the <strong>definition of the architecture</strong>, environment configuration and development startup.",
    resp2:
      "Development of <strong>frontend screens</strong> and <strong>backend endpoints</strong>.",
    resp3:
      "Implementation of a <strong>custom proxy-sniffer</strong> for traffic capture and analysis.",
    resp4:
      "<strong>Design and creation of tables</strong> in the database, ensuring integrity and efficiency.",
    resp5:
      "<strong>Docker service deployment</strong> and environment and container configuration.",
    resp6:
      "<strong>Installation and configuration of Raspberry Pi and network switches</strong>, integrating hardware with the project infrastructure.",
    resp7:
      "Configuration of <strong>CI/CD pipelines with GitHub Actions</strong> to automate tests and deployments.",
    resp8:
      "<strong>Code refactoring</strong> and proposal of <strong>technical and architectural improvements</strong> to optimize performance and maintainability.",
    resp9:
      "Development of a <strong>multitenant</strong> environment, allowing management of multiple clients in the same infrastructure in a secure and isolated way, <strong>offering personalized solutions adapted to the specific needs of each one</strong>.",
    resp11:
      "After identifying critical deficiencies, I took an active role in <strong>solution development</strong>, participating in both <strong>frontend and backend</strong>.",
    resp12:
      "I contributed to <strong>improve stability, usability and performance</strong> of the system.",
    resp13:
      "Participation in <strong>test automation</strong>, incident documentation and direct collaboration with the development team to apply continuous improvements.",
    resp14:
      "Development of a <strong>custom Odoo module</strong> to maintain all Salesforce CRM fields and ensure data compatibility.",
    resp15:
      "Configuration of <strong>development and production environments on a VPS</strong>, including <strong>firewall and SSL certificates</strong> setup.",
    resp16:
      "Analysis and <strong>data mapping</strong> between Salesforce and Odoo, identifying correspondences and necessary transformations to ensure data integrity.",

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

    // Personal Projects
    personalProjects: "Personal Projects",
    blackjackTitle: "Blackjack EV Calculator",
    blackjackDesc:
      "Mobile application that mathematically calculates the probabilities of winning, losing, or tying in each blackjack hand, as well as the best play according to current conditions. Uses advanced probability algorithms to optimize playing strategy.",
    blackjackStatus:
      "Functional in alpha phase, pending ad system implementation",
    emberizeTitle: "Emberize - Sports Social Network",
    emberizeDesc:
      "Instagram-like social platform focused on athletes, with match functionality (similar to Tinder) to find training partners. Allows organizing and joining sports events and creating communities around sports.",
    emberizeStatus: "Indefinitely postponed due to lack of time and funding",
  },
};
