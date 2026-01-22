import { BRAND } from '@/app/constants/branding';

export function About() {
  const stats = [
    { value: '50+', label: 'Projets livrés' },
    { value: '3j', label: 'Délai moyen' },
    { value: '100%', label: 'Satisfaction' },
    { value: '5ans', label: 'Expérience' },
  ];

  const techStack = [
    { 
      category: 'Frontend', 
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    },
    { 
      category: 'Design', 
      items: ['Figma', 'Framer', 'Adobe XD', 'Principle']
    },
    { 
      category: 'Animation', 
      items: ['Motion', 'GSAP', 'Lottie', 'Three.js']
    },
  ];

  return (
    <section id="a-propos" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full mb-6">
            <span className="text-white text-xs font-medium tracking-wide">À PROPOS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Designer d'interfaces <br />
            passionné par l'UX
          </h2>
        </div>

        {/* Bento Grid Content sobre */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Large card */}
          <div className="bg-white p-10 rounded-lg border border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              Mon approche
            </h3>
            <p className="text-slate-700 leading-relaxed mb-4 text-base">
              Je me spécialise dans la création d'interfaces web avec <strong className="text-slate-900">React et TypeScript</strong>. 
              Que vous ayez besoin d'un site vitrine, d'une interface e-commerce, d'un dashboard ou d'un outil métier, 
              je conçois des expériences épurées et efficaces.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              <strong className="text-slate-900">Important :</strong> Je développe uniquement le frontend. 
              Si vous avez besoin d'un backend (serveur, base de données), vous devrez le fournir ou 
              faire appel à un développeur backend.
            </p>

            <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-700 leading-relaxed text-sm">
                <strong className="text-slate-900">Idéal pour :</strong> prototypes, MVP frontend, sites vitrines, 
                interfaces d'applications, dashboards, intégration avec vos APIs
              </p>
            </div>
          </div>

          {/* Stack grid */}
          <div className="space-y-6">
            {techStack.map((stack, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-slate-900">
                    {stack.category}
                  </h4>
                  <div className="px-3 py-1 bg-slate-900 rounded-full">
                    <span className="text-white text-xs font-semibold">Expert</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md text-sm font-medium border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}