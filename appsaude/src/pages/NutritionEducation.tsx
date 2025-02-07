import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeftIcon, 
  MagnifyingGlassIcon, 
  VideoCameraIcon, 
  BookOpenIcon,
  ArrowUpTrayIcon,
  AdjustmentsHorizontalIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

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
}

export default function NutritionEducation() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const articles: Article[] = [
    {
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
      }
    },
    {
      id: '2',
      title: 'Alimentação e Saúde Mental',
      category: 'nutrition',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554',
      description: 'A relação entre nutrição e bem-estar mental: alimentos que melhoram seu humor',
      level: 'intermediate',
      tags: ['saúde mental', 'nutrição', 'bem-estar'],
      author: {
        name: 'Dr. Pedro Santos',
        role: 'Nutrólogo'
      }
    },
    {
      id: '3',
      title: 'Guia Completo de Hidratação',
      category: 'nutrition',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d',
      description: 'Aprenda sobre a importância da água e como manter-se adequadamente hidratado',
      level: 'beginner',
      tags: ['hidratação', 'água', 'saúde'],
      author: {
        name: 'Dra. Ana Silva',
        role: 'Nutricionista'
      }
    },
    {
      id: '4',
      title: 'Receita: Smoothie Energético',
      category: 'recipe',
      type: 'recipe',
      thumbnail: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4',
      description: 'Prepare um smoothie nutritivo para começar o dia com energia',
      level: 'beginner',
      tags: ['receitas', 'café da manhã', 'energia'],
      author: {
        name: 'Chef Maria Oliveira',
        role: 'Chef Nutricional'
      }
    },
    {
      id: '5',
      title: 'Nutrição Básica: Macronutrientes',
      category: 'nutrition',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      description: 'Guia completo sobre proteínas, carboidratos e gorduras',
      level: 'beginner',
      tags: ['nutrição básica', 'macronutrientes', 'alimentação'],
      author: {
        name: 'Dra. Ana Silva',
        role: 'Nutricionista'
      }
    },
    {
      id: '6',
      title: 'Treino HIIT para Iniciantes',
      category: 'exercise',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      description: 'Treino intervalado de alta intensidade para queima de gordura',
      level: 'beginner',
      tags: ['exercício', 'HIIT', 'treino'],
      author: {
        name: 'Prof. Carlos Santos',
        role: 'Educador Físico'
      }
    },
    {
      id: '7',
      title: 'Bowl de Proteína Vegano',
      category: 'recipe',
      type: 'recipe',
      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      description: 'Receita nutritiva e saborosa rica em proteínas vegetais',
      level: 'intermediate',
      tags: ['receitas', 'vegano', 'proteína'],
      author: {
        name: 'Chef Maria Oliveira',
        role: 'Chef Nutricional'
      }
    },
    {
      id: '8',
      title: 'Probióticos: Os Guardiões da Sua Saúde Intestinal',
      category: 'nutrition',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1557425493-6f90ae4659fc',
      description: 'Descubra como os probióticos podem transformar sua saúde digestiva e imunidade',
      level: 'beginner',
      tags: ['saúde intestinal', 'probióticos', 'imunidade'],
      author: {
        name: 'Dra. Ana Silva',
        role: 'Nutricionista'
      }
    },
    {
      id: '9',
      title: 'Nutrição para Atletas',
      category: 'nutrition',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd',
      description: 'Estratégias nutricionais para melhorar seu desempenho esportivo',
      level: 'advanced',
      tags: ['esporte', 'performance', 'nutrição esportiva'],
      author: {
        name: 'Prof. Carlos Santos',
        role: 'Nutricionista Esportivo'
      }
    },
    {
      id: '10',
      title: 'Mitos e Verdades sobre Dietas',
      category: 'nutrition',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
      description: 'Análise científica dos principais mitos sobre alimentação e dietas',
      level: 'intermediate',
      tags: ['dietas', 'mitos', 'nutrição'],
      author: {
        name: 'Dra. Ana Silva',
        role: 'Nutricionista'
      }
    }
  ]

  const filterArticles = () => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
      const matchesType = selectedType === 'all' || article.type === selectedType
      const matchesLevel = selectedLevel === 'all' || article.level === selectedLevel

      return matchesSearch && matchesCategory && matchesType && matchesLevel
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="p-2">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold ml-4">Biblioteca de Conteúdo</h1>
          </div>
          {/* Upload Button - Only visible for professionals */}
          <button
            onClick={() => navigate('/content-upload')}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span>Upload</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar conteúdo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            
            <button
              onClick={() => {/* Toggle filters modal */}}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filtros
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-sm"
            >
              <option value="all">Todas Categorias</option>
              <option value="nutrition">Nutrição</option>
              <option value="exercise">Exercícios</option>
              <option value="recipe">Receitas</option>
            </select>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-sm"
            >
              <option value="all">Todos Tipos</option>
              <option value="article">Artigos</option>
              <option value="video">Vídeos</option>
              <option value="recipe">Receitas</option>
            </select>

            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-sm"
            >
              <option value="all">Todos Níveis</option>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterArticles().map(article => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => navigate(`/content/${article.id}`)}
            >
              <div className="relative h-48">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                  {article.type === 'video' && <VideoCameraIcon className="h-5 w-5 text-blue-500" />}
                  {article.type === 'article' && <BookOpenIcon className="h-5 w-5 text-green-500" />}
                  {article.type === 'recipe' && <BeakerIcon className="h-5 w-5 text-amber-500" />}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{article.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{article.author.name}</p>
                      <p className="text-gray-500">{article.author.role}</p>
                    </div>
                  </div>
                  
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${article.level === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                    ${article.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${article.level === 'advanced' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {article.level.charAt(0).toUpperCase() + article.level.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}