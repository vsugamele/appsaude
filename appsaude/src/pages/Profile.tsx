import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, UserCircleIcon, PhotoIcon, InformationCircleIcon, ScaleIcon } from '@heroicons/react/24/outline'
import BodyMeasurements from '../components/BodyMeasurements';
import BodySelector from '../components/BodySelector';
import Modal from '../components/Modal';

interface FormData {
  name: string
  age: string
  weight: string
  height: string
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'
  selectedGoals?: string[]
  selectedRestrictions?: string[]
  medicalHistory: {
    diseases: string[]
    allergies: string[]
    medications: { name: string; dosage: string }[]
    familyHistory: string[]
  }
  measurements: {
    chest: string;
    thigh: string;
    calf: string;
    abdomen: string;
    waist: string;
    hip: string;
    bodyFat: string;
  }
  mentalHealth: {
    stressLevel: string
    sleepHours: string
    sleepQuality: string
  }
  digestiveHealth: string
  cardiovascularHealth: string
  diet: {
    mealsPerDay: string
    mealTimes: string[]
    fastFoodFrequency: string
    waterIntake: string
    alcoholConsumption: string
  }
  exercise: {
    currentActivities: string[]
    frequency: string
    duration: string
    equipment: string[]
  }
  motivation: {
    mainGoal: string
    motivationLevel: string
    challenges: string[]
  }
  routine: {
    workSchedule: string
    mealPrepTime: string
    workType: 'seated' | 'standing' | 'mixed'
  }
  selectedBodyPart: string | null;
}

interface HealthGoal {
  id: string
  name: string
  description: string
}

interface DietaryRestriction {
  id: string
  name: string
  description: string
}

const calculateBMI = (weight: string, height: string): number | null => {
  const weightNum = parseFloat(weight)
  const heightNum = parseFloat(height)

  if (!weightNum || !heightNum) return null

  // Altura precisa estar em metros para o cálculo
  const heightInMeters = heightNum / 100
  return Number((weightNum / (heightInMeters * heightInMeters)).toFixed(1))
}

const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Abaixo do peso'
  if (bmi < 25) return 'Peso normal'
  if (bmi < 30) return 'Sobrepeso'
  if (bmi < 35) return 'Obesidade grau I'
  if (bmi < 40) return 'Obesidade grau II'
  return 'Obesidade grau III'
}

const getBMIColor = (bmi: number): string => {
  if (bmi < 18.5) return 'text-yellow-600'
  if (bmi < 25) return 'text-green-600'
  if (bmi < 30) return 'text-yellow-600'
  return 'text-red-600'
}

const commonDiseases = [
  { id: 'diabetes', name: 'Diabetes' },
  { id: 'hypertension', name: 'Hipertensão' },
  { id: 'cholesterol', name: 'Colesterol Alto' },
  { id: 'obesity', name: 'Obesidade' },
  { id: 'thyroid', name: 'Problemas de Tireoide' },
  { id: 'celiac', name: 'Doença Celíaca' },
  { id: 'gastritis', name: 'Gastrite' },
  { id: 'arthritis', name: 'Artrite' }
];

const commonAllergies = [
  { id: 'gluten', name: 'Glúten' },
  { id: 'lactose', name: 'Lactose' },
  { id: 'nuts', name: 'Nozes e Amendoim' },
  { id: 'seafood', name: 'Frutos do Mar' },
  { id: 'eggs', name: 'Ovos' },
  { id: 'soy', name: 'Soja' },
  { id: 'corn', name: 'Milho' }
];

const commonMedications = [
  { id: 'insulin', name: 'Insulina' },
  { id: 'antihypertensive', name: 'Anti-hipertensivos' },
  { id: 'statins', name: 'Estatinas (Colesterol)' },
  { id: 'thyroid-med', name: 'Medicação para Tireoide' },
  { id: 'antacids', name: 'Antiácidos' },
  { id: 'supplements', name: 'Suplementos Vitamínicos' }
];

const commonFamilyHistory = [
  { id: 'diabetes-family', name: 'Diabetes na Família' },
  { id: 'hypertension-family', name: 'Hipertensão na Família' },
  { id: 'heart-disease', name: 'Doenças Cardíacas' },
  { id: 'cancer', name: 'Câncer' },
  { id: 'obesity-family', name: 'Obesidade na Família' },
  { id: 'thyroid-family', name: 'Problemas de Tireoide na Família' }
];

export default function Profile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('userProfile')
    return savedData ? JSON.parse(savedData) : {
      name: '',
      age: '',
      weight: '',
      height: '',
      gender: 'male',
      activityLevel: 'moderate',
      selectedGoals: [],
      selectedRestrictions: [],
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
        stressLevel: 'moderate',
        sleepHours: '',
        sleepQuality: 'good'
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
        motivationLevel: '5',
        challenges: []
      },
      routine: {
        workSchedule: '',
        mealPrepTime: '',
        workType: 'mixed'
      },
      selectedBodyPart: null
    }
  })

  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    diseases: false,
    allergies: false,
    medications: false,
    familyHistory: false
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePhotoUpload = (type: 'front' | 'side', file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('O arquivo é muito grande. O tamanho máximo permitido é 5MB.')
      return
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Formato de arquivo inválido. Apenas JPG e PNG são aceitos.')
      return
    }

    setFormData(prev => ({
      ...prev,
      [type === 'front' ? 'frontPhoto' : 'sidePhoto']: file
    }))
  }

  const healthGoals: HealthGoal[] = [
    { id: 'weight-loss', name: 'Perda de peso', description: 'Redução saudável de peso corporal' },
    { id: 'muscle-gain', name: 'Ganho muscular', description: 'Aumento de massa muscular' },
    { id: 'maintenance', name: 'Manutenção', description: 'Manter peso e composição atual' },
    { id: 'health', name: 'Saúde geral', description: 'Melhorar saúde e bem-estar' }
  ]

  const dietaryRestrictions: DietaryRestriction[] = [
    { id: 'vegetarian', name: 'Vegetariano', description: 'Sem carnes' },
    { id: 'vegan', name: 'Vegano', description: 'Sem produtos animais' },
    { id: 'gluten-free', name: 'Sem Glúten', description: 'Sem proteínas do trigo' },
    { id: 'lactose-free', name: 'Sem Lactose', description: 'Sem derivados de leite' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Salvar no localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData))
    navigate('/home')
  }

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goalId)
        ? prev.selectedGoals.filter(id => id !== goalId)
        : [...prev.selectedGoals, goalId]
    }))
  }

  const toggleRestriction = (restrictionId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRestrictions: prev.selectedRestrictions.includes(restrictionId)
        ? prev.selectedRestrictions.filter(id => id !== restrictionId)
        : [...prev.selectedRestrictions, restrictionId]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold ml-4">Perfil de Saúde</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8 px-4">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-center mb-6">
              <UserCircleIcon className="h-24 w-24 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Idade</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gênero</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={e => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={e => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nível de Atividade</label>
                  <select
                    value={formData.activityLevel}
                    onChange={e => setFormData(prev => ({ ...prev, activityLevel: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="sedentary">Sedentário</option>
                    <option value="light">Leve</option>
                    <option value="moderate">Moderado</option>
                    <option value="active">Ativo</option>
                    <option value="veryActive">Muito Ativo</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* IMC */}
            {formData.weight && formData.height && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ScaleIcon className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-medium text-gray-900">Índice de Massa Corporal (IMC)</h3>
                </div>
                {(() => {
                  const bmi = calculateBMI(formData.weight, formData.height)
                  if (!bmi) return null
                  
                  return (
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold ${getBMIColor(bmi)}`}>{bmi}</span>
                        <span className="text-gray-500">kg/m²</span>
                      </div>
                      <p className={`font-medium ${getBMIColor(bmi)}`}>
                        {getBMICategory(bmi)}
                      </p>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Histórico Médico */}
          <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Histórico Médico</h2>
            
            {/* Doenças Pré-existentes */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Doenças Pré-existentes
              </label>
              <select
                className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 mb-2"
                value=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !formData.medicalHistory.diseases.includes(value)) {
                    setFormData({
                      ...formData,
                      medicalHistory: {
                        ...formData.medicalHistory,
                        diseases: [...formData.medicalHistory.diseases, value]
                      }
                    });
                  }
                }}
              >
                <option value="">Selecione uma doença...</option>
                {commonDiseases
                  .filter(disease => !formData.medicalHistory.diseases.includes(disease.name))
                  .map(disease => (
                    <option key={disease.id} value={disease.name}>
                      {disease.name}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.diseases.map(disease => (
                  <span key={disease} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {disease}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          medicalHistory: {
                            ...formData.medicalHistory,
                            diseases: formData.medicalHistory.diseases.filter(d => d !== disease)
                          }
                        });
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Alergias e Intolerâncias */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Alergias e Intolerâncias
              </label>
              <select
                className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 mb-2"
                value=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !formData.medicalHistory.allergies.includes(value)) {
                    setFormData({
                      ...formData,
                      medicalHistory: {
                        ...formData.medicalHistory,
                        allergies: [...formData.medicalHistory.allergies, value]
                      }
                    });
                  }
                }}
              >
                <option value="">Selecione uma alergia...</option>
                {commonAllergies
                  .filter(allergy => !formData.medicalHistory.allergies.includes(allergy.name))
                  .map(allergy => (
                    <option key={allergy.id} value={allergy.name}>
                      {allergy.name}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.allergies.map(allergy => (
                  <span key={allergy} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {allergy}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          medicalHistory: {
                            ...formData.medicalHistory,
                            allergies: formData.medicalHistory.allergies.filter(a => a !== allergy)
                          }
                        });
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Medicamentos em Uso */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Medicamentos em Uso
              </label>
              <div className="flex gap-2 mb-2">
                <select
                  className="flex-1 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && !formData.medicalHistory.medications.some(m => m.name === value)) {
                      setFormData({
                        ...formData,
                        medicalHistory: {
                          ...formData.medicalHistory,
                          medications: [...formData.medicalHistory.medications, { name: value, dosage: '' }]
                        }
                      });
                    }
                  }}
                >
                  <option value="">Selecione um medicamento...</option>
                  {commonMedications
                    .filter(med => !formData.medicalHistory.medications.some(m => m.name === med.name))
                    .map(medication => (
                      <option key={medication.id} value={medication.name}>
                        {medication.name}
                      </option>
                    ))}
                </select>
                <input
                  type="text"
                  placeholder="Dosagem"
                  className="w-32 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.medications.map(medication => (
                  <span key={medication.name} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {medication.name} - {medication.dosage}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          medicalHistory: {
                            ...formData.medicalHistory,
                            medications: formData.medicalHistory.medications.filter(m => m.name !== medication.name)
                          }
                        });
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Histórico Familiar */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Histórico Familiar
              </label>
              <select
                className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 mb-2"
                value=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !formData.medicalHistory.familyHistory.includes(value)) {
                    setFormData({
                      ...formData,
                      medicalHistory: {
                        ...formData.medicalHistory,
                        familyHistory: [...formData.medicalHistory.familyHistory, value]
                      }
                    });
                  }
                }}
              >
                <option value="">Selecione uma condição familiar...</option>
                {commonFamilyHistory
                  .filter(condition => !formData.medicalHistory.familyHistory.includes(condition.name))
                  .map(condition => (
                    <option key={condition.id} value={condition.name}>
                      {condition.name}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.familyHistory.map(condition => (
                  <span key={condition} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {condition}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          medicalHistory: {
                            ...formData.medicalHistory,
                            familyHistory: formData.medicalHistory.familyHistory.filter(h => h !== condition)
                          }
                        });
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Avaliação Física */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Avaliação Física</h2>
            
            {/* Layout responsivo - empilha em mobile, grid em desktop */}
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
              {/* Coluna da esquerda - Seletor visual do corpo */}
              <div className="mb-6 md:mb-0">
                <div className="max-w-[280px] mx-auto">
                  <BodySelector
                    selectedPart={formData.selectedBodyPart}
                    onPartClick={(partId) => {
                      if (partId === 'next') {
                        // Lógica para próxima etapa
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          selectedBodyPart: partId
                        }));
                        setIsModalOpen(true);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Coluna da direita - Visualização das medidas */}
              <div>
                <BodyMeasurements 
                  measurements={formData.measurements} 
                  gender={formData.gender}
                />
              </div>
            </div>

            {/* Botão Próximo - fixo na parte inferior em mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:relative md:p-0 md:bg-transparent md:border-0 md:mt-6">
              <button
                onClick={() => {
                  // Lógica para próxima etapa
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Próximo
              </button>
            </div>

            {/* Modal para entrada de medidas */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={
                formData.selectedBodyPart === 'chest' ? 'Medidas do Tórax' :
                formData.selectedBodyPart === 'arm' ? 'Medidas do Braço' :
                formData.selectedBodyPart === 'abdomen' ? 'Medidas Abdominais' :
                formData.selectedBodyPart === 'leg' ? 'Medidas das Pernas' :
                formData.selectedBodyPart === 'all' ? 'Composição Corporal' :
                'Medidas'
              }
            >
              <div className="space-y-4">
                {formData.selectedBodyPart === 'chest' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Circunferência Torácica (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.measurements.chest}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        measurements: {
                          ...prev.measurements,
                          chest: e.target.value
                        }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                )}

                {formData.selectedBodyPart === 'arm' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Circunferência do Braço (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.measurements.arm}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        measurements: {
                          ...prev.measurements,
                          arm: e.target.value
                        }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                )}

                {formData.selectedBodyPart === 'abdomen' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circunferência Abdominal (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.measurements.abdomen}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          measurements: {
                            ...prev.measurements,
                            abdomen: e.target.value
                          }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circunferência da Cintura (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.measurements.waist}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          measurements: {
                            ...prev.measurements,
                            waist: e.target.value
                          }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circunferência do Quadril (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.measurements.hip}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          measurements: {
                            ...prev.measurements,
                            hip: e.target.value
                          }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                  </>
                )}

                {formData.selectedBodyPart === 'leg' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circunferência da Coxa (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.measurements.thigh}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          measurements: {
                            ...prev.measurements,
                            thigh: e.target.value
                          }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circunferência da Panturrilha (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.measurements.calf}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          measurements: {
                            ...prev.measurements,
                            calf: e.target.value
                          }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                  </>
                )}

                {formData.selectedBodyPart === 'all' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentual de Gordura (%)
                    </label>
                    <input
                      type="number"
                      value={formData.measurements.bodyFat}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        measurements: {
                          ...prev.measurements,
                          bodyFat: e.target.value
                        }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                )}
              </div>
            </Modal>
          </div>

          {/* Bem-estar Mental */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Bem-estar Mental</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nível de Estresse</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    mentalHealth: { ...prev.mentalHealth, stressLevel: e.target.value }
                  }))}
                >
                  <option value="low">Baixo</option>
                  <option value="moderate">Moderado</option>
                  <option value="high">Alto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Horas de Sono por Noite</label>
                <input
                  type="number"
                  step="0.5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    mentalHealth: { ...prev.mentalHealth, sleepHours: e.target.value }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Qualidade do Sono</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    mentalHealth: { ...prev.mentalHealth, sleepQuality: e.target.value }
                  }))}
                >
                  <option value="poor">Ruim</option>
                  <option value="fair">Regular</option>
                  <option value="good">Boa</option>
                  <option value="excellent">Excelente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Saúde Específica */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Saúde Específica</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Problemas Digestivos</label>
                <textarea
                  placeholder="Descreva qualquer problema digestivo que possui"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    digestiveHealth: e.target.value
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Condições Cardiovasculares/Respiratórias</label>
                <textarea
                  placeholder="Descreva condições cardiovasculares ou respiratórias existentes"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    cardiovascularHealth: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Hábitos Alimentares */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Hábitos Alimentares</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Refeições Diárias</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    diet: { ...prev.diet, mealsPerDay: e.target.value }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Horários das Refeições</label>
                <textarea
                  placeholder="Liste os horários habituais de suas refeições"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    diet: { ...prev.diet, mealTimes: e.target.value.split('\n') }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Consumo de Fast Food/Ultraprocessados</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    diet: { ...prev.diet, fastFoodFrequency: e.target.value }
                  }))}
                >
                  <option value="never">Nunca</option>
                  <option value="rarely">Raramente (1x por mês)</option>
                  <option value="sometimes">Às vezes (1x por semana)</option>
                  <option value="often">Frequentemente (2-3x por semana)</option>
                  <option value="daily">Diariamente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Consumo de Água (L/dia)</label>
                <input
                  type="number"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    diet: { ...prev.diet, waterIntake: e.target.value }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Consumo de Álcool</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    diet: { ...prev.diet, alcoholConsumption: e.target.value }
                  }))}
                >
                  <option value="none">Não consome</option>
                  <option value="rarely">Raramente</option>
                  <option value="socially">Socialmente</option>
                  <option value="weekly">Semanalmente</option>
                  <option value="daily">Diariamente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Atividade Física */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Atividade Física</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Atividades Físicas Atuais</label>
                <textarea
                  placeholder="Descreva suas atividades físicas atuais"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    exercise: { ...prev.exercise, currentActivities: e.target.value.split('\n') }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Frequência Semanal</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    exercise: { ...prev.exercise, frequency: e.target.value }
                  }))}
                >
                  <option value="none">Não pratica</option>
                  <option value="1-2">1-2 vezes por semana</option>
                  <option value="3-4">3-4 vezes por semana</option>
                  <option value="5+">5 ou mais vezes por semana</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duração Média (minutos)</label>
                <input
                  type="number"
                  step="15"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    exercise: { ...prev.exercise, duration: e.target.value }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Equipamentos/Esportes</label>
                <textarea
                  placeholder="Liste equipamentos ou esportes específicos que pratica"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    exercise: { ...prev.exercise, equipment: e.target.value.split('\n') }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Objetivos e Motivação */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Objetivos e Motivação</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Principal Objetivo</label>
                <textarea
                  placeholder="Qual seu principal objetivo com a mudança alimentar?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    motivation: { ...prev.motivation, mainGoal: e.target.value }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nível de Motivação (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="mt-1 block w-full"
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    motivation: { ...prev.motivation, motivationLevel: e.target.value }
                  }))}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Desafios</label>
                <textarea
                  placeholder="Quais são seus maiores desafios para manter uma alimentação saudável?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.motivation?.challenges?.join('\n') || ''}
                  onChange={(e) => {
                    const challenges = e.target.value.split('\n').filter(Boolean);
                    setFormData(prev => ({
                      ...prev,
                      motivation: {
                        ...prev.motivation,
                        challenges
                      }
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}