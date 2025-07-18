export function Button({ variant, className = '', children, ...props }) {
  const base = "px-4 py-2 rounded-xl font-medium";
  const style = variant === 'outline'
    ? "border border-gray-400 bg-white hover:bg-gray-100"
    : "bg-indigo-600 text-white hover:bg-indigo-700";
  return (
    <button className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
}
