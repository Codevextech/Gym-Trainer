import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SectionHeading({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      {subtitle && <p className="text-primary font-bold tracking-wider uppercase text-sm mb-2">{subtitle}</p>}
      <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground uppercase">
        {title}
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
    </div>
  );
}

export function PageTransition({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Button({ 
  children, variant = 'primary', className = '', ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }) {
  const base = "inline-flex items-center justify-center font-display uppercase tracking-wider transition-all duration-300 rounded-md px-6 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-foreground hover:text-primary hover:bg-white/5",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${props.className || ''}`}
    />
  );
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={`w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[120px] resize-y ${props.className || ''}`}
    />
  );
});
