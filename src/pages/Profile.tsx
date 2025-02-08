import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types/FormData';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BodyMeasurements from '../components/BodyMeasurements';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'sedentary',
    dietaryRestrictions: [],
    healthConditions: [],
    goals: [],
    medicalHistory: {
      diseases: [],
      allergies: [],
      medications: [],
      familyHistory: []
    },
    measurements: {
      chest: '',
      thigh: '',
      calf: '',
      abdomen: '',
      waist: '',
      hip: '',
      bodyFat: ''
    },
    mentalHealth: {
      stressLevel: '',
      sleepHours: '',
      sleepQuality: '',
      mood: ''
    },
    digestiveHealth: '',
    cardiovascularHealth: '',
    diet: {
      mealsPerDay: '',
      mealTimes: [],
      fastFoodFrequency: '',
      waterIntake: '',
      alcoholConsumption: ''
    },
    exercise: {
      currentActivities: [],
      frequency: '',
      duration: '',
      equipment: []
    },
    motivation: {
      mainGoal: '',
      motivationLevel: '',
      challenges: []
    },
    routine: {
      workSchedule: '',
      mealPrepTime: '',
      workType: 'mixed'
    },
    selectedBodyPart: null
  });

  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!formData.name || !formData.age || !formData.weight || !formData.height || !formData.gender) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Salvar no localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setShowSuccessModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) 
        ? [...(prev[field] as string[]), value]
        : [value]
    }));
  };

  const handleRemoveArrayItem = (field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as string[]).filter((_, i) => i !== index)
        : prev[field]
    }));
  };

  const handleMeasurementsChange = (measurements: FormData['measurements']) => {
    setFormData(prev => ({
      ...prev,
      measurements
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Perfil de Saúde</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Idade
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gênero
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </section>

          {/* Medidas Corporais */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Medidas Corporais</h2>
            <BodyMeasurements
              measurements={formData.measurements}
              onChange={handleMeasurementsChange}
              gender={formData.gender as 'male' | 'female'}
            />
          </section>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Salvar Perfil
            </button>
          </div>
        </form>

        {/* Modal de Sucesso */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
              <h3 className="text-lg font-medium mb-2">Perfil Salvo!</h3>
              <p className="text-gray-600 mb-4">
                Suas informações foram salvas com sucesso.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              className="absolute top-2 right-2"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}