import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export function Input({ icon, className = "", ...props }: Props) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition
        ${icon ? "pl-10" : ""} ${className}`}
      />
    </div>
  );
}
