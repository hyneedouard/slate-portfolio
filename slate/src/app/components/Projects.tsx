import { ArrowRight, X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useState } from 'react';
import { ProjectType } from '@/app/components/ProjectRouter';

interface ProjectsProps {
  onProjectClick: (projectId: ProjectType) => void;
}

export function Projects({ onProjectClick }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    {
      id: 'dashboard' as ProjectType,
      title: 'Dashboard Analytique',
      category: 'Application Web',
      description: 'Interface complète de visualisation de données pour une entreprise SaaS. Graphiques interactifs en temps réel, KPIs clés et exports de données.',
      image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2ODk5Nzk2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'TypeScript', 'Recharts'],
      result: 'Livré en 3 jours'
    },
    {
      id: 'ecommerce' as ProjectType,
      title: 'Site E-commerce',
      category: 'Développement Web',
      description: 'Interface complète de boutique en ligne avec catalogue produits filtrable, panier d\'achat interactif, et processus de commande fluide (frontend uniquement).',
      image: 'https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjkwNjkzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Tailwind', 'Frontend'],
      result: 'Interface complète en 5 jours'
    },
    {
      id: 'configurator' as ProjectType,
      title: 'Configurateur Produit',
      category: 'Outil Interactif',
      description: 'Outil de personnalisation en temps réel avec aperçu visuel instantané, calcul de prix dynamique et options multiples pour configurer des produits.',
      image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzY4OTg0MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Animations', 'UI/UX'],
      result: 'Prototype en 2 jours'
    },
    {
      id: 'landing' as ProjectType,
      title: 'Landing Page SaaS',
      category: 'Site Vitrine',
      description: 'Page de présentation complète pour une startup tech avec sections hero engageante, features détaillées, pricing comparatif et témoignages clients.',
      image: 'https://images.unsplash.com/photo-1560202582-a391c31ec300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjkwNDg5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Tailwind', 'Motion'],
      result: 'Livré en 24h'
    },
    {
      id: 'booking' as ProjectType,
      title: 'Application de Réservation',
      category: 'Application Web',
      description: 'Système complet de réservation en ligne avec calendrier interactif, sélection de créneaux horaires, formulaire multi-étapes et confirmation instantanée.',
      image: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY4OTk4NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Calendar', 'Forms'],
      result: 'MVP en 4 jours'
    },
    {
      id: 'calculator' as ProjectType,
      title: 'Calculateur de Prix',
      category: 'Outil Interactif',
      description: 'Outil de calcul de devis sophistiqué avec options multiples, calculs dynamiques en temps réel, récapitulatif détaillé et export possible.',
      image: 'https://images.unsplash.com/photo-1711344397160-b23d5deaa012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxjdWxhdG9yJTIwdG9vbCUyMGFwcHxlbnwxfHx8fDE3NjkwNzAzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['TypeScript', 'React', 'PDF'],
      result: 'Livré en 36h'
    }
  ];

  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 3);

  return (
    <section id="projets" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full mb-6">
            <span className="text-white text-xs font-medium tracking-wide">PORTFOLIO</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Mes dernières <br />
            créations
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Découvrez quelques-uns de mes projets qui ont aidé mes clients à atteindre leurs objectifs
          </p>
          <div className="max-w-2xl mx-auto p-6 bg-white backdrop-blur-sm border border-slate-200 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong className="text-slate-900">Note :</strong> Pour respecter la confidentialité de mes clients, 
              les liens ci-dessous ouvrent des versions démo interactives similaires aux projets réels. 
              Les sites clients restent privés.
            </p>
          </div>
        </div>

        {/* Grid Projects minimaliste */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project) => (
            <div 
              key={project.id}
              className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-all"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video bg-slate-100">
                <ImageWithFallback 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white text-slate-900 rounded-md text-xs font-semibold border border-slate-200">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-xs text-slate-600 font-medium">{project.result}</span>
                  <button 
                    onClick={() => onProjectClick(project.id)}
                    className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
                    aria-label={`Voir le projet ${project.title}`}
                    title="Voir la démo interactive"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {showAll ? (
            <button 
              className="px-6 py-3 bg-white border border-slate-300 text-slate-900 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all inline-flex items-center gap-2 font-semibold text-sm" 
              onClick={() => setShowAll(false)}
            >
              Afficher moins
              <X size={18} />
            </button>
          ) : (
            <button 
              className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all inline-flex items-center gap-2 font-semibold text-sm" 
              onClick={() => setShowAll(true)}
            >
              Voir tous les projets
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
