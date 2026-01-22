import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Marie Laurent',
      role: 'CEO, TechStart',
      content: 'Interface livrée en 3 jours, exactement ce que nous recherchions. Réactivité exceptionnelle et rendu pixel-perfect.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Thomas Dubois',
      role: 'Product Manager, DataCorp',
      content: 'Le dashboard que nous utilisions était développé rapidement avec une excellente maîtrise technique. Code propre et bien structuré.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Sophie Martin',
      role: 'Founder, ShopOnline',
      content: 'Notre site e-commerce a été transformé. L\'interface est moderne, fluide et nos conversions ont augmenté.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  ];

  return (
    <section id="temoignages" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full mb-6">
            <span className="text-white text-xs font-medium tracking-wide">TÉMOIGNAGES</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Ils m'ont fait <br />
            confiance
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Retours de clients satisfaits par mon travail
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg border border-slate-200 hover:border-slate-300 transition-all"
            >
              {/* Quote Icon subtil */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-slate-300" />
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-slate-900 text-slate-900" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Avatar & Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
