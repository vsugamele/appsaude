import { useState } from 'react'
import { Bars3Icon as MenuIcon, UserIcon, CameraIcon, BeakerIcon, UserGroupIcon, AcademicCapIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const [calories] = useState('1,850')
  const [water] = useState('1,200')
  const [steps] = useState('6,542')
  
  const handleMealRegistration = () => {
    navigate('/register-meal')
  }

  const handleShoppingList = () => {
    navigate('/shopping-list')
  }

  const recommendations = [
    'Beba mais 500ml de água para atingir sua meta diária',
    'Sua última refeição foi há 4 horas, considere fazer um lanche saudável',
    'Você está 2,458 passos abaixo da sua meta diária'
  ]

  const goals = [
    { description: 'Beber 2L de água', progress: 60, complete: false },
    { description: 'Caminhar 10.000 passos', progress: 65, complete: false },
    { description: 'Registrar todas as refeições', progress: 100, complete: true }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button className="p-2">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Saúde & Bem-estar</h1>
          <button className="p-2" onClick={() => navigate('/profile')}>
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Summary */}
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Calorias</p>
            <p className="text-xl font-bold">{calories}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Água (ml)</p>
            <p className="text-xl font-bold">{water}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Passos</p>
            <p className="text-xl font-bold">{steps}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleMealRegistration}
            className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
          >
            <CameraIcon className="h-5 w-5" />
            Registrar Refeição
          </button>
          <button 
            onClick={() => navigate('/nutrition-plan')}
            className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <BeakerIcon className="h-5 w-5" />
            Plano Nutricional
          </button>
          <button 
            onClick={handleShoppingList}
            className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Lista de Compras
          </button>
          <button 
            onClick={() => navigate('/nutritionist-consult')}
            className="bg-amber-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
          >
            <UserGroupIcon className="h-5 w-5" />
            Consulta Nutricional
          </button>
        </div>

        {/* AI Recommendations */}
        <section>
          <h2 className="text-xl font-bold mb-4">Recomendações</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-4 text-gray-700">
                {rec}
              </div>
            ))}
          </div>
        </section>

        {/* Goals */}
        <section>
          <h2 className="text-xl font-bold mb-4">Suas Metas</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {goals.map((goal, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                {goal.complete && (
                  <span className="text-green-500">✓</span>
                )}
                <div className="flex-1">
                  <p className="text-gray-700">{goal.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}