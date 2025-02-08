import React, { useState } from 'react';
import { FormData } from '../types/FormData';

interface MealPlanProps {
  profileData: FormData;
  onAddToList: (items: string[]) => void;
}

interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DailyPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface WeeklyPlan {
  id: string;
  name: string;
  description: string;
  dailyPlans: DailyPlan[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  restrictions: string[];
  duration: string;
}

export const MealPlan: React.FC<MealPlanProps> = ({ profileData, onAddToList }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [showPlanType, setShowPlanType] = useState<'plano' | 'recomendacoes'>('plano');

  const calculateDailyNeeds = (): number => {
    const weight = parseFloat(profileData.weight);
    const height = parseFloat(profileData.height);
    const age = parseInt(profileData.age);
    const gender = profileData.gender;
    const activityLevel = profileData.activityLevel;

    if (!weight || !height || !age) return 2000;

    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    return Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
  };

  const generateMeal = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack', calories: number): Meal => {
    const meals: { [key: string]: Meal } = {
      breakfast: {
        id: `breakfast-${Date.now()}`,
        name: 'Café da Manhã',
        ingredients: [
          'Aveia (50g)',
          'Iogurte Grego (200g)',
          'Banana (1 unidade)',
          'Mel (1 colher)',
          'Canela a gosto'
        ],
        calories: Math.round(calories),
        protein: 20,
        carbs: 45,
        fat: 10
      },
      lunch: {
        id: `lunch-${Date.now()}`,
        name: 'Almoço',
        ingredients: [
          'Frango Grelhado (150g)',
          'Arroz Integral (100g)',
          'Brócolis (100g)',
          'Azeite (1 colher)',
          'Salada de Folhas Verdes'
        ],
        calories: Math.round(calories),
        protein: 35,
        carbs: 45,
        fat: 15
      },
      dinner: {
        id: `dinner-${Date.now()}`,
        name: 'Jantar',
        ingredients: [
          'Salmão (130g)',
          'Quinoa (80g)',
          'Legumes Assados (150g)',
          'Azeite (1 colher)'
        ],
        calories: Math.round(calories),
        protein: 30,
        carbs: 35,
        fat: 15
      },
      snack: {
        id: `snack-${Date.now()}`,
        name: 'Lanche',
        ingredients: [
          'Frutas (100g)',
          'Nozes (20g)',
          'Iogurte Natural (100g)'
        ],
        calories: Math.round(calories),
        protein: 10,
        carbs: 20,
        fat: 5
      }
    };

    return meals[type];
  };

  const generateDailyPlan = (dailyCalories: number): DailyPlan => {
    return {
      breakfast: generateMeal('breakfast', dailyCalories * 0.25),
      lunch: generateMeal('lunch', dailyCalories * 0.35),
      dinner: generateMeal('dinner', dailyCalories * 0.25),
      snacks: [
        generateMeal('snack', dailyCalories * 0.075),
        generateMeal('snack', dailyCalories * 0.075)
      ]
    };
  };

  const generateWeeklyPlan = (weekNumber: number): WeeklyPlan => {
    const dailyCalories = calculateDailyNeeds();
    const dailyPlans: DailyPlan[] = Array(7).fill(null).map(() => generateDailyPlan(dailyCalories));

    return {
      id: `week-${weekNumber}`,
      name: `Plano Semana ${weekNumber}`,
      description: 'Plano alimentar personalizado baseado no seu perfil',
      dailyPlans,
      nutritionalInfo: {
        calories: dailyCalories,
        protein: Math.round(dailyCalories * 0.3 / 4), // 30% das calorias de proteína
        carbs: Math.round(dailyCalories * 0.5 / 4), // 50% das calorias de carboidratos
        fat: Math.round(dailyCalories * 0.2 / 9) // 20% das calorias de gordura
      },
      restrictions: profileData.dietaryRestrictions,
      duration: '7 dias'
    };
  };

  const weeklyPlan = generateWeeklyPlan(selectedWeek);
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Plano Alimentar</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setShowPlanType('plano')}
            className={`px-4 py-2 rounded-lg ${
              showPlanType === 'plano'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Plano Semanal
          </button>
          <button
            onClick={() => setShowPlanType('recomendacoes')}
            className={`px-4 py-2 rounded-lg ${
              showPlanType === 'recomendacoes'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Recomendações
          </button>
        </div>

        {showPlanType === 'plano' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Semana {selectedWeek}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setSelectedWeek(prev => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  Próxima
                </button>
              </div>
            </div>

            {daysOfWeek.map((day, index) => (
              <div key={day} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{day}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                    const meal = weeklyPlan.dailyPlans[index][mealType as keyof Omit<DailyPlan, 'snacks'>];
                    return (
                      <div key={mealType} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">{meal.name}</h4>
                          <button
                            onClick={() => onAddToList(meal.ingredients)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Adicionar à Lista
                          </button>
                        </div>
                        <ul className="text-sm text-gray-600 mb-3 space-y-1">
                          {meal.ingredients.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        <div className="text-xs text-gray-500">
                          <p>Calorias: {meal.calories}kcal</p>
                          <p>Proteínas: {meal.protein}g</p>
                          <p>Carboidratos: {meal.carbs}g</p>
                          <p>Gorduras: {meal.fat}g</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg">Lanches</h4>
                    <ul className="text-sm text-gray-600 mb-3 space-y-1">
                      {weeklyPlan.dailyPlans[index].snacks.map((snack) => (
                        <li key={snack.id}>
                          <div className="flex justify-between items-start mb-2">
                            <span>{snack.name}</span>
                            <button
                              onClick={() => onAddToList(snack.ingredients)}
                              className="text-sm text-green-600 hover:text-green-700"
                            >
                              Adicionar à Lista
                            </button>
                          </div>
                          <div className="text-xs text-gray-500">
                            <p>Calorias: {snack.calories}kcal</p>
                            <p>Proteínas: {snack.protein}g</p>
                            <p>Carboidratos: {snack.carbs}g</p>
                            <p>Gorduras: {snack.fat}g</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Recomendações Nutricionais</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                Com base no seu perfil e objetivos, aqui estão algumas recomendações:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Mantenha uma ingestão diária de {weeklyPlan.nutritionalInfo.calories} calorias</li>
                <li>Proteínas: {weeklyPlan.nutritionalInfo.protein}g por dia</li>
                <li>Carboidratos: {weeklyPlan.nutritionalInfo.carbs}g por dia</li>
                <li>Gorduras: {weeklyPlan.nutritionalInfo.fat}g por dia</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
