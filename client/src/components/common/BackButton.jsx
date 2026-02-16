import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -5 }}
      className={`flex items-center gap-2 group z-50 pointer-events-auto transition-all ${className}`}
      onClick={() => navigate(-1)}
    >
      <div className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center bg-royal-gold/5 group-hover:bg-royal-gold group-hover:border-royal-gold transition-all duration-300">
        <ChevronLeft
          size={20}
          className="text-royal-gold group-hover:text-black transition-colors"
          strokeWidth={1.5}
        />
      </div>
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-royal-gold group-hover:text-white transition-colors">
        Back
      </span>
    </motion.button>
  );
};

export default BackButton;
