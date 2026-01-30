export function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        🌍
      </span>

      <select
        {...props}
        className={`
          w-full px-4 py-2.5 pl-11 rounded-xl border border-slate-300 
          bg-white text-slate-800 text-sm
          shadow-sm transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-slate-100 disabled:cursor-not-allowed
          appearance-none
          ${className}
        `}
      />
    </div>
  );
}
