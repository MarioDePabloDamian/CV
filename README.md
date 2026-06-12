# CV React con Tailwind CSS

Aplicación moderna e interactiva de CV desarrollada con React 19, TypeScript y Tailwind CSS 4. Incluye internacionalización, tema oscuro/claro, y efectos visuales avanzados con partículas.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌐 Demo en Vivo

👉 **[Ver CV Online](https://mariodepablo.es)**

## 🚀 Tecnologías

- **React 19** - Framework de JavaScript para interfaces de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS 4** - Framework de CSS utilitario moderno
- **Vite 7** - Herramienta de construcción ultrarrápida
- **React Router 7** - Enrutamiento del lado del cliente
- **Motion** - Biblioteca de animaciones fluidas
- **TSParticles** - Efectos de partículas interactivos
- **React Icons** - Iconos modernos y consistentes

## 📦 Instalación

1. Instala las dependencias:

```bash
pnpm install
```

## 🏃 Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Construcción

Para crear una versión de producción:

```bash
pnpm build
```

Los archivos de producción se generarán en la carpeta `dist/`.

## 👀 Vista Previa

Para previsualizar la construcción de producción:

```bash
pnpm preview
```

## ✨ Características Principales

### 🌐 Internacionalización

- ✅ Soporte multiidioma (Español/English)
- ✅ Selector de idioma integrado
- ✅ Persistencia en localStorage
- ✅ Traducciones modulares
- ✅ Rutas con idioma (`/es`, `/en`)
- ✅ Redirección automática de rutas inválidas

### 🎨 Tema Dinámico

- ✅ Modo claro y oscuro
- ✅ Toggle de tema integrado
- ✅ Persistencia de preferencias
- ✅ Transiciones suaves
- ✅ Scrollbar personalizado adaptado al tema

### 🎭 Efectos Visuales

- ✅ Partículas interactivas (Vortex)
- ✅ Animaciones fluidas con Motion
- ✅ Diseño moderno y atractivo
- ✅ Efectos de hover avanzados
- ✅ Animaciones de entrada al hacer scroll

### 📱 Responsive Design

- ✅ Diseño adaptativo completo
- ✅ Optimizado para móviles, tablets y desktop
- ✅ UX optimizada en todos los dispositivos
- ✅ Grid responsivo con Tailwind CSS

### ⚡ Performance

- ✅ Code splitting inteligente
- ✅ Optimización automática de bundles
- ✅ Build optimizado para producción
- ✅ Lazy loading de componentes pesados

### 🚀 Deploy Automático

- ✅ CI/CD con GitHub Actions
- ✅ Despliegue automático en GitHub Pages al publicar releases
- ✅ Verificación de TypeScript antes del deploy
- ✅ Build y deploy automatizados

### 🎯 Proyectos Personales

- ✅ Sección dedicada a proyectos personales
- ✅ Descripción detallada de cada proyecto
- ✅ Estados de desarrollo visibles

## 📂 Estructura del Proyecto

```
CV/
├── src/
│   ├── components/          # Componentes React reutilizables
│   │   ├── Header.tsx       # Encabezado con foto y título
│   │   ├── Contact.tsx      # Información de contacto
│   │   ├── Summary.tsx      # Resumen profesional
│   │   ├── Experience.tsx   # Experiencia profesional
│   │   ├── Education.tsx    # Formación académica
│   │   ├── Skills.tsx       # Aptitudes y habilidades
│   │   ├── Certifications.tsx # Certificaciones
│   │   ├── Languages.tsx    # Idiomas
│   │   ├── Projects.tsx     # Proyectos personales
│   │   ├── LanguageSelector.tsx # Selector de idioma
│   │   ├── ThemeToggle.tsx  # Toggle de tema
│   │   ├── CV.tsx           # Componente principal
│   │   └── ui/
│   │       └── vortex.tsx   # Efectos de partículas
│   ├── context/             # Context API
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── translations/       # Archivos de traducción
│   │   └── translations.ts
│   ├── lib/                 # Utilidades
│   │   └── utils.ts         # Funciones auxiliares
│   ├── assets/              # Recursos estáticos
│   │   └── FotoCV.jpg
│   ├── App.tsx              # Componente principal de routing
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/                  # Archivos estáticos públicos
│   ├── _redirects          # Configuración de redirecciones
│   └── CNAME                # Dominio personalizado
├── .github/
│   └── workflows/
│       └── deploy.yml      # Workflow de deploy automático
├── components.json          # Configuración de shadcn/ui
├── vite.config.ts          # Configuración de Vite
└── package.json            # Dependencias del proyecto
```

## 🎨 Personalización

### Editar Contenido

1. **Datos Personales**: Edita `src/components/Header.tsx`
2. **Contacto**: Modifica `src/components/Contact.tsx`
3. **Resumen**: Actualiza `src/components/Summary.tsx`
4. **Experiencia**: Edita `src/components/Experience.tsx` y `src/translations/translations.ts`
5. **Educación**: Modifica `src/components/Education.tsx` y traducciones
6. **Habilidades**: Actualiza `src/components/Skills.tsx` y traducciones
7. **Certificaciones**: Edita `src/components/Certifications.tsx`
8. **Idiomas**: Modifica `src/components/Languages.tsx` y traducciones
9. **Proyectos Personales**: Actualiza `src/components/Projects.tsx` y traducciones

### Agregar Idiomas

1. Edita `src/translations/translations.ts`
2. Agrega las traducciones en el objeto correspondiente
3. Actualiza el tipo `Language` en `src/App.tsx` y `src/context/LanguageContext.tsx`

### Personalizar Tema

- Modifica los colores en `src/index.css`
- Ajusta las variables CSS para theme personalizado
- Personaliza el scrollbar en `src/index.css`

### Cambiar Dominio

1. Edita `public/CNAME` con tu dominio
2. Configura DNS en tu proveedor de dominio apuntando a GitHub Pages

## 🚀 Deploy en GitHub Pages

### Deploy Automático con Releases

El proyecto está configurado para desplegarse automáticamente en GitHub Pages cuando se publica una nueva release:

1. **Haz commit de tus cambios:**
```bash
git add .
git commit -m "Update CV"
```

2. **Push del código:**
```bash
git push origin main
```

3. **Crea una nueva release en GitHub:**
   - Ve a tu repositorio en GitHub
   - Haz clic en "Releases" → "Create a new release"
   - Crea un nuevo tag (ej: `v1.0.1`)
   - Añade un título y descripción
   - Publica la release

4. **El workflow se ejecutará automáticamente:**
   - Verificará TypeScript
   - Generará el build
   - Desplegará en GitHub Pages

### Configuración Inicial de GitHub Pages

Si es la primera vez que configuras GitHub Pages:

1. Ve a Settings → Pages en tu repositorio
2. En "Source", selecciona "GitHub Actions"
3. Configura el dominio personalizado:
   - Añade tu dominio en Settings → Pages → Custom domain
   - Configura los registros DNS según las instrucciones de GitHub

### URL del Sitio

Después del deploy, tu CV estará disponible en:

```
https://mariodepablo.es
```

### Notas Importantes

- El archivo `public/_redirects` es necesario para que React Router funcione correctamente en GitHub Pages
- El archivo `public/CNAME` configura tu dominio personalizado
- Asegúrate de que el build se genera correctamente antes de hacer push

## 📄 Licencia

MIT - Siéntete libre de usar este proyecto para tu CV personal.

## 👤 Autor

**Mario de Pablo Damián**

- 🌐 Website: [mariodepablo.es](https://mariodepablo.es)
- 💼 GitHub: [@Mariosos1](https://github.com/Mariosos1)

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Motion](https://motion.dev/)
- [TSParticles](https://tsparticles.pierogis.dev/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
