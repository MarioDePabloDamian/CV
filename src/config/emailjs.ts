// Configuración de EmailJS
// Para obtener estos valores:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Crea un servicio de email (Gmail)
// 4. Crea una plantilla de email
// 5. Obtén tu Public Key, Service ID y Template ID

export const EMAILJS_CONFIG = {
  // Tu Public Key de EmailJS (lo encuentras en Account > API Keys)
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  
  // ID del servicio de email (lo encuentras en Email Services)
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  
  // ID de la plantilla de email (lo encuentras en Email Templates)
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  
  // Email de destino
  TO_EMAIL: 'mariodepablo2005@gmail.com',
};
