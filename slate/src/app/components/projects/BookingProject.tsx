import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, Check } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookingProjectProps {
  onBack: () => void;
}

export function BookingProject({ onBack }: BookingProjectProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
    setFormData({ name: '', email: '', phone: '', notes: '' });
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
              <h1 className="text-2xl font-bold text-gray-900">Système de Réservation</h1>
              <p className="text-gray-600">Réservez votre rendez-vous en quelques clics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Date' },
              { num: 2, label: 'Heure' },
              { num: 3, label: 'Informations' },
              { num: 4, label: 'Confirmation' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s.num 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > s.num ? <Check size={20} /> : s.num}
                  </div>
                  <span className={`ml-2 font-medium ${
                    step >= s.num ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    step > s.num ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="text-blue-600" />
              Choisissez une date
            </h2>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="text-center font-bold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map(day => {
                const isPast = day < new Date() && !isToday(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => !isPast && setSelectedDate(day)}
                    disabled={isPast}
                    className={`aspect-square rounded-lg p-2 transition-all ${
                      isPast
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-gray-50 text-gray-900 hover:bg-blue-50 hover:border-blue-300 border border-gray-200'
                    }`}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-900">
                  Date sélectionnée: {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-blue-600" />
              Choisissez un horaire
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-lg font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-900 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {selectedTime && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-900">
                  Créneau sélectionné: {selectedTime}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Information Form */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="text-blue-600" />
              Vos informations
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Notes (optionnel)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                  placeholder="Informations complémentaires..."
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Confirmer la réservation
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-600" size={40} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Réservation confirmée !
            </h2>
            <p className="text-gray-600 mb-8">
              Votre rendez-vous a été enregistré avec succès. Un email de confirmation vous a été envoyé.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-bold text-gray-900 mb-4">Récapitulatif</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-600" size={20} />
                  <span>{selectedDate && format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" size={20} />
                  <span>{selectedTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" size={20} />
                  <span>{formData.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" size={20} />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600" size={20} />
                  <span>{formData.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Nouvelle réservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}