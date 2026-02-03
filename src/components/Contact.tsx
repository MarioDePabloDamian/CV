import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HiLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { cn } from "../lib/utils";
import { ContactModal } from "./ui/contact-modal";
import { LayoutTextFlip } from "./ui/layout-text-flip";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../config/emailjs";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  useEffect(() => {
    // Inicializar EmailJS con la clave pública
    if (EMAILJS_CONFIG.PUBLIC_KEY) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que los campos requeridos estén llenos
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    
    // Verificar que EmailJS esté configurado
    if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
      console.error('EmailJS no está configurado correctamente. Por favor, configura las variables de entorno.');
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Preparar los parámetros para EmailJS
      // Nota: Las variables deben coincidir con las del template en EmailJS
      const templateParams = {
        name: formData.fullName, // Nombre completo del remitente
        email: formData.email, // Email del remitente
        company: formData.company || 'No especificada', // Empresa (opcional)
        message: formData.message, // Mensaje del formulario
        title: formData.company || 'Sin empresa', // Para el subject
        subject: `Contacto desde CV - ${formData.company || "Sin empresa"}`, // Asunto completo
      };
      
      // Enviar el email usando EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      // Éxito
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Resetear el formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          company: "",
          message: "",
        });
        setSubmitStatus('idle');
        setIsModalOpen(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error al enviar el email:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b-2 border-sky-300 dark:border-sky-600">
        {t.contact}
      </h3>

      {/* Contact Information */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {t.contactInfo}
        </h4>
        <div className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed space-y-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=28521+Rivas-Vaciamadrid+Madrid+España"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
            aria-label="Abrir ubicación en Google Maps"
          >
            <HiLocationMarker
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={16}
            />
            <span className="underline">28521, Rivas-Vaciamadrid (Madrid)</span>
          </a>
          <div className="flex items-center gap-2">
            <HiMail
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={16}
            />
            <button
              onClick={handleEmailClick}
              className="break-all hover:text-sky-600 dark:hover:text-sky-400 transition-colors underline text-left cursor-pointer"
              aria-label="Abrir formulario de contacto"
            >
              mariodepablo2005@gmail.com
            </button>
          </div>
          {isMobile ? (
            <a
              href="tel:+34683127718"
              className="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              aria-label="Llamar a Mario de Pablo Damián"
            >
              <BsTelephone
                className="text-sky-600 dark:text-sky-400 shrink-0"
                size={16}
              />
              <span className="underline">+34 683127718</span>
            </a>
          ) : (
            <div className="flex items-center gap-2">
              <BsTelephone
                className="text-sky-600 dark:text-sky-400 shrink-0"
                size={16}
              />
              <span>+34 683127718</span>
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <a
              href="https://github.com/Mariosos1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 transition-colors"
              aria-label="GitHub de Mario de Pablo Damián"
            >
              <FaGithub
                className="text-sky-600 dark:text-sky-400 shrink-0"
                size={18}
              />
              <AnimatedGradientText className="text-sm" spread={20}>
                GitHub
              </AnimatedGradientText>
            </a>
            <a
              href="https://www.linkedin.com/in/mario-de-pablo-damian/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 transition-colors"
              aria-label="LinkedIn de Mario de Pablo Damián"
            >
              <FaLinkedin
                className="text-sky-600 dark:text-sky-400 shrink-0"
                size={18}
              />
              <AnimatedGradientText className="text-sm" spread={20}>
                LinkedIn
              </AnimatedGradientText>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={t.contactFormTitle}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              <LayoutTextFlip
                text={language === "es" ? "Mi pasión está en el backend, pero puedo trabajar en " : "My passion is backend development, but I can work in "}
                words={language === "es" 
                  ? ["Frontend", "Backend", "Fullstack", "DevOps"]
                  : ["Frontend", "Backend", "Fullstack", "DevOps"]
                }
                duration={2500}
                className="text-sky-600 dark:text-sky-400 font-semibold not-italic"
              />
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
              {language === "es" ? "Te responderé lo antes posible" : "I'll get back to you as soon as possible"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <label
                htmlFor="modal-fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.fullName}
              </label>
              <input
                type="text"
                id="modal-fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700",
                  "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
                  "transition-all duration-200",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label
                htmlFor="modal-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.emailAddress}
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700",
                  "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
                  "transition-all duration-200",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <label
                htmlFor="modal-company"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.company}
              </label>
              <input
                type="text"
                id="modal-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700",
                  "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
                  "transition-all duration-200",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <label
                htmlFor="modal-message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.message}
              </label>
              <textarea
                id="modal-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                disabled={isSubmitting}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700",
                  "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
                  "transition-all duration-200 resize-none",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              />
            </motion.div>

            {/* Mensajes de estado */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              >
                <p className="text-sm text-green-800 dark:text-green-200">
                  {t.sendSuccess}
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <p className="text-sm text-red-800 dark:text-red-200 mb-2">
                  {t.sendError}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  {t.tryAgain}
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                whileHover={!isSubmitting && !submitStatus ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !submitStatus ? { scale: 0.98 } : {}}
                className={cn(
                  "w-full px-6 py-3 rounded-lg font-semibold",
                  "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700",
                  "text-white shadow-lg shadow-sky-500/50",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
                  (isSubmitting || submitStatus === 'success') && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.sending}
                  </span>
                ) : (
                  t.submit
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </ContactModal>
    </div>
  );
};

export default Contact;
