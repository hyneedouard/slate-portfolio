import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/app/constants/branding';

export function Hero() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center px-6 pt-16 bg-white">
      <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
        {/* Badge minimaliste */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-8 border border-slate-200 animate-fade-in">
          <span className="text-sm text-slate-700 font-medium">
            Frontend Designer · React · UI/UX
          </span>
        </div>

        {/* Main Title - Minimaliste mais impactant */}
        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tighter animate-fade-in-up">
          {BRAND.fullTagline}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {BRAND.mission}
        </p>

        {/* CTA Buttons minimalistes */}
        <div className="flex flex-wrap gap-4 justify-center mb-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="#projets"
            onClick={(e) => handleCTAClick(e, '#projets')}
            className="group px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold text-base flex items-center gap-2"
          >
            Voir mes créations
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleCTAClick(e, '#contact')}
            className="px-8 py-4 bg-white text-slate-900 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all font-semibold text-base"
          >
            Me contacter
          </a>
        </div>

        {/* Values Grid - Minimaliste */}
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {BRAND.values.map((value, index) => (
            <div 
              key={index} 
              className="group text-center animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-5xl mb-4 text-slate-400 font-light group-hover:text-slate-600 transition-colors">{value.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-slate-600 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ligne décorative subtile */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </section>
  );
}