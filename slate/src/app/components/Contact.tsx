import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    // Simulation d'envoi (remplacer par votre vraie logique d'envoi)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ici vous pouvez ajouter l'appel à votre API
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full mb-6">
            <span className="text-white text-xs font-medium tracking-wide">CONTACT</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Démarrons votre <br />
            projet ensemble
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une idée en tête ? Discutons-en et transformons-la en réalité
          </p>
        </div>

        {/* Bento Grid Contact minimaliste */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Informations de contact */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              Coordonnées
            </h3>
            <p className="text-slate-600 mb-8">
              N'hésitez pas à me contacter par le moyen qui vous convient le mieux. 
              Je réponds généralement dans les 24 heures.
            </p>

            <div className="space-y-4">
              <a 
                href="mailto:slate.dev@gmail.com"
                className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-800 transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Email</div>
                  <span className="text-slate-600 hover:text-slate-900 transition-colors">
                    slate.dev@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-slate-200">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Zone de couverture</div>
                  <div className="text-slate-600">Luxembourg, Belgique, France</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white p-10 rounded-lg border border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              Envoyez un message
            </h3>
            
            {/* Success Message */}
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900 text-sm">Message envoyé !</div>
                  <div className="text-green-700 text-sm">Je vous répondrai dans les plus brefs délais.</div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-900 text-sm">Erreur d'envoi</div>
                  <div className="text-red-700 text-sm">Une erreur est survenue. Veuillez réessayer.</div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-900 font-semibold mb-2 text-sm">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Jean Dupont"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-900 font-semibold mb-2 text-sm">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="jean.dupont@entreprise.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-900 font-semibold mb-2 text-sm">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-900 font-semibold mb-2 text-sm">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none text-slate-900 placeholder-slate-500 transition-all ${
                    errors.message ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Parlez-moi de votre projet..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}