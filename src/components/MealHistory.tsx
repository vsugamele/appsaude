import React from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface MealData {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  time: string;
}

interface MealHistoryProps {
  meals: MealData[];
}

const MealHistory: React.FC<MealHistoryProps> = ({ meals }) => {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-6">Histórico de Refeições</h2>
      
      <div className="space-y-6">
        {meals.map((meal) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Cabeçalho do card */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDate(meal.date)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-600">
                    {meal.calories} kcal
                  </span>
                </div>
              </div>
            </div>

            {/* Conteúdo do card */}
            <div className="flex flex-col md:flex-row">
              {/* Imagem da refeição */}
              <div className="w-full md:w-1/3">
                {/* <img
                  src={meal.image}
                  alt="Refeição"
                  className="w-full h-48 object-cover"
                /> */}
              </div>

              {/* Análise nutricional */}
              <div className="w-full md:w-2/3 p-4">
                {/* Macronutrientes */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-500">
                      Proteínas
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900">
                      {meal.protein}g
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-500">
                      Carboidratos
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900">
                      {meal.carbs}g
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-500">
                      Gorduras
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900">
                      {meal.fat}g
                    </div>
                  </div>
                </div>

                {/* Recomendações */}
                {/* <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Recomendações
                  </h4>
                  <ul className="space-y-2">
                    {meal.analysis.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="text-green-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensagem quando não há refeições */}
      {meals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Nenhuma refeição registrada ainda.
          </p>
        </div>
      )}
    </div>
  );
};

export default MealHistory;
