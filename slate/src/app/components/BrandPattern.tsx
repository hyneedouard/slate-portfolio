// Composant pour créer des patterns visuels de marque
export function BrandPattern() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

export function GradientBlob({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${className}`} />
  );
}
