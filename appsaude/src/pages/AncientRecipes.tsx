import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { generateRecipe } from '../services/openai.service'

interface FormData {
  mainSymptom: string
  otherSymptom?: string
  dietaryRestrictions: string[]
  recipeType: string
  frequency: string
  duration: string
  additionalBenefits: string[]
}

export default function AncientRecipes() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    mainSymptom: '',
    dietaryRestrictions: [],
    recipeType: '',
    frequency: '',
    duration: '',
    additionalBenefits: []
  })

  const symptoms = [
    'Ansiedade / Estresse',
    'Insônia / Dificuldade para dormir',
    'Falta de energia / Cansaço excessivo',
    'Problemas digestivos',
    'Inflamação ou dores no corpo',
    'Imunidade baixa',
    'Retenção de líquidos / Inchaço',
    'Problemas respiratórios',
    'Outros'
  ]

  const dietaryRestrictions = [
    'Vegetariano',
    'Vegano',
    'Sem lactose',
    'Sem glúten',
    'Alérgico a frutos do mar',
    'Nenhuma restrição'
  ]

  const recipeTypes = [
    'Chá / Infusão',
    'Suco natural',
    'Caldo / Sopa',
    'Prato com ingredientes naturais',
    'Não tenho preferência'
  ]

  const frequencies = [
    'Todos os dias',
    'Algumas vezes por semana',
    'Ocasionalmente'
  ]

  const durations = [
    'Menos de 1 mês',
    '1 a 3 meses',
    'Mais de 3 meses'
  ]

  const additionalBenefits = [
    'Ajudar a emagrecer',
    'Melhorar a digestão',
    'Melhorar a pele e cabelo',
    'Aumentar a imunidade',
    'Ajudar na recuperação muscular',
    'Reduzir inflamação'
  ]

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const recipe = await generateRecipe(formData)
      navigate('/recipe-result', { state: { recipe } })
    } catch (error) {
      console.error('Erro ao gerar receita:', error)
      // TODO: Mostrar mensagem de erro para o usuário
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Qual é o seu principal desconforto?</h2>
            <div className="space-y-2">
              {symptoms.map(symptom => (
                <div
                  key={symptom}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.mainSymptom === symptom
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, mainSymptom: symptom }))
                    if (symptom !== 'Outros') nextStep()
                  }}
                >
                  <p className="text-gray-700">{symptom}</p>
                </div>
              ))}
            </div>
            {formData.mainSymptom === 'Outros' && (
              <input
                type="text"
                placeholder="Descreva seu desconforto"
                className="mt-4 w-full p-3 border rounded-lg"
                value={formData.otherSymptom || ''}
                onChange={e => setFormData(prev => ({ ...prev, otherSymptom: e.target.value }))}
              />
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Você tem alguma restrição alimentar?</h2>
            <div className="space-y-2">
              {dietaryRestrictions.map(restriction => (
                <div
                  key={restriction}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.dietaryRestrictions.includes(restriction)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
                        ? prev.dietaryRestrictions.filter(r => r !== restriction)
                        : [...prev.dietaryRestrictions, restriction]
                    }))
                  }}
                >
                  <p className="text-gray-700">{restriction}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Você prefere uma receita de:</h2>
            <div className="space-y-2">
              {recipeTypes.map(type => (
                <div
                  key={type}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.recipeType === type
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, recipeType: type }))
                  }}
                >
                  <p className="text-gray-700">{type}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Com que frequência você sente esse problema?</h2>
            <div className="space-y-2">
              {frequencies.map(freq => (
                <div
                  key={freq}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.frequency === freq
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, frequency: freq }))
                  }}
                >
                  <p className="text-gray-700">{freq}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Há quanto tempo você sente esse problema?</h2>
            <div className="space-y-2">
              {durations.map(duration => (
                <div
                  key={duration}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.duration === duration
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, duration: duration }))
                  }}
                >
                  <p className="text-gray-700">{duration}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Gostaria que a receita tivesse algum benefício extra?</h2>
            <div className="space-y-2">
              {additionalBenefits.map(benefit => (
                <div
                  key={benefit}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.additionalBenefits.includes(benefit)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      additionalBenefits: prev.additionalBenefits.includes(benefit)
                        ? prev.additionalBenefits.filter(b => b !== benefit)
                        : [...prev.additionalBenefits, benefit]
                    }))
                  }}
                >
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold ml-4">Receitas Milenares</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Passo {currentStep} de 6
            </p>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Voltar
                </button>
              )}
              {currentStep < 6 ? (
                <button
                  onClick={nextStep}
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={
                    (currentStep === 1 && !formData.mainSymptom) ||
                    (currentStep === 2 && formData.dietaryRestrictions.length === 0) ||
                    (currentStep === 3 && !formData.recipeType) ||
                    (currentStep === 4 && !formData.frequency) ||
                    (currentStep === 5 && !formData.duration)
                  }
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={formData.additionalBenefits.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Gerando Receita...
                    </div>
                  ) : (
                    'Gerar Receita'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}