import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Bem-vindo ao seu Guia de Bem-estar
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card Saúde & Bem-estar */}
          <div 
            onClick={() => navigate('/home')}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
          >
            <div className="h-48 bg-green-500 relative">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
                alt="Saúde e Bem-estar" 
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Saúde & Bem-estar</h2>
              <p className="text-gray-600">
                Acompanhe sua saúde, registre refeições e receba recomendações personalizadas.
              </p>
            </div>
          </div>

          {/* Card Receitas Milenares */}
          <div 
            onClick={() => navigate('/ancient-recipes')}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
          >
            <div className="h-48 bg-amber-500 relative">
              <img 
                src="https://images.unsplash.com/photo-1515023115689-589c33041d3c"
                alt="Receitas Milenares" 
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Receitas Milenares</h2>
              <p className="text-gray-600">
                Descubra receitas ancestrais personalizadas para suas necessidades específicas.
              </p>
            </div>
          </div>

          {/* Card Dicas Nutricionais */}
          <div 
            onClick={() => navigate('/nutrition-education')}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
          >
            <div className="h-48 bg-indigo-500 relative">
              <img 
                src="https://images.unsplash.com/photo-1557425493-6f90ae4659fc"
                alt="Dicas Nutricionais" 
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Dicas Nutricionais</h2>
              <p className="text-gray-600">
                Aprenda sobre nutrição com conteúdo educativo baseado em evidências científicas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}