import { BRAND } from '@/app/constants/branding';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'dark';
}

export function Logo({ size = 'md', variant = 'default' }: LogoProps) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Logo minimaliste - Rectangle avec lignes */}
      <div className={`${sizes[size]} relative flex items-center justify-center`}>
        <div className="absolute inset-0 bg-slate-900 rounded-sm"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-1.5 gap-0.5">
          <div className="h-px bg-white opacity-90"></div>
          <div className="h-px bg-white opacity-60"></div>
          <div className="h-px bg-white opacity-30"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-bold text-slate-900 tracking-tight`}>
          {BRAND.name}
        </span>
        {size !== 'sm' && (
          <span className="text-xs text-slate-600 font-normal">
            {BRAND.tagline}
          </span>
        )}
      </div>
    </div>
  );
}
