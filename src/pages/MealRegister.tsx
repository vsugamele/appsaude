import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MealAnalysis from '../components/MealAnalysis';
import MealHistory from '../components/MealHistory';

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

const MealRegister: React.FC = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<MealData[]>([]);

  const handleAnalysisComplete = (analysis: { calories: number; protein: number; carbs: number; fat: number }) => {
    const newMeal: MealData = {
      id: Date.now().toString(),
      name: 'Nova Refeição',
      description: '',
      ...analysis,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString()
    };
    setMeals(prev => [...prev, newMeal]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
          </Link>
          <h1 className="text-2xl font-bold">Registro de Refeições</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de histórico */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Histórico</h2>
            <MealHistory meals={meals} />
          </section>

          {/* Componente de análise de refeição */}
          <section className="mb-8">
            <MealAnalysis
              onAnalysisComplete={(analysis) => 
                handleAnalysisComplete(analysis)
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default MealRegister;
