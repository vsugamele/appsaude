import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import MealAnalysis from '../components/MealAnalysis';
import MealHistory from '../components/MealHistory';

interface Meal {
  id: string;
  date: Date;
  image: string;
  analysis: {
    calories: number;
    nutrients: {
      protein: number;
      carbs: number;
      fat: number;
    };
    recommendations: string[];
  };
}

const MealRegister: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleAnalysisComplete = (analysis: any, imageData: string) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      date: new Date(),
      image: imageData,
      analysis
    };

    setMeals(prevMeals => [newMeal, ...prevMeals]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-semibold">Registrar Refeição</h1>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Componente de análise de refeição */}
          <section className="mb-8">
            <MealAnalysis
              onAnalysisComplete={(analysis, imageData) => 
                handleAnalysisComplete(analysis, imageData)
              }
            />
          </section>

          {/* Histórico de refeições */}
          <section>
            <MealHistory meals={meals} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MealRegister;
