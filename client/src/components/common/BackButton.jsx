import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500 hover:text-black transition-colors group ${className}`}
    >
      <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
