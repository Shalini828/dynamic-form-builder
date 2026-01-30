export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full rounded-lg bg-blue-600 text-white font-medium py-2.5 px-4 
      hover:bg-blue-700 active:scale-[.99] transition shadow-sm 
      disabled:bg-blue-300 disabled:cursor-not-allowed ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
