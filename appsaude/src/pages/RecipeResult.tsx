import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeftIcon, PrinterIcon, ShareIcon } from '@heroicons/react/24/outline'

export default function RecipeResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const recipe = location.state?.recipe

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">Receita não encontrada</h2>
          <button
            onClick={() => navigate('/ancient-recipes')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Voltar ao formulário
          </button>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Receita Medicinal',
        text: recipe,
      })
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4 print:hidden">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="p-2">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold ml-4">Sua Receita</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
              title="Imprimir"
            >
              <PrinterIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
              title="Compartilhar"
            >
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <article className="prose prose-green max-w-none">
            {recipe.split('\n').map((line: string, index: number) => (
              <p key={index} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </article>
        </div>
      </main>
    </div>
  )
}