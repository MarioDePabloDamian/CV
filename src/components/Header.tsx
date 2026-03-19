import React from "react";
import { motion } from "motion/react";
import profilePhoto from "../assets/FotoCV.jpg";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-2"
          id="main-heading"
        >
          Fullstack Developer & DevOps Engineer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium"
        >
          Mario de Pablo Damián
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {[
            "React",
            "Python",
            "PostgreSQL",
            "Docker",
            "Nginx",
            "Let's Encrypt",
            "Keycloak",
            "Zabbix",
            "Elastic",
            "Zeek",
            "Odoo",
            "GLPI",
          ].map((tech, idx) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 rounded-full text-sm font-medium transition-colors hover:bg-sky-200 dark:hover:bg-sky-800"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Profile Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatedTooltip
          name="Mario de Pablo Damián"
          designation="Fullstack Developer & DevOps Engineer"
        >
          <div className="w-40 h-40 rounded-full border-4 border-sky-400 dark:border-sky-500 overflow-hidden bg-white dark:bg-gray-700 p-1 shadow-xl transition-transform duration-300 group-hover:scale-105 cursor-pointer">
            <img
              src={profilePhoto}
              alt="Mario de Pablo Damián - Fullstack Developer & DevOps Engineer"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
              decoding="async"
              width="160"
              height="160"
            />
          </div>
        </AnimatedTooltip>
      </motion.div>
    </div>
  );
};

export default Header;
