import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CreditCard, Check, AlertCircle } from 'lucide-react';

interface OrderFormProps {
  packageName: string;
  price: number;
  onClose: () => void;
  onLegalClick: (type: 'cgv' | 'privacy') => void;
}

type Step = 'info' | 'project' | 'payment' | 'success';

export function OrderForm({ packageName, price, onClose, onLegalClick }: OrderFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Étape 1 : Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    
    // Étape 2 : Détails du projet
    projectName: '',
    projectDescription: '',
    deadline: '',
    hasContent: 'no',
    hasLogo: 'no',
    inspiration: '',
    
    // Étape 3 : Paiement
    acceptCGV: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 'info') {
      if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
      if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
      if (!formData.email.trim()) {
        newErrors.email = 'Email requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    }

    if (step === 'project') {
      if (!formData.projectName.trim()) newErrors.projectName = 'Nom du projet requis';
      if (!formData.projectDescription.trim()) {
        newErrors.projectDescription = 'Description requise';
      } else if (formData.projectDescription.length < 20) {
        newErrors.projectDescription = 'Minimum 20 caractères';
      }
    }

    if (step === 'payment') {
      if (!formData.acceptCGV) newErrors.acceptCGV = 'Vous devez accepter les CGV';
      if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Vous devez accepter la politique de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 'info') setCurrentStep('project');
    else if (currentStep === 'project') setCurrentStep('payment');
    else if (currentStep === 'payment') {
      handlePayment();
    }
  };

  const handleBack = () => {
    if (currentStep === 'project') setCurrentStep('info');
    else if (currentStep === 'payment') setCurrentStep('project');
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName,
          price,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Erreur lors de la création de la session de paiement');
      }

      if (!data?.url) {
        throw new Error('URL de paiement Stripe manquante');
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error('Erreur paiement:', err);
      alert(err?.message || 'Erreur lors du paiement. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  const total = price;

  const steps = [
    { id: 'info', label: 'Vos informations' },
    { id: 'project', label: 'Votre projet' },
    { id: 'payment', label: 'Paiement' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-6">
      <div className="bg-white rounded-lg w-full max-w-4xl my-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {currentStep === 'success' ? 'Commande confirmée !' : `Commander ${packageName}`}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {currentStep === 'success' ? 'Nous allons vous contacter très bientôt' : `Total : ${total.toFixed(2)}€`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'success' && (
          <div className="px-6 py-6 border-b border-slate-200">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      steps.findIndex(s => s.id === currentStep) >= index
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className={`text-xs mt-2 font-medium ${
                      steps.findIndex(s => s.id === currentStep) >= index
                        ? 'text-slate-900'
                        : 'text-slate-500'
                    }`}>
                      {step.label}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-4 transition-all ${
                      steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-slate-900'
                        : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Personal Info */}
          {currentStep === 'info' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Vos coordonnées
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-900 font-semibold mb-2 text-sm">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none ${
                      errors.firstName ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="Jean"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-slate-900 font-semibold mb-2 text-sm">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none ${
                      errors.lastName ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="Dupont"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="jean.dupont@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="+33 6 12 34 56 78"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Entreprise (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  placeholder="Nom de votre entreprise"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 'project' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Détails de votre projet
              </h3>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Nom du projet *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleChange('projectName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none ${
                    errors.projectName ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Ex: Site vitrine pour mon restaurant"
                />
                {errors.projectName && <p className="mt-1 text-sm text-red-600">{errors.projectName}</p>}
              </div>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Description du projet * (minimum 20 caractères)
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleChange('projectDescription', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none ${
                    errors.projectDescription ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Décrivez votre projet, vos objectifs, votre cible, ce que vous attendez du site..."
                />
                {errors.projectDescription && <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>}
              </div>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Deadline souhaitée (optionnel)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-900 font-semibold mb-3 text-sm">
                    Avez-vous déjà du contenu (textes, photos) ?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="hasContent"
                        value="yes"
                        checked={formData.hasContent === 'yes'}
                        onChange={(e) => handleChange('hasContent', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-900">Oui, j'ai du contenu</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="hasContent"
                        value="no"
                        checked={formData.hasContent === 'no'}
                        onChange={(e) => handleChange('hasContent', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-900">Non, besoin d'aide</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 font-semibold mb-3 text-sm">
                    Avez-vous un logo ?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="hasLogo"
                        value="yes"
                        checked={formData.hasLogo === 'yes'}
                        onChange={(e) => handleChange('hasLogo', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-900">Oui, j'ai un logo</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="hasLogo"
                        value="no"
                        checked={formData.hasLogo === 'no'}
                        onChange={(e) => handleChange('hasLogo', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-900">Non, à créer</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-900 font-semibold mb-2 text-sm">
                  Sites d'inspiration (optionnel)
                </label>
                <textarea
                  value={formData.inspiration}
                  onChange={(e) => handleChange('inspiration', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                  placeholder="Listez quelques URLs de sites que vous aimez..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 'payment' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-slate-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Montant</span>
                  <span className="font-semibold text-slate-900">{total.toFixed(2)}€</span>
                </div>
                <div className="h-px bg-slate-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">{total.toFixed(2)}€</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Informations de paiement
              </h3>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Paiement sécurisé :</strong> En cliquant sur <strong>Payer</strong>, vous serez redirigé vers Stripe Checkout pour finaliser le paiement.
                </div>
              </div>

              {/* Consentements RGPD */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h4 className="font-bold text-slate-900">Consentements requis</h4>
                
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.acceptCGV}
                      onChange={(e) => handleChange('acceptCGV', e.target.checked)}
                      className={`mt-1 w-5 h-5 rounded border-2 ${
                        errors.acceptCGV ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      J'ai lu et j'accepte les{' '}
                      <button
                        type="button"
                        onClick={() => onLegalClick('cgv')}
                        className="text-slate-900 underline hover:text-slate-700 font-semibold"
                      >
                        Conditions Générales de Vente
                      </button>
                      {' '}*
                    </span>
                  </label>
                  {errors.acceptCGV && <p className="mt-1 text-sm text-red-600 ml-8">{errors.acceptCGV}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.acceptPrivacy}
                      onChange={(e) => handleChange('acceptPrivacy', e.target.checked)}
                      className={`mt-1 w-5 h-5 rounded border-2 ${
                        errors.acceptPrivacy ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      J'accepte que mes données personnelles soient collectées et traitées conformément à la{' '}
                      <button
                        type="button"
                        onClick={() => onLegalClick('privacy')}
                        className="text-slate-900 underline hover:text-slate-700 font-semibold"
                      >
                        Politique de confidentialité
                      </button>
                      {' '}*
                    </span>
                  </label>
                  {errors.acceptPrivacy && <p className="mt-1 text-sm text-red-600 ml-8">{errors.acceptPrivacy}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.acceptMarketing}
                      onChange={(e) => handleChange('acceptMarketing', e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-2 border-slate-300"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      J'accepte de recevoir des communications marketing (optionnel)
                    </span>
                  </label>
                </div>

                <p className="text-xs text-slate-500">
                  * Champs obligatoires. Vous pouvez à tout moment exercer vos droits d'accès, 
                  de rectification et de suppression de vos données en nous contactant.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 'success' && (
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Paiement confirmé !
              </h3>
              <p className="text-slate-600 text-lg mb-8">
                Votre commande <strong>{packageName}</strong> a été validée. 
                Vous allez recevoir un email de confirmation dans quelques instants.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-left mb-8">
                <h4 className="font-bold text-slate-900 mb-4">Prochaines étapes :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                    <span className="text-slate-700 text-sm">Vous recevrez un email avec les détails de votre commande</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                    <span className="text-slate-700 text-sm">Je vous contacterai sous 24h pour discuter des détails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                    <span className="text-slate-700 text-sm">Nous commencerons le projet dès validation du brief</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold"
              >
                Fermer
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {currentStep !== 'success' && (
          <div className="flex items-center justify-between p-6 border-t border-slate-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 'info'}
              className="px-6 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={18} />
              Retour
            </button>

            <button
              onClick={handleNext}
              disabled={isProcessing}
              className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Traitement...
                </>
              ) : currentStep === 'payment' ? (
                <>
                  <CreditCard size={18} />
                  Payer {total.toFixed(2)}€
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}