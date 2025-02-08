import React, { useState } from 'react';
import { ArrowUpIcon, CameraIcon } from '@heroicons/react/24/outline';

interface MealAnalysisProps {
  onAnalysisComplete: (analysis: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }) => void;
}

const MealAnalysis: React.FC<MealAnalysisProps> = ({ onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        analyzeMeal(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMeal = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      // Simulando análise da refeição
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis = {
        calories: Math.floor(Math.random() * 500) + 300,
        protein: Math.floor(Math.random() * 30) + 15,
        carbs: Math.floor(Math.random() * 50) + 30,
        fat: Math.floor(Math.random() * 20) + 10
      };

      onAnalysisComplete(mockAnalysis);
    } catch (error) {
      console.error('Erro ao analisar refeição:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Análise de Refeição</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto da Refeição
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mx-auto h-32 w-32 object-cover rounded-md"
              />
            ) : (
              <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>Carregar foto</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <div className="text-center py-4">
          <ArrowUpIcon className="animate-bounce mx-auto h-8 w-8 text-green-500" />
          <p className="mt-2 text-sm text-gray-600">Analisando sua refeição...</p>
        </div>
      )}
    </div>
  );
};

export default MealAnalysis;
