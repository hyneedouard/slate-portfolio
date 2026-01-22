import { useState } from 'react';
import { ArrowLeft, Calculator, Download, RotateCcw } from 'lucide-react';

interface CalculatorProjectProps {
  onBack: () => void;
}

export function CalculatorProject({ onBack }: CalculatorProjectProps) {
  const [projectType, setProjectType] = useState('website');
  const [complexity, setComplexity] = useState('medium');
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('standard');
  const [support, setSupport] = useState('basic');

  const projectTypes = [
    { id: 'website', name: 'Site Web', basePrice: 1500 },
    { id: 'ecommerce', name: 'E-commerce', basePrice: 3500 },
    { id: 'webapp', name: 'Application Web', basePrice: 5000 },
    { id: 'mobile', name: 'Application Mobile', basePrice: 8000 },
  ];

  const complexityLevels = [
    { id: 'simple', name: 'Simple', multiplier: 0.7 },
    { id: 'medium', name: 'Moyen', multiplier: 1.0 },
    { id: 'complex', name: 'Complexe', multiplier: 1.5 },
  ];

  const availableFeatures = [
    { id: 'auth', name: 'Authentification utilisateurs', price: 800 },
    { id: 'payment', name: 'Paiement en ligne', price: 1200 },
    { id: 'dashboard', name: 'Dashboard admin', price: 1500 },
    { id: 'api', name: 'API REST', price: 1000 },
    { id: 'search', name: 'Recherche avancée', price: 600 },
    { id: 'chat', name: 'Chat en temps réel', price: 1800 },
    { id: 'analytics', name: 'Analytics', price: 700 },
    { id: 'notifications', name: 'Notifications push', price: 900 },
  ];

  const timelines = [
    { id: 'rush', name: 'Urgent (< 2 semaines)', multiplier: 1.5 },
    { id: 'standard', name: 'Standard (1-2 mois)', multiplier: 1.0 },
    { id: 'flexible', name: 'Flexible (> 2 mois)', multiplier: 0.9 },
  ];

  const supportOptions = [
    { id: 'none', name: 'Aucun', price: 0 },
    { id: 'basic', name: 'Basique (3 mois)', price: 500 },
    { id: 'premium', name: 'Premium (12 mois)', price: 2000 },
  ];

  const toggleFeature = (featureId: string) => {
    setFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateTotal = () => {
    const selectedProject = projectTypes.find(p => p.id === projectType)!;
    const selectedComplexity = complexityLevels.find(c => c.id === complexity)!;
    const selectedTimeline = timelines.find(t => t.id === timeline)!;
    const selectedSupport = supportOptions.find(s => s.id === support)!;

    let total = selectedProject.basePrice;
    total *= selectedComplexity.multiplier;
    total += pages * 200;
    
    const featuresTotal = features.reduce((sum, featureId) => {
      const feature = availableFeatures.find(f => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);
    total += featuresTotal;
    
    total *= selectedTimeline.multiplier;
    total += selectedSupport.price;

    return Math.round(total);
  };

  const total = calculateTotal();

  const resetCalculator = () => {
    setProjectType('website');
    setComplexity('medium');
    setPages(5);
    setFeatures([]);
    setTimeline('standard');
    setSupport('basic');
  };

  const downloadQuote = () => {
    alert('En production, cela générerait un PDF avec le devis détaillé.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Calculateur de Prix</h1>
              <p className="text-gray-600">Estimez le coût de votre projet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Type */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Type de projet</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {projectTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      projectType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-gray-900 mb-1">{type.name}</div>
                    <div className="text-sm text-gray-600">À partir de €{type.basePrice}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Niveau de complexité</h3>
              <div className="grid grid-cols-3 gap-4">
                {complexityLevels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setComplexity(level.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      complexity === level.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-gray-900">{level.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Nombre de pages ({pages})
              </h3>
              <input
                type="range"
                min="1"
                max="50"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 page</span>
                <span>50 pages</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                €200 par page supplémentaire
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Fonctionnalités additionnelles</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {availableFeatures.map(feature => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      features.includes(feature.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-600">+€{feature.price}</div>
                      </div>
                      {features.includes(feature.id) && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Délai de livraison</h3>
              <div className="space-y-3">
                {timelines.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      timeline === t.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{t.name}</span>
                      {t.multiplier !== 1.0 && (
                        <span className="text-sm text-gray-600">
                          {t.multiplier > 1 ? '+' : ''}{((t.multiplier - 1) * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Support & Maintenance</h3>
              <div className="space-y-3">
                {supportOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSupport(option.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      support === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{option.name}</span>
                      {option.price > 0 && (
                        <span className="text-sm text-gray-600">+€{option.price}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Récapitulatif</h3>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type de projet</span>
                  <span className="font-medium text-gray-900">
                    {projectTypes.find(p => p.id === projectType)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Complexité</span>
                  <span className="font-medium text-gray-900">
                    {complexityLevels.find(c => c.id === complexity)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-medium text-gray-900">{pages}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fonctionnalités</span>
                  <span className="font-medium text-gray-900">{features.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Délai</span>
                  <span className="font-medium text-gray-900">
                    {timelines.find(t => t.id === timeline)?.name.split('(')[0]}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Support</span>
                  <span className="font-medium text-gray-900">
                    {supportOptions.find(s => s.id === support)?.name}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-gray-600">Estimation totale</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">€{total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">HT</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={downloadQuote}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Télécharger le devis
                </button>
                <button 
                  onClick={resetCalculator}
                  className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  Réinitialiser
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-900">
                  💡 <strong>Note :</strong> Cette estimation est indicative. 
                  Un devis détaillé sera établi après analyse complète de vos besoins.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}