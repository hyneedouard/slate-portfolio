import { Code, Palette, Zap, Layout, Gauge, Puzzle, ArrowRight } from 'lucide-react';

export function Services() {
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

  const services = [
    {
      icon: Palette,
      title: 'UI/UX Design & Dev',
      description: 'Je transforme vos maquettes Figma en interfaces pixel-perfect avec React et Tailwind CSS.',
      features: [
        'Design systems complets',
        'Responsive multi-devices',
        'Animations micro-interactions',
        'Accessibilité intégrée'
      ],
      size: 'large'
    },
    {
      icon: Code,
      title: 'Développement React',
      description: 'Applications web modernes avec React et TypeScript.',
      features: [
        'Single Page Apps',
        'Composants réutilisables',
        'State management',
        'Code maintenable'
      ]
    },
    {
      icon: Layout,
      title: 'Sites & Landing Pages',
      description: 'Sites vitrines et pages qui convertissent.',
      features: [
        'Design moderne',
        'SEO-friendly',
        'Performance optimale',
        'CMS intégrable'
      ]
    },
    {
      icon: Gauge,
      title: 'Dashboards',
      description: 'Interfaces de visualisation de données.',
      features: [
        'Graphiques interactifs',
        'Real-time updates',
        'Filtres avancés',
        'Exports de données'
      ]
    },
    {
      icon: Puzzle,
      title: 'E-commerce Frontend',
      description: 'Interfaces de boutique optimisées.',
      features: [
        'Catalogues produits',
        'Panier interactif',
        'Checkout fluide',
        'Mobile-first'
      ]
    },
    {
      icon: Zap,
      title: 'Prototypes & MVP',
      description: 'Prototypes rapides pour tester vos idées.',
      features: [
        'Livraison 2-5 jours',
        'Itérations rapides',
        'Production-ready',
        'Design moderne'
      ]
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full mb-6">
            <span className="text-white text-xs font-medium tracking-wide">SERVICES</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Ce que je crée <br />
            pour vous
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Frontend uniquement · Pas de backend · Intégration avec vos APIs
          </p>
        </div>

        {/* Bento Grid Services minimaliste */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 transition-all ${
                service.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-800 transition-colors">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-900 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA vers Tarifs */}
        <div className="mt-16 text-center">
          <a
            href="#tarifs"
            onClick={(e) => handleCTAClick(e, '#tarifs')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold text-base"
          >
            Voir les tarifs
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}