import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface FoodItem {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

interface MealDetailsProps {
  onSave: (items: FoodItem[]) => void;
  initialItems?: FoodItem[];
}

const MealDetails: React.FC<MealDetailsProps> = ({ onSave, initialItems = [] }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialItems);
  const [newItem, setNewItem] = useState<FoodItem>({
    id: '',
    name: '',
    protein: 0,
    carbs: 0,
    fat: 0,
    portion: ''
  });

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      const itemWithId = {
        ...newItem,
        id: Date.now().toString()
      };
      setFoodItems([...foodItems, itemWithId]);
      setNewItem({
        id: '',
        name: '',
        protein: 0,
        carbs: 0,
        fat: 0,
        portion: ''
      });
      onSave([...foodItems, itemWithId]);
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems);
    onSave(updatedItems);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FoodItem
  ) => {
    const value = field === 'name' || field === 'portion' 
      ? e.target.value 
      : parseFloat(e.target.value) || 0;

    setNewItem({
      ...newItem,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Detalhamento do Prato</h3>

      {/* Lista de alimentos */}
      <div className="space-y-3 mb-6">
        {foodItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
          >
            <div className="flex-1 grid grid-cols-6 gap-2">
              <div className="col-span-2">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.portion}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Proteínas</div>
                <div className="font-medium">{item.protein}g</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Carboidratos</div>
                <div className="font-medium">{item.carbs}g</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Gorduras</div>
                <div className="font-medium">{item.fat}g</div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-600 p-1"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Formulário para adicionar novo alimento */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-2 space-y-2">
            <input
              type="text"
              placeholder="Nome do alimento"
              value={newItem.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Porção (ex: 100g)"
              value={newItem.portion}
              onChange={(e) => handleInputChange(e, 'portion')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Proteínas (g)"
              value={newItem.protein || ''}
              onChange={(e) => handleInputChange(e, 'protein')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Carboidratos (g)"
              value={newItem.carbs || ''}
              onChange={(e) => handleInputChange(e, 'carbs')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Gorduras (g)"
              value={newItem.fat || ''}
              onChange={(e) => handleInputChange(e, 'fat')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddItem}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Totais */}
      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Total de Nutrientes</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-500">Proteínas</div>
            <div className="font-medium">
              {foodItems.reduce((sum, item) => sum + item.protein, 0)}g
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Carboidratos</div>
            <div className="font-medium">
              {foodItems.reduce((sum, item) => sum + item.carbs, 0)}g
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Gorduras</div>
            <div className="font-medium">
              {foodItems.reduce((sum, item) => sum + item.fat, 0)}g
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
