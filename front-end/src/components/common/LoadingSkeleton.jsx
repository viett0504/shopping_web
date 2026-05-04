export default function LoadingSkeleton({ className = 'h-4 w-full' }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}
