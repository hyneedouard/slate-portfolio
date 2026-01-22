import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Ici vous pourriez activer Google Analytics, etc.
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white border-t border-slate-200 shadow-2xl animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                🍪 Respect de votre vie privée
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ce site utilise des cookies essentiels pour son fonctionnement. Nous ne collectons aucune donnée 
                personnelle sans votre consentement. En continuant à utiliser ce site, vous acceptez notre{' '}
                <a href="#politique-confidentialite" className="text-slate-900 underline hover:text-slate-700">
                  politique de confidentialité
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-semibold text-sm"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold text-sm"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
