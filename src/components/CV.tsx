import React from "react";
import { motion } from "motion/react";
import { Vortex } from "./ui/vortex";
import Header from "./Header";
import Contact from "./Contact";
import Summary from "./Summary";
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Languages from "./Languages";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import SEO from "./SEO";
import { useTheme } from "../context/ThemeContext";
import { ExpandableCardProvider } from "../context/ExpandableCardContext";

const CV: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen relative">
      <SEO />
      {/* Vortex as Full Background - Lazy loaded for performance */}
      <Vortex
        backgroundColor={theme === "dark" ? "#000000" : "#ffffff"}
        particleCount={700}
        rangeY={100}
        baseHue={theme === "dark" ? 210 : 200}
        baseSpeed={0.0}
        rangeSpeed={1.5}
        baseRadius={1}
        rangeRadius={2}
        className="w-full h-full"
        containerClassName="fixed inset-0 -z-10"
        isDarkMode={theme === "dark"}
        aria-hidden={true}
      />

      {/* All content on top */}
      <ExpandableCardProvider>
      <div className="relative z-10">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-md"
        >
          Saltar al contenido principal
        </a>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-950 shadow-md border-b-4 border-sky-400 dark:border-sky-500 relative transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-end gap-3 mb-6">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <Header />
          </div>
        </motion.div>

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {/* Sidebar - Left Column */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <div className="flex flex-col justify-between h-full gap-2 lg:gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-7 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Contact />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-7 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Education />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-7 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Skills />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-7 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Certifications />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-7 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Languages />
                </motion.div>
              </div>
            </div>

            {/* Main Column - Right Side */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <div className="flex flex-col justify-between h-full gap-4 lg:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Summary />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300"
                >
                  <Experience />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Personal Projects - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <Projects />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-900 dark:bg-black text-white mt-16 py-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400 dark:text-gray-500">
              © 2025 Mario de Pablo Damián
            </p>
          </div>
        </motion.div>
      </div>
      </ExpandableCardProvider>
    </div>
  );
};

export default CV;
