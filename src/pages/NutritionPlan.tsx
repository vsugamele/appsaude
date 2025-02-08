import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline'

interface Meal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  suggestions: string[]
}

export default function NutritionPlan() {
  const navigate = useNavigate()

  const meals: Meal[] = [
    {
      id: '1',
      name: 'Café da Manhã',
      time: '07:00',
      calories: 400,
      protein: 20,
      carbs: 45,
      fat: 15,
      suggestions: [
        'Omelete com espinafre',
        'Pão integral com abacate',
        'Iogurte com granola e frutas'
      ]
    },
    {
      id: '2',
      name: 'Lanche da Manhã',
      time: '10:00',
      calories: 200,
      protein: 10,
      carbs: 25,
      fat: 8,
      suggestions: [
        'Mix de castanhas',
        'Maçã com pasta de amendoim',
        'Smoothie de frutas'
      ]
    },
    {
      id: '3',
      name: 'Almoço',
      time: '13:00',
      calories: 600,
      protein: 35,
      carbs: 65,
      fat: 20,
      suggestions: [
        'Frango grelhado com quinoa',
        'Salmão com legumes assados',
        'Bowl de proteína vegana'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold ml-4">Plano Nutricional</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {/* Resumo Diário */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Meta Diária</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Calorias</p>
              <p className="text-xl font-bold text-gray-900">2,200</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Proteína</p>
              <p className="text-xl font-bold text-gray-900">120g</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carboidratos</p>
              <p className="text-xl font-bold text-gray-900">250g</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gorduras</p>
              <p className="text-xl font-bold text-gray-900">70g</p>
            </div>
          </div>
        </div>

        {/* Lista de Refeições */}
        <div className="space-y-4">
          {meals.map(meal => (
            <div key={meal.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{meal.name}</h3>
                  <div className="flex items-center text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    <span>{meal.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FireIcon className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-500">Calorias</p>
                    <p className="font-medium">{meal.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Proteína</p>
                    <p className="font-medium">{meal.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-medium">{meal.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Gorduras</p>
                    <p className="font-medium">{meal.fat}g</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Sugestões</h4>
                  <ul className="space-y-2">
                    {meal.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}