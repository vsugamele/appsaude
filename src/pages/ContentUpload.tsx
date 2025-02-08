import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline'

interface ContentForm {
  title: string
  description: string
  category: string
  type: string
  level: string
  tags: string[]
  thumbnail: File | null
  content: string
  videoUrl?: string
  pdfFile?: File | null
  nutritionalInfo?: {
    calories: string
    protein: string
    carbs: string
    fat: string
  }
}

export default function ContentUpload() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ContentForm>({
    title: '',
    description: '',
    category: 'nutrition',
    type: 'article',
    level: 'beginner',
    tags: [],
    thumbnail: null,
    content: '',
    nutritionalInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar upload do conteúdo
    console.log('Dados do conteúdo:', formData)
    navigate('/nutrition-education')
  }

  const handleFileUpload = (file: File, type: 'thumbnail' | 'pdf') => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('O arquivo é muito grande. O tamanho máximo permitido é 5MB.')
      return
    }

    if (type === 'thumbnail' && !file.type.startsWith('image/')) {
      alert('Formato de arquivo inválido. Apenas imagens são aceitas para thumbnail.')
      return
    }

    if (type === 'pdf' && file.type !== 'application/pdf') {
      alert('Formato de arquivo inválido. Apenas PDFs são aceitos.')
      return
    }

    setFormData(prev => ({
      ...prev,
      [type === 'thumbnail' ? 'thumbnail' : 'pdfFile']: file
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold ml-4">Upload de Conteúdo</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria</label>
                  <select
                    required
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="nutrition">Nutrição</option>
                    <option value="exercise">Exercícios</option>
                    <option value="recipe">Receitas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    required
                    value={formData.type}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="article">Artigo</option>
                    <option value="video">Vídeo</option>
                    <option value="recipe">Receita</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nível</label>
                <select
                  required
                  value={formData.level}
                  onChange={e => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="beginner">Iniciante</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="advanced">Avançado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  placeholder="Separe as tags por vírgula"
                  value={formData.tags.join(', ')}
                  onChange={e => setFormData(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()) 
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Thumbnail</h2>
            
            <div className="mt-2">
              {formData.thumbnail ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Thumbnail"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, thumbnail: null }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <PhotoIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Clique para adicionar thumbnail</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'thumbnail')}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Conteúdo</h2>
            
            {formData.type === 'video' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">URL do Vídeo</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={e => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={10}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            )}

            {/* PDF Complementar */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Material Complementar (PDF)</label>
              {formData.pdfFile ? (
                <div className="flex items-center justify-between mt-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{formData.pdfFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pdfFile: null }))}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <label className="mt-2 flex justify-center px-6 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <DocumentIcon className="h-6 w-6 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Clique para adicionar PDF</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'pdf')}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Informações Nutricionais (apenas para receitas) */}
          {formData.type === 'recipe' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Nutricionais</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calorias</label>
                  <input
                    type="number"
                    value={formData.nutritionalInfo?.calories}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      nutritionalInfo: { ...prev.nutritionalInfo!, calories: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Proteínas (g)</label>
                  <input
                    type="number"
                    value={formData.nutritionalInfo?.protein}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      nutritionalInfo: { ...prev.nutritionalInfo!, protein: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Carboidratos (g)</label>
                  <input
                    type="number"
                    value={formData.nutritionalInfo?.carbs}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      nutritionalInfo: { ...prev.nutritionalInfo!, carbs: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gorduras (g)</label>
                  <input
                    type="number"
                    value={formData.nutritionalInfo?.fat}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      nutritionalInfo: { ...prev.nutritionalInfo!, fat: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Publicar Conteúdo
          </button>
        </form>
      </main>
    </div>
  )
}