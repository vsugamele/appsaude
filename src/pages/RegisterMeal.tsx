import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface NutritionalAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  score: number;
  feedback: {
    positives: string[];
    improvements: string[];
  };
}

export default function RegisterMeal() {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<NutritionalAnalysis | null>(null)

  const handleTakePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Criar URL para preview da imagem
    const imageUrl = URL.createObjectURL(file)
    setPhoto(imageUrl)
    
    // Iniciar análise
    await analyzePhoto(file)
  }

  const analyzePhoto = async (file: File) => {
    setAnalyzing(true)
    try {
      // Simular análise da imagem
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Exemplo de resultado da análise
      setAnalysis({
        calories: 450,
        protein: 25,
        carbs: 45,
        fats: 15,
        fiber: 8,
        score: 8,
        feedback: {
          positives: [
            'Boa proporção de proteínas',
            'Presença de vegetais coloridos',
            'Porção adequada'
          ],
          improvements: [
            'Considere adicionar mais fibras',
            'Reduza levemente os carboidratos refinados'
          ]
        }
      })
    } catch (error) {
      console.error('Erro na análise:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold ml-4">Registrar Refeição</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          {photo ? (
            <div className="space-y-4">
              <img src={photo} alt="Refeição" className="w-full h-64 object-cover rounded-lg" />
              {analyzing ? (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <ArrowPathIcon className="h-8 w-8 text-green-500 animate-spin" />
                    <p className="text-sm text-gray-500">Analisando sua refeição...</p>
                  </div>
                </div>
              ) : (
                <>
                  {analysis && (
                    <div className="space-y-6">
                      {/* Macronutrientes */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Análise Nutricional</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Calorias</p>
                            <p className="text-xl font-bold text-gray-900">{analysis.calories}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Proteínas</p>
                            <p className="text-xl font-bold text-gray-900">{analysis.protein}g</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Carboidratos</p>
                            <p className="text-xl font-bold text-gray-900">{analysis.carbs}g</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Gorduras</p>
                            <p className="text-xl font-bold text-gray-900">{analysis.fats}g</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Fibras</p>
                            <p className="text-xl font-bold text-gray-900">{analysis.fiber}g</p>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Avaliação Geral</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700">Score Nutricional</span>
                            <span className="text-xl font-bold text-gray-900">{analysis.score}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full"
                              style={{ width: `${(analysis.score / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-green-600 font-medium mb-2">Pontos Positivos</h4>
                            <ul className="space-y-2">
                              {analysis.feedback.positives.map((point, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                  <span className="text-green-500">✓</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-orange-600 font-medium mb-2">Sugestões de Melhoria</h4>
                            <ul className="space-y-2">
                              {analysis.feedback.improvements.map((point, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                  <span className="text-orange-500">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => { setPhoto(null); setAnalysis(null); }}
                        className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Registrar Nova Refeição
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <label
              htmlFor="photo-upload"
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center space-y-2 hover:border-green-500 transition-colors"
            >
              <CameraIcon className="h-12 w-12 text-gray-400" />
              <p className="text-gray-500">Clique para tirar uma foto da sua refeição</p>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleTakePhoto}
              />
            </label>
          )}
        </div>
      </main>
    </div>
  )
}