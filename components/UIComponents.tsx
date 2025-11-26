import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-teal-600 text-white shadow-md shadow-teal-200 hover:bg-teal-700",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
    outline: "border-2 border-teal-600 text-teal-600 bg-transparent hover:bg-teal-50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, unit, error, className = '', ...props }) => (
  <div className={`flex flex-col gap-1 mb-4 ${className}`}>
    <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>
    <div className="relative">
      <input
        className={`w-full p-3 rounded-xl border bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all ${error ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
        {...props}
      />
      {unit && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
          {unit}
        </span>
      )}
    </div>
    {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => (
  <div className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>}
    {children}
  </div>
);

export const StatBadge: React.FC<{ label: string; value: number; unit: string; status: 'normal' | 'low' | 'high' }> = ({ label, value, unit, status }) => {
  const colors = {
    normal: 'bg-green-100 text-green-800 border-green-200',
    low: 'bg-amber-100 text-amber-800 border-amber-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className={`flex flex-col p-3 rounded-xl border ${colors[status]} items-center justify-center`}>
      <span className="text-xs uppercase tracking-wider font-bold opacity-70">{label}</span>
      <span className="text-xl font-bold">{value}</span>
      <span className="text-[10px] opacity-70">{unit}</span>
    </div>
  );
};