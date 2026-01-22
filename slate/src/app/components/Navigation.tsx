import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { useActiveSection } from '@/app/hooks/useActiveSection';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  // Fermer le menu mobile lors du scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 64; // hauteur de la nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#a-propos', label: 'À propos' },
    { href: '#services', label: 'Services' },
    { href: '#tarifs', label: 'Tarifs' },
    { href: '#projets', label: 'Projets' },
    { href: '#temoignages', label: 'Témoignages' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#accueil" onClick={(e) => handleClick(e, '#accueil')}>
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-slate-900"></span>
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-semibold"
            >
              Démarrer un projet
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900 p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-slate-700 hover:text-slate-900 transition-colors"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-4 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-center font-semibold"
              onClick={(e) => handleClick(e, '#contact')}
            >
              Démarrer un projet
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}