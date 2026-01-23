import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingProps {
  onOrderClick: (packageType: string, price: number) => void;
}

export function Pricing({ onOrderClick }: PricingProps) {
  const packages = [
    {
      name: 'Starter',
      price: 1080,
      description: 'Parfait pour lancer votre présence en ligne rapidement',
      features: [
        'Landing page responsive (1 page)',
        'Design moderne et épuré',
        'Optimisé mobile & desktop',
        'Formulaire de contact',
        'Livraison 2-3 jours',
        '1 révision incluse',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 2520,
      description: 'Pour un site complet avec plusieurs pages',
      features: [
        'Site multi-pages (jusqu\'à 5 pages)',
        'Design sur-mesure',
        'Animations & interactions',
        'SEO de base inclus',
        'Livraison 4-7 jours',
        '3 révisions incluses',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: 4950,
      description: 'Application web complexe et personnalisée',
      features: [
        'Application web complète',
        'Fonctionnalités avancées',
        'Intégrations API',
        'Dashboard administrateur',
        'Livraison 10-15 jours',
        'Révisions illimitées',
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="tarifs" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full mb-6">
            <span className="text-white text-xs font-medium tracking-wide">TARIFS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Des offres adaptées <br />
            à vos besoins
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choisissez le package qui correspond à votre projet. Paiement sécurisé en ligne.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`relative bg-white rounded-lg border-2 transition-all hover:shadow-xl ${
                pkg.highlighted 
                  ? 'border-slate-900 shadow-lg scale-105' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Popular Badge */}
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full flex items-center gap-1.5 text-xs font-semibold">
                    <Sparkles size={14} />
                    Le plus populaire
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {pkg.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold text-slate-900">{pkg.price}€</span>
                        <span className="text-slate-600">HT</span>
                      </div>
                      <p className="text-slate-600 mt-4">{pkg.description}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOrderClick(pkg.name, pkg.price)}
                  className={`w-full px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mb-8 ${
                    pkg.highlighted
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Commander maintenant
                  <ArrowRight size={18} />
                </button>

                {/* Features */}
                <div className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} className="text-slate-900" />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl mb-2">💳</div>
            <div className="font-semibold text-slate-900 mb-1">Paiement sécurisé</div>
            <div className="text-sm text-slate-600">Carte bancaire</div>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold text-slate-900 mb-1">Démarrage rapide</div>
            <div className="text-sm text-slate-600">On commence dès réception du paiement</div>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-slate-900 mb-1">Satisfaction garantie</div>
            <div className="text-sm text-slate-600">Révisions jusqu'à votre entière satisfaction</div>
          </div>
        </div>

        {/* Custom Project CTA */}
        <div className="mt-16 text-center p-10 bg-slate-900 rounded-lg text-white">
          <h3 className="text-3xl font-bold mb-4">
            Projet sur-mesure ?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Vous avez un projet spécifique qui ne correspond à aucun package ? 
            Contactez-moi pour un devis personnalisé.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all font-semibold"
          >
            Demander un devis personnalisé
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}