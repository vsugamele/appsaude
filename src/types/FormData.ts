export interface FormData {
  name: string;
  email: string;
  age: string;
  weight: string;
  height: string;
  gender: 'male' | 'female';
  activityLevel: string;
  dietaryRestrictions: string[];
  healthConditions: string[];
  goals: string[];
  medicalHistory: {
    diseases: string[];
    allergies: string[];
    medications: string[];
    familyHistory: string[];
  };
  measurements: {
    chest: string;
    thigh: string;
    calf: string;
    abdomen: string;
    waist: string;
    hip: string;
    bodyFat: string;
  };
  mentalHealth: {
    stressLevel: string;
    sleepHours: string;
    sleepQuality: string;
    mood?: string;
  };
  digestiveHealth: string;
  cardiovascularHealth: string;
  diet: {
    mealsPerDay: string;
    mealTimes: string[];
    fastFoodFrequency: string;
    waterIntake: string;
    alcoholConsumption: string;
  };
  exercise: {
    currentActivities: string[];
    frequency: string;
    duration: string;
    equipment: string[];
  };
  motivation: {
    mainGoal: string;
    motivationLevel: string;
    challenges: string[];
  };
  routine: {
    workSchedule: string;
    mealPrepTime: string;
    workType: string;
  };
  selectedBodyPart: string | null;
}
