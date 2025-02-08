import React from 'react';
import { FormData } from '../types/FormData';

interface BodyMeasurementsProps {
  measurements: FormData['measurements'];
  onChange: (measurements: FormData['measurements']) => void;
  gender: 'male' | 'female';
}

const BodyMeasurements: React.FC<BodyMeasurementsProps> = ({ measurements, onChange, gender }) => {
  const chest = parseFloat(measurements.chest) || 0;
  const thigh = parseFloat(measurements.thigh) || 0;
  const calf = parseFloat(measurements.calf) || 0;
  const waist = parseFloat(measurements.waist) || 0;
  const abdomen = parseFloat(measurements.abdomen) || 0;
  const hip = parseFloat(measurements.hip) || 0;
  const bodyFat = parseFloat(measurements.bodyFat) || 0;

  const handleInputChange = (field: keyof FormData['measurements'], value: string) => {
    onChange({
      ...measurements,
      [field]: value
    });
  };

  // Funções para avaliar as medidas
  const getAbdomenStatus = (value: number): 'good' | 'moderate' | 'bad' => {
    if (gender === 'female') {
      if (value < 80) return 'good';
      if (value <= 88) return 'moderate';
      return 'bad';
    } else {
      if (value < 94) return 'good';
      if (value <= 102) return 'moderate';
      return 'bad';
    }
  };

  const getWaistHipRatioStatus = (ratio: number): 'good' | 'bad' => {
    if (gender === 'female') {
      return ratio <= 0.85 ? 'good' : 'bad';
    } else {
      return ratio <= 0.9 ? 'good' : 'bad';
    }
  };

  const getBodyFatStatus = (value: number): 'athlete' | 'good' | 'moderate' | 'bad' => {
    if (gender === 'female') {
      if (value >= 14 && value <= 20) return 'athlete';
      if (value > 20 && value <= 24) return 'good';
      if (value > 24 && value <= 31) return 'moderate';
      return 'bad';
    } else {
      if (value >= 6 && value <= 13) return 'athlete';
      if (value > 13 && value <= 17) return 'good';
      if (value > 17 && value <= 24) return 'moderate';
      return 'bad';
    }
  };

  const getStatusIcon = (status: 'athlete' | 'good' | 'moderate' | 'bad') => {
    switch (status) {
      case 'athlete':
        return '🏃';
      case 'good':
        return '✓';
      case 'moderate':
        return '⚠️';
      case 'bad':
        return '⚠️';
    }
  };

  const MeasurementIndicator = ({ 
    value, 
    unit, 
    status,
    label 
  }: { 
    value: number; 
    unit: string; 
    status: 'athlete' | 'good' | 'moderate' | 'bad';
    label: string;
  }) => (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm">
        {getStatusIcon(status)}
      </span>
      <div className="flex-1 h-10 sm:h-8 bg-gray-100 rounded-full overflow-hidden relative">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            status === 'athlete' ? 'bg-green-500' :
            status === 'good' ? 'bg-lime-500' :
            status === 'moderate' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: '100%' }}
        >
          {/* Label dentro da barra */}
          <div className="absolute inset-0 flex items-center px-4 text-sm text-white font-medium">
            {label}
          </div>
        </div>
      </div>
      <span className="text-sm font-medium min-w-[50px] text-right">
        {value}{unit}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-2">
        {/* Gordura Corporal */}
        <MeasurementIndicator
          value={bodyFat}
          unit="%"
          status={getBodyFatStatus(bodyFat)}
          label="Gordura Corporal"
        />

        {/* Tórax */}
        <MeasurementIndicator
          value={chest}
          unit="cm"
          status={chest > 0 ? 'good' : 'moderate'}
          label="Tórax"
        />

        {/* Cintura */}
        <MeasurementIndicator
          value={waist}
          unit="cm"
          status={getWaistHipRatioStatus(waist/hip)}
          label="Cintura"
        />

        {/* Abdômen */}
        <MeasurementIndicator
          value={abdomen}
          unit="cm"
          status={getAbdomenStatus(abdomen)}
          label="Abdômen"
        />

        {/* Quadril */}
        <MeasurementIndicator
          value={hip}
          unit="cm"
          status={getWaistHipRatioStatus(waist/hip)}
          label="Quadril"
        />

        {/* Coxa */}
        <MeasurementIndicator
          value={thigh}
          unit="cm"
          status={thigh > 0 ? 'good' : 'moderate'}
          label="Coxa"
        />

        {/* Panturrilha */}
        <MeasurementIndicator
          value={calf}
          unit="cm"
          status={calf > 0 ? 'good' : 'moderate'}
          label="Panturrilha"
        />
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-gray-600">
        <span>Atleta</span>
        <span className="hidden sm:inline">|</span>
        <span>Bom</span>
        <span className="hidden sm:inline">|</span>
        <span>Moderado</span>
        <span className="hidden sm:inline">|</span>
        <span className="text-red-500">Atenção</span>
      </div>
      <div className="text-center text-xs text-gray-500 mt-1">
        Baseado nas diretrizes da OMS
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Circunferência Torácica (cm)
          </label>
          <input
            type="number"
            value={measurements.chest}
            onChange={(e) => handleInputChange('chest', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Circunferência da Coxa (cm)
          </label>
          <input
            type="number"
            value={measurements.thigh}
            onChange={(e) => handleInputChange('thigh', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Circunferência da Panturrilha (cm)
          </label>
          <input
            type="number"
            value={measurements.calf}
            onChange={(e) => handleInputChange('calf', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Circunferência Abdominal (cm)
          </label>
          <input
            type="number"
            value={measurements.abdomen}
            onChange={(e) => handleInputChange('abdomen', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Circunferência da Cintura (cm)
          </label>
          <input
            type="number"
            value={measurements.waist}
            onChange={(e) => handleInputChange('waist', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Circunferência do Quadril (cm)
          </label>
          <input
            type="number"
            value={measurements.hip}
            onChange={(e) => handleInputChange('hip', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Percentual de Gordura (%)
          </label>
          <input
            type="number"
            value={measurements.bodyFat}
            onChange={(e) => handleInputChange('bodyFat', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurements;
