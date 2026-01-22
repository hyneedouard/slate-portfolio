import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface ConfiguratorProjectProps {
  onBack: () => void;
}

export function ConfiguratorProject({ onBack }: ConfiguratorProjectProps) {
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedMaterial, setSelectedMaterial] = useState('cotton');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { id: 'blue', name: 'Bleu', hex: '#3B82F6' },
    { id: 'red', name: 'Rouge', hex: '#EF4444' },
    { id: 'green', name: 'Vert', hex: '#10B981' },
    { id: 'black', name: 'Noir', hex: '#1F2937' },
    { id: 'white', name: 'Blanc', hex: '#F3F4F6' },
  ];

  const sizes = [
    { id: 'small', name: 'S', price: 0 },
    { id: 'medium', name: 'M', price: 5 },
    { id: 'large', name: 'L', price: 10 },
    { id: 'xlarge', name: 'XL', price: 15 },
  ];

  const materials = [
    { id: 'cotton', name: 'Coton', price: 0, description: 'Confortable et respirant' },
    { id: 'polyester', name: 'Polyester', price: 10, description: 'Résistant et facile d\'entretien' },
    { id: 'premium', name: 'Premium', price: 25, description: 'Mélange haut de gamme' },
  ];

  const basePrice = 49.99;
  const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
  const materialPrice = materials.find(m => m.id === selectedMaterial)?.price || 0;
  const totalPrice = (basePrice + sizePrice + materialPrice) * quantity;

  const selectedColorData = colors.find(c => c.id === selectedColor);

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
              <h1 className="text-2xl font-bold text-gray-900">Configurateur de Produit</h1>
              <p className="text-gray-600">Personnalisez votre T-shirt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-12 flex items-center justify-center sticky top-8 h-fit">
            <div className="text-center">
              <div 
                className="w-80 h-80 rounded-2xl shadow-2xl mx-auto mb-8 flex items-center justify-center transition-all duration-500"
                style={{ backgroundColor: selectedColorData?.hex }}
              >
                <div className="text-white text-6xl font-bold opacity-30">
                  {sizes.find(s => s.id === selectedSize)?.name}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Aperçu en temps réel</div>
                <div className="text-lg font-bold text-gray-900">
                  {selectedColorData?.name} · {sizes.find(s => s.id === selectedSize)?.name} · {materials.find(m => m.id === selectedMaterial)?.name}
                </div>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-8">
            {/* Color Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choisissez une couleur</h3>
              <div className="grid grid-cols-5 gap-4">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`relative h-16 rounded-lg border-2 transition-all ${
                      selectedColor === color.id ? 'border-blue-600 scale-110' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <Check size={20} className="text-blue-600" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-center text-gray-600">
                {selectedColorData?.name}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choisissez une taille</h3>
              <div className="grid grid-cols-4 gap-4">
                {sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedSize === size.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">{size.name}</div>
                    {size.price > 0 && (
                      <div className="text-sm text-gray-600">+€{size.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choisissez un matériau</h3>
              <div className="space-y-3">
                {materials.map(material => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedMaterial === material.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{material.name}</span>
                      {material.price > 0 && (
                        <span className="text-sm text-gray-600">+€{material.price}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{material.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quantité</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center text-2xl font-bold border-2 border-gray-200 rounded-lg py-2"
                  />
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Summary & CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm opacity-90 mb-1">Prix total</div>
                  <div className="text-4xl font-bold">€{totalPrice.toFixed(2)}</div>
                </div>
                <div className="text-right text-sm opacity-90">
                  <div>Prix de base: €{basePrice}</div>
                  {sizePrice > 0 && <div>Taille: +€{sizePrice}</div>}
                  {materialPrice > 0 && <div>Matériau: +€{materialPrice}</div>}
                  {quantity > 1 && <div>Quantité: ×{quantity}</div>}
                </div>
              </div>
              <button className="w-full py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Ajouter au panier
              </button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🚚</div>
                <div className="font-bold text-sm">Livraison gratuite</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">↩️</div>
                <div className="font-bold text-sm">Retours 30 jours</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-bold text-sm">Qualité garantie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}