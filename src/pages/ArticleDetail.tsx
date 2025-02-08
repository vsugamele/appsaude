import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ClockIcon, BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline'

interface Article {
  id: string
  title: string
  category: string
  type: 'article' | 'video' | 'recipe'
  thumbnail: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  author: {
    name: string
    role: string
  }
  content?: string
  videoUrl?: string
  nutritionalInfo?: {
    calories: string
    protein: string
    carbs: string
    fat: string
  }
}

export default function ArticleDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Simula busca do artigo pelo ID
  const article: Article = {
    id: '1',
    title: 'O Poder dos Antioxidantes',
    category: 'nutrition',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    description: 'Descubra como os antioxidantes combatem o envelhecimento e fortalecem sua imunidade',
    level: 'beginner',
    tags: ['antioxidantes', 'imunidade', 'saúde'],
    author: {
      name: 'Dra. Ana Silva',
      role: 'Nutricionista'
    },
    content: `
      Os antioxidantes são compostos que protegem nossas células contra os danos causados pelos radicais livres, moléculas instáveis que podem prejudicar as células e contribuir para o desenvolvimento de várias doenças.

      ## O que são antioxidantes?

      Antioxidantes são substâncias que podem prevenir ou retardar danos às células causados por radicais livres, moléculas instáveis que o corpo produz como reação a pressões ambientais e outros fatores estressantes.

      ## Principais fontes de antioxidantes

      1. Vitamina C
         - Frutas cítricas
         - Morangos
         - Pimentões
         - Brócolis

      2. Vitamina E
         - Amêndoas
         - Sementes de girassol
         - Abacate
         - Espinafre

      3. Beta-caroteno
         - Cenoura
         - Batata doce
         - Damasco
         - Manga

      ## Benefícios para a saúde

      - Fortalecimento do sistema imunológico
      - Proteção contra envelhecimento precoce
      - Redução do risco de doenças crônicas
      - Melhora da saúde cardiovascular

      ## Como incorporar mais antioxidantes na dieta

      1. Comece o dia com frutas vermelhas
      2. Adicione nozes e sementes aos lanches
      3. Inclua vegetais coloridos em todas as refeições
      4. Consuma chá verde regularmente

      ## Dicas práticas

      - Consuma alimentos frescos e da época
      - Evite cozinhar demais os alimentos
      - Varie as cores no prato
      - Armazene adequadamente os alimentos

      ## Conclusão

      Incorporar alimentos ricos em antioxidantes em sua dieta diária é uma estratégia importante para manter a saúde e prevenir doenças. Lembre-se de manter uma alimentação variada e colorida para garantir uma ampla gama de nutrientes protetores.
    `
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href
      })
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="p-2">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold ml-4">Artigo</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Compartilhar"
            >
              <ShareIcon className="h-6 w-6" />
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Salvar"
            >
              <BookmarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`
                  px-3 py-1 rounded-full text-sm
                  ${article.level === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                  ${article.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${article.level === 'advanced' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {article.level.charAt(0).toUpperCase() + article.level.slice(1)}
                </span>
                <div className="flex items-center text-gray-500">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  <span>10 min de leitura</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              <p className="text-gray-600 mb-6">{article.description}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{article.author.name}</p>
                  <p className="text-gray-500">{article.author.role}</p>
                </div>
                <div className="flex gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-green max-w-none">
              {article.content?.split('\n').map((line, index) => (
                <p key={index} className="whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}