import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PlusIcon, MinusIcon, CheckIcon, PrinterIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { MealPlan } from '../components/MealPlan'
import { FormData } from './Profile'

interface NutritionalInfo {
  calories: number;  // por 100g
  protein: number;   // em gramas por 100g
}

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  nutritionalInfo: NutritionalInfo;
  isRecommended?: boolean;
  recommendationReason?: string;
}

interface Category {
  name: string;
  icon: string;
}

export default function SmartShoppingList() {
  const navigate = useNavigate()
  const [items, setItems] = useState<GroceryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas Categorias')
  const [newItem, setNewItem] = useState('')
  const [showMealPlan, setShowMealPlan] = useState(false)
  const [profileData, setProfileData] = useState<FormData | null>(null)

  useEffect(() => {
    // Carregar dados do perfil do localStorage
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }

    // Gerar lista inicial de itens
    const generatedList: GroceryItem[] = [
      {
        id: '1',
        name: 'Frango (Peito)',
        quantity: 1,
        unit: 'kg',
        category: 'Proteínas',
        checked: false,
        nutritionalInfo: {
          calories: 165,
          protein: 31
        },
        isRecommended: true,
        recommendationReason: 'Rico em proteínas magras, ideal para seu objetivo de ganho muscular'
      },
      {
        id: '2',
        name: 'Salmão',
        quantity: 500,
        unit: 'g',
        category: 'Proteínas',
        checked: false,
        nutritionalInfo: {
          calories: 208,
          protein: 22
        },
        isRecommended: true,
        recommendationReason: 'Excelente fonte de proteínas e ômega-3, ótimo para saúde cardiovascular'
      },
      {
        id: '3',
        name: 'Ovo',
        quantity: 30,
        unit: 'unidades',
        category: 'Proteínas',
        checked: false,
        nutritionalInfo: {
          calories: 155,
          protein: 13
        },
        isRecommended: true,
        recommendationReason: 'Proteína completa e versátil, rico em vitaminas'
      },
      // Vegetais e Frutas
      {
        id: '4',
        name: 'Brócolis',
        quantity: 2,
        unit: 'unidades',
        category: 'Frutas e Vegetais',
        checked: false,
        nutritionalInfo: {
          calories: 34,
          protein: 2.5
        },
        isRecommended: true,
        recommendationReason: 'Rico em fibras, vitamina C e compostos antioxidantes'
      },
      {
        id: '5',
        name: 'Espinafre',
        quantity: 300,
        unit: 'g',
        category: 'Frutas e Vegetais',
        checked: false,
        nutritionalInfo: {
          calories: 23,
          protein: 2.9
        },
        isRecommended: true,
        recommendationReason: 'Excelente fonte de ferro e vitaminas, baixo em calorias'
      },
      {
        id: '6',
        name: 'Banana',
        quantity: 12,
        unit: 'unidades',
        category: 'Frutas e Vegetais',
        checked: false,
        nutritionalInfo: {
          calories: 89,
          protein: 1.1
        },
        isRecommended: true,
        recommendationReason: 'Ótima fonte de energia pré-treino, rica em potássio'
      },
      {
        id: '7',
        name: 'Abacate',
        quantity: 2,
        unit: 'unidades',
        category: 'Frutas e Vegetais',
        checked: false,
        nutritionalInfo: {
          calories: 160,
          protein: 2
        },
        isRecommended: true,
        recommendationReason: 'Rico em gorduras saudáveis e fibras'
      },
      // Grãos e Cereais
      {
        id: '8',
        name: 'Quinoa',
        quantity: 500,
        unit: 'g',
        category: 'Grãos e Cereais',
        checked: false,
        nutritionalInfo: {
          calories: 368,
          protein: 14
        },
        isRecommended: true,
        recommendationReason: 'Carboidrato complexo rico em proteínas e fibras'
      },
      {
        id: '9',
        name: 'Aveia',
        quantity: 1,
        unit: 'kg',
        category: 'Grãos e Cereais',
        checked: false,
        nutritionalInfo: {
          calories: 389,
          protein: 16.9
        },
        isRecommended: true,
        recommendationReason: 'Excelente para café da manhã, rica em fibras e proteínas'
      },
      {
        id: '10',
        name: 'Arroz Integral',
        quantity: 1,
        unit: 'kg',
        category: 'Grãos e Cereais',
        checked: false,
        nutritionalInfo: {
          calories: 350,
          protein: 7
        },
        isRecommended: true,
        recommendationReason: 'Carboidrato complexo com mais fibras que o arroz branco'
      },
      // Laticínios
      {
        id: '11',
        name: 'Iogurte Grego',
        quantity: 4,
        unit: 'unidades',
        category: 'Laticínios',
        checked: false,
        nutritionalInfo: {
          calories: 130,
          protein: 15
        },
        isRecommended: true,
        recommendationReason: 'Alto teor de proteínas, ótimo para pós-treino'
      },
      {
        id: '12',
        name: 'Queijo Cottage',
        quantity: 400,
        unit: 'g',
        category: 'Laticínios',
        checked: false,
        nutritionalInfo: {
          calories: 98,
          protein: 11
        },
        isRecommended: true,
        recommendationReason: 'Baixo em gordura e alto em proteínas'
      },
      // Temperos
      {
        id: '13',
        name: 'Cúrcuma',
        quantity: 100,
        unit: 'g',
        category: 'Temperos',
        checked: false,
        nutritionalInfo: {
          calories: 354,
          protein: 7.8
        },
        isRecommended: true,
        recommendationReason: 'Propriedades anti-inflamatórias e antioxidantes'
      },
      {
        id: '14',
        name: 'Gengibre',
        quantity: 200,
        unit: 'g',
        category: 'Temperos',
        checked: false,
        nutritionalInfo: {
          calories: 80,
          protein: 1.8
        },
        isRecommended: true,
        recommendationReason: 'Ajuda na digestão e tem propriedades anti-inflamatórias'
      },
      // Outros
      {
        id: '15',
        name: 'Chia',
        quantity: 300,
        unit: 'g',
        category: 'Outros',
        checked: false,
        nutritionalInfo: {
          calories: 486,
          protein: 16.5
        },
        isRecommended: true,
        recommendationReason: 'Rica em ômega-3, fibras e proteínas'
      },
      {
        id: '16',
        name: 'Castanha do Pará',
        quantity: 200,
        unit: 'g',
        category: 'Outros',
        checked: false,
        nutritionalInfo: {
          calories: 656,
          protein: 14.3
        },
        isRecommended: true,
        recommendationReason: 'Excelente fonte de selênio e gorduras saudáveis'
      }
    ];
    setItems(generatedList);
  }, []);

  const categories: Category[] = [
    { name: 'Todas Categorias', icon: '📋' },
    { name: 'Recomendações', icon: '⭐' },
    { name: 'Frutas e Vegetais', icon: '🥬' },
    { name: 'Proteínas', icon: '🥩' },
    { name: 'Grãos e Cereais', icon: '🌾' },
    { name: 'Laticínios', icon: '🥛' },
    { name: 'Temperos', icon: '🌿' },
    { name: 'Outros', icon: '🛒' }
  ]

  const handleQuantityChange = (id: string, increment: boolean) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    )
  }

  const toggleItemCheck = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const filteredItems = selectedCategory === 'Todas Categorias'
    ? items
    : selectedCategory === 'Recomendações'
    ? items.filter(item => item.isRecommended)
    : items.filter(item => item.category === selectedCategory)

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    try {
      const text = items
        .map(item => `${item.quantity} ${item.unit} ${item.name}`)
        .join('\n')
      
      await navigator.share({
        title: 'Lista de Compras',
        text: text
      })
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
    }
  }

  const handleAddItem = () => {
    if (!newItem.trim()) return

    const item: GroceryItem = {
      id: Date.now().toString(),
      name: newItem.trim(),
      quantity: 1,
      unit: 'unidade',
      category: 'Outros',
      checked: false,
      nutritionalInfo: {
        calories: 0,
        protein: 0
      }
    }

    setItems(prev => [...prev, item])
    setNewItem('')
  }

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleAddMealItems = (mealItems: string[]) => {
    const newItems = mealItems.map((itemName, index) => ({
      id: `meal-${Date.now()}-${index}`,
      name: itemName,
      quantity: 1,
      unit: 'unidade',
      category: 'Outros',
      checked: false,
      nutritionalInfo: {
        calories: 0,
        protein: 0
      }
    }));

    setItems(prev => [...prev, ...newItems]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-green-700"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold">Lista de Compras</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrint}
                className="p-2 rounded-full hover:bg-green-700"
              >
                <PrinterIcon className="h-6 w-6" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-green-700"
              >
                <ShareIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtro por Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-4 print:hidden">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Lista de Itens ou Recomendações */}
        {selectedCategory === 'Recomendações' ? (
          <div className="space-y-8">
            {profileData ? (
              <MealPlan profileData={profileData} onAddToList={handleAddMealItems} />
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700">
                  Por favor, complete seu perfil para ver recomendações personalizadas.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Campo de Busca */}
            <div className="mt-4 flex gap-4 print:hidden">
              <input
                type="text"
                placeholder="Adicionar novo item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Adicionar
              </button>
            </div>

            {/* Lista de Itens */}
            <div className="mt-8 space-y-4">
              {filteredItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItemCheck(item.id)}
                    className="h-5 w-5 text-green-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-xs text-gray-400">
                          {item.nutritionalInfo.calories} kcal / 100g • {item.nutritionalInfo.protein}g proteína / 100g
                        </p>
                        {item.isRecommended && (
                          <p className="text-sm text-green-600 mt-1">
                            ⭐ {item.recommendationReason}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, false)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <MinusIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <span className="text-lg font-medium">
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, true)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <PlusIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}