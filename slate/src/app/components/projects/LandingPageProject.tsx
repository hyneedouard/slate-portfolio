import { ArrowLeft, Check, Zap, Shield, BarChart, Users, Star, ArrowRight } from 'lucide-react';

interface LandingPageProjectProps {
  onBack: () => void;
}

export function LandingPageProject({ onBack }: LandingPageProjectProps) {
  const features = [
    {
      icon: Zap,
      title: 'Ultra Rapide',
      description: 'Performance optimale pour une expérience utilisateur fluide'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Chiffrement de bout en bout et protection des données'
    },
    {
      icon: BarChart,
      title: 'Analytics Avancés',
      description: 'Tableaux de bord et statistiques en temps réel'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travaillez en équipe de manière efficace'
    },
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '29',
      description: 'Parfait pour débuter',
      features: [
        '5 projets',
        '10 utilisateurs',
        'Support email',
        '10 GB stockage',
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      price: '79',
      description: 'Pour les équipes en croissance',
      features: [
        'Projets illimités',
        '50 utilisateurs',
        'Support prioritaire',
        '100 GB stockage',
        'Intégrations avancées',
        'Analytics premium',
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'Pour les grandes organisations',
      features: [
        'Tout illimité',
        'Utilisateurs illimités',
        'Support 24/7',
        'Stockage illimité',
        'Toutes les intégrations',
        'Account manager dédié',
        'SLA garanti',
      ],
      highlighted: false
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      content: 'Cette solution a transformé notre façon de travailler. Productivité en hausse de 40% !',
      rating: 5
    },
    {
      name: 'Marc Lefebvre',
      role: 'CTO, StartupX',
      content: 'Interface intuitive et fonctionnalités puissantes. Exactement ce dont nous avions besoin.',
      rating: 5
    },
    {
      name: 'Emma Martin',
      role: 'Product Manager, InnovateCo',
      content: 'Le meilleur outil que nous ayons testé. L\'équipe support est exceptionnelle.',
      rating: 5
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SaaSify
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-6 text-sm font-bold">
              🎉 Nouveau : Version 2.0 disponible
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Révolutionnez votre
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> workflow </span>
              en équipe
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              La plateforme tout-en-un pour gérer vos projets, collaborer avec votre équipe 
              et atteindre vos objectifs plus rapidement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg flex items-center gap-2">
                Essai gratuit 14 jours
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-bold text-lg">
                Voir la démo
              </button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={20} />
                Aucune carte requise
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={20} />
                Annulation à tout moment
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={20} />
                Support 24/7
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Entreprises qui nous font confiance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Note moyenne des utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime garanti</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités puissantes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour réussir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs transparents
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 ${
                  plan.highlighted 
                    ? 'ring-2 ring-blue-600 shadow-2xl scale-105' 
                    : 'shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-center mb-4">
                    <span className="px-4 py-1 bg-blue-600 text-white text-sm rounded-full">
                      Le plus populaire
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-gray-900">€{plan.price}</span>
                    <span className="text-gray-600">/mois</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Commencer maintenant
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez ce que nos clients disent de nous
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à transformer votre workflow ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers d'équipes qui ont déjà fait le choix de SaaSify
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg">
            Commencer gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SaaSify
          </div>
          <p className="text-gray-400">
            © 2026 SaaSify. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}