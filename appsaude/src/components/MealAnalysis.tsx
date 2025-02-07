import React, { useState, useRef } from 'react';
import { CameraIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import OpenAI from 'openai';
import MealDetails from './MealDetails';

interface MealAnalysisProps {
  onAnalysisComplete: (analysis: {
    calories: number;
    nutrients: {
      protein: number;
      carbs: number;
      fat: number;
    };
    recommendations: string[];
    foodItems?: Array<{
      id: string;
      name: string;
      protein: number;
      carbs: number;
      fat: number;
      portion: string;
    }>;
  }) => void;
}

const MealAnalysis: React.FC<MealAnalysisProps> = ({ onAnalysisComplete }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Converter a imagem para base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
        await analyzeMeal(base64Image);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Erro ao capturar imagem. Tente novamente.');
      console.error('Erro na captura:', err);
    }
  };

  const analyzeMeal = async (imageData: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analise esta refeição e forneça: 1) Estimativa de calorias, 2) Macronutrientes aproximados (proteína, carboidratos, gorduras), 3) Identificação dos principais alimentos no prato com suas porções estimadas, 4) Recomendações nutricionais baseadas na composição do prato. Responda em português e no formato JSON."
              },
              {
                type: "image_url",
                image_url: imageData
              }
            ]
          }
        ],
        max_tokens: 500
      });

      const analysisText = response.choices[0]?.message?.content;
      if (!analysisText) throw new Error('Análise não retornou resultados');

      // Converter o texto JSON em objeto
      const analysis = JSON.parse(analysisText);
      setCurrentAnalysis(analysis);
      setShowDetails(true);
    } catch (err) {
      setError('Erro ao analisar a refeição. Tente novamente.');
      console.error('Erro na análise:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFoodItemsSave = (foodItems: any[]) => {
    if (currentAnalysis) {
      const analysisWithItems = {
        ...currentAnalysis,
        foodItems
      };
      onAnalysisComplete(analysisWithItems);
      setShowDetails(false);
      setCurrentAnalysis(null);
      setImage(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Área de upload/captura de imagem */}
      {!showDetails && (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            image ? 'border-green-500' : 'border-gray-300'
          }`}
        >
          {image ? (
            <div className="space-y-4">
              <img 
                src={image} 
                alt="Refeição" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Tirar outra foto
              </button>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-4"
            >
              <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="space-y-2">
                <p className="text-gray-600">
                  Clique para tirar uma foto da sua refeição
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Tirar foto
                </button>
              </div>
            </motion.div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageCapture}
            className="hidden"
          />
        </div>
      )}

      {/* Estado de carregamento */}
      {isAnalyzing && (
        <div className="mt-4 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <ArrowUpTrayIcon className="h-6 w-6 text-green-500" />
          </motion.div>
          <p className="mt-2 text-gray-600">Analisando sua refeição...</p>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Detalhamento dos alimentos */}
      {showDetails && currentAnalysis && (
        <div className="mt-4">
          <MealDetails
            onSave={handleFoodItemsSave}
            initialItems={currentAnalysis.foods?.map((food: any) => ({
              id: Date.now().toString(),
              name: food.name,
              protein: food.protein || 0,
              carbs: food.carbs || 0,
              fat: food.fat || 0,
              portion: food.portion || ''
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default MealAnalysis;
