import { Logo } from '@/app/components/Logo';
import { BRAND } from '@/app/constants/branding';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

interface FooterProps {
  onLegalClick?: (page: 'privacy' | 'cgv' | 'mentions') => void;
}

export function Footer({ onLegalClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Accueil', href: '#accueil' },
      { label: 'À propos', href: '#a-propos' },
      { label: 'Services', href: '#services' },
      { label: 'Tarifs', href: '#tarifs' },
      { label: 'Projets', href: '#projets' },
      { label: 'Contact', href: '#contact' },
    ],
    social: [
      { icon: Mail, href: 'mailto:slate.dev@gmail.com', label: 'Email' },
    ],
    legal: [
      { label: 'Politique de confidentialité', action: 'privacy' },
      { label: 'CGV', action: 'cgv' },
      { label: 'Mentions légales', action: 'mentions' },
    ],
  };

  return (
    <footer className="bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="md" variant="default" />
            <p className="mt-6 text-slate-600 max-w-md leading-relaxed">
              {BRAND.mission}
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold text-sm"
              >
                Démarrer un projet
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900">Suivez-moi</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                    <social.icon size={16} className="text-slate-700 group-hover:text-white transition-colors" />
                  </div>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
              Légal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.action}>
                  <button
                    onClick={() => onLegalClick?.(link.action as 'privacy' | 'cgv' | 'mentions')}
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {currentYear} {BRAND.name}. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}