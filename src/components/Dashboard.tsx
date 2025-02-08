import React from 'react';
import { ArrowUpIcon, TrophyIcon, FireIcon, BeakerIcon, FootprintsIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface DashboardProps {
  calories: {
    consumed: number;
    goal: number;
  };
  water: {
    consumed: number;
    goal: number;
  };
  steps: {
    count: number;
    goal: number;
  };
  recommendations: Array<{
    id: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
    type: 'water' | 'food' | 'exercise';
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  calories,
  water,
  steps,
  recommendations,
  achievements,
  userName
}) => {
  // Função para calcular a porcentagem de progresso
  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  // Função para formatar números grandes
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Cabeçalho com Saudação */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, {userName}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Vamos acompanhar seu progresso de hoje
        </p>
      </div>

      {/* Cards de Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Card de Calorias */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-3">
            <FireIcon className="h-6 w-6 text-orange-500" />
            <h3 className="text-lg font-semibold ml-2">Calorias</h3>
          </div>
          <div className="relative pt-1">
            <motion.div
              className="overflow-hidden h-2 text-xs flex rounded bg-orange-100"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            >
              <motion.div
                style={{ width: `${calculateProgress(calories.consumed, calories.goal)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress(calories.consumed, calories.goal)}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-600">{formatNumber(calories.consumed)}</span>
            <span className="text-gray-400">Meta: {formatNumber(calories.goal)}</span>
          </div>
        </motion.div>

        {/* Card de Água */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-3">
            <BeakerIcon className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold ml-2">Água</h3>
          </div>
          <div className="relative pt-1">
            <motion.div
              className="overflow-hidden h-2 text-xs flex rounded bg-blue-100"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            >
              <motion.div
                style={{ width: `${calculateProgress(water.consumed, water.goal)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress(water.consumed, water.goal)}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-600">{water.consumed}ml</span>
            <span className="text-gray-400">Meta: {water.goal}ml</span>
          </div>
        </motion.div>

        {/* Card de Passos */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-3">
            <FootprintsIcon className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold ml-2">Passos</h3>
          </div>
          <div className="relative pt-1">
            <motion.div
              className="overflow-hidden h-2 text-xs flex rounded bg-green-100"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            >
              <motion.div
                style={{ width: `${calculateProgress(steps.count, steps.goal)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress(steps.count, steps.goal)}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-600">{formatNumber(steps.count)}</span>
            <span className="text-gray-400">Meta: {formatNumber(steps.goal)}</span>
          </div>
        </motion.div>
      </div>

      {/* Seção de Conquistas */}
      {achievements.length > 0 && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <TrophyIcon className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold ml-2">Conquistas</h3>
          </div>
          <div className="space-y-3">
            {achievements.map(achievement => (
              <motion.div
                key={achievement.id}
                className="flex items-center p-3 bg-yellow-50 rounded-lg"
                whileHover={{ scale: 1.01 }}
              >
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Seção de Recomendações */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">Recomendações</h3>
        <div className="space-y-3">
          {recommendations.map(rec => (
            <motion.div
              key={rec.id}
              className={`p-3 rounded-lg flex items-start ${
                rec.priority === 'high' ? 'bg-red-50' :
                rec.priority === 'medium' ? 'bg-yellow-50' :
                'bg-green-50'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              {rec.priority === 'high' && <span className="text-red-500 mr-2">⚠️</span>}
              {rec.type === 'water' && <BeakerIcon className="h-5 w-5 text-blue-500 mr-2" />}
              {rec.type === 'food' && <FireIcon className="h-5 w-5 text-orange-500 mr-2" />}
              {rec.type === 'exercise' && <FootprintsIcon className="h-5 w-5 text-green-500 mr-2" />}
              <p className={`text-sm ${
                rec.priority === 'high' ? 'text-red-700' :
                rec.priority === 'medium' ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {rec.message}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Menu de Navegação Fixo */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
        <div className="flex justify-around p-3">
          <button className="flex flex-col items-center text-green-600">
            <FireIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Progresso</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <BeakerIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Refeições</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <TrophyIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Conquistas</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <FootprintsIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Exercícios</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
