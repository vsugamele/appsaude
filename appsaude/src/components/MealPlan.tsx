import React, { useState } from 'react';
import { FormData } from '../pages/Profile';

interface MealPlanProps {
  profileData: FormData;
  onAddToList: (items: string[]) => void;
}

interface Meal {
  name: string;
  items: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface DayPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export function MealPlan({ profileData, onAddToList }: MealPlanProps) {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [showPlanType, setShowPlanType] = useState<'plano' | 'recomendacoes'>('plano');

  // Função para gerar refeições baseadas no perfil
  const generateMeals = (weekNumber: number): DayPlan[] => {
    const weekPlan: DayPlan[] = [];
    const dailyCalories = calculateDailyNeeds();

    // Gera 7 dias de refeições
    for (let i = 0; i < 7; i++) {
      weekPlan.push({
        breakfast: generateBreakfast(dailyCalories * 0.25),
        lunch: generateLunch(dailyCalories * 0.35),
        dinner: generateDinner(dailyCalories * 0.25)
      });
    }

    return weekPlan;
  };

  // Calcula necessidades calóricas baseadas no perfil
  const calculateDailyNeeds = () => {
    const weight = parseFloat(profileData.weight);
    const height = parseFloat(profileData.height);
    const age = parseFloat(profileData.age);
    let bmr = 0;

    if (profileData.gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const multiplier = activityMultipliers[profileData.activityLevel as keyof typeof activityMultipliers] || 1.2;
    return bmr * multiplier;
  };

  const generateBreakfast = (targetCalories: number): Meal => ({
    name: 'Café da Manhã',
    items: [
      'Aveia (50g)',
      'Iogurte Grego (200g)',
      'Banana (1 unidade)',
      'Mel (1 colher)',
      'Canela a gosto'
    ],
    nutritionalInfo: {
      calories: Math.round(targetCalories),
      protein: 20,
      carbs: 45,
      fats: 10
    }
  });

  const generateLunch = (targetCalories: number): Meal => ({
    name: 'Almoço',
    items: [
      'Frango Grelhado (150g)',
      'Arroz Integral (100g)',
      'Brócolis (100g)',
      'Azeite de Oliva (1 colher)',
      'Salada de Folhas Verdes'
    ],
    nutritionalInfo: {
      calories: Math.round(targetCalories),
      protein: 35,
      carbs: 45,
      fats: 15
    }
  });

  const generateDinner = (targetCalories: number): Meal => ({
    name: 'Jantar',
    items: [
      'Salmão (130g)',
      'Quinoa (80g)',
      'Legumes Assados (150g)',
      'Azeite de Oliva (1 colher)'
    ],
    nutritionalInfo: {
      calories: Math.round(targetCalories),
      protein: 30,
      carbs: 35,
      fats: 15
    }
  });

  const weekPlan = generateMeals(selectedWeek);
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6">
      {/* Navegação entre Plano e Recomendações */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowPlanType('plano')}
          className={`px-4 py-2 rounded-lg ${
            showPlanType === 'plano'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          📅 Plano Alimentar
        </button>
        <button
          onClick={() => setShowPlanType('recomendacoes')}
          className={`px-4 py-2 rounded-lg ${
            showPlanType === 'recomendacoes'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          ⭐ Recomendações
        </button>
      </div>

      {showPlanType === 'plano' ? (
        <>
          {/* Seleção de Semana */}
          <div className="flex gap-2 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((week) => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`px-4 py-2 rounded-lg ${
                  selectedWeek === week
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Semana {week}
              </button>
            ))}
          </div>

          {/* Plano da Semana */}
          <div className="space-y-8">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">{day}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                    const meal = weekPlan[index][mealType as keyof DayPlan];
                    return (
                      <div key={mealType} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-lg">{meal.name}</h4>
                          <button
                            onClick={() => onAddToList(meal.items)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Adicionar à Lista
                          </button>
                        </div>
                        <ul className="text-sm text-gray-600 mb-3 space-y-1">
                          {meal.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        <div className="text-xs text-gray-500 border-t pt-2">
                          <p>Calorias: {meal.nutritionalInfo.calories}kcal</p>
                          <p>Proteínas: {meal.nutritionalInfo.protein}g</p>
                          <p>Carboidratos: {meal.nutritionalInfo.carbs}g</p>
                          <p>Gorduras: {meal.nutritionalInfo.fats}g</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aqui você pode adicionar suas recomendações gerais */}
        </div>
      )}
    </div>
  );
}
