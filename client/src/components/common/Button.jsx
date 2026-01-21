import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "uppercase tracking-widest text-sm font-bold py-4 px-8 transition-all duration-300 transform hover:-translate-y-1";

    const variants = {
        primary: "bg-royal-platinum text-royal-black hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
        secondary: "border border-royal-ivory text-royal-ivory hover:bg-royal-platinum hover:text-royal-black",
        outline: "border border-royal-platinum text-royal-platinum hover:bg-royal-platinum hover:text-royal-black"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
