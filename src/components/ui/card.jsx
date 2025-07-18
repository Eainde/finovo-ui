export function Card({ className = '', children }) {
  return <div className={`rounded-2xl shadow-md bg-white p-4 ${className}`}>{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
