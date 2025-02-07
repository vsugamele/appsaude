import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function NutritionistConsult() {
  const navigate = useNavigate()
  const [isAvailable, setIsAvailable] = useState(false)
  const [remainingConsults, setRemainingConsults] = useState(2)

  useEffect(() => {
    // Verifica se está dentro do horário de atendimento (9h às 20h)
    const checkAvailability = () => {
      const now = new Date()
      const hour = now.getHours()
      setIsAvailable(hour >= 9 && hour < 20)
    }

    checkAvailability()
    const interval = setInterval(checkAvailability, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  const handleStartChat = () => {
    if (remainingConsults > 0) {
      setRemainingConsults(prev => prev - 1)
      // TODO: Implementar início do chat
      console.log('Iniciando chat com a nutricionista')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold ml-4">Consulta com Nutricionista</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Informações do Profissional */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
                alt="Nutricionista"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">Dra. Ana Silva</h2>
                <p className="text-gray-600">Nutricionista Clínica</p>
                <p className="text-gray-600">CRN: 12345</p>
              </div>
            </div>
            <p className="text-gray-700">
              Especialista em nutrição funcional e comportamental, com mais de 10 anos de experiência
              em reeducação alimentar e acompanhamento nutricional personalizado.
            </p>
          </div>

          {/* Status e Ação */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                <span className="text-sm text-gray-600">
                  {isAvailable ? 'Online - Disponível para atendimento' : 'Indisponível no momento'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Consultas gratuitas restantes: {remainingConsults}
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Informações do Atendimento:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Horário de atendimento: 09h às 20h</li>
                <li>• Modalidade: Chat online</li>
                <li>• Benefício: 2 consultas gratuitas</li>
                <li>• Tempo médio de resposta: 5 minutos</li>
              </ul>
            </div>

            {/* Botão de Início */}
            <button
              onClick={handleStartChat}
              disabled={!isAvailable || remainingConsults === 0}
              className={`w-full p-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                isAvailable && remainingConsults > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              {!isAvailable
                ? 'Atendimento indisponível no momento'
                : remainingConsults === 0
                ? 'Você já utilizou suas consultas gratuitas'
                : 'Conversar com a Especialista Agora'}
            </button>

            {!isAvailable && (
              <p className="text-sm text-gray-500 text-center mt-2">
                Horário de atendimento: Segunda a Sexta, das 09h às 20h
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}