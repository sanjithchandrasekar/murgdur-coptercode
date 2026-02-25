import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "uppercase tracking-widest text-sm font-bold py-4 px-8 transition-all duration-300 transform hover:-translate-y-0.5";

  const variants = {
    primary:
      "bg-black text-white hover:bg-[#1a1a1a] border border-black shadow-sm hover:shadow-md",
    secondary:
      "border border-black text-black hover:bg-black hover:text-white bg-transparent",
    outline:
      "border border-black text-black hover:bg-black hover:text-white bg-transparent",
    gold:
      "bg-[#C9A96E] text-white hover:bg-[#b89660] border border-[#C9A96E] shadow-sm hover:shadow-md",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

