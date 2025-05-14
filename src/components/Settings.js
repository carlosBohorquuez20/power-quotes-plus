import React from 'react';

const INTERVALS = [
  { label: "Cada hora", value: 3600000 },
  { label: "Cada 3 horas", value: 10800000 },
  { label: "Cada 6 horas", value: 21600000 }
];

export default function Settings({ interval, onIntervalChange, onSave }) {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">Configuración</h2>
        <div className="mb-6">
          <label className="block text-purple-600 font-medium mb-2">
            Frecuencia de notificaciones
          </label>
          <div className="space-y-3">
            {INTERVALS.map(i => (
              <button
                key={i.value}
                onClick={() => onIntervalChange(i.value)}
                className={`w-full p-3 rounded-xl text-left transition-colors
                  ${interval === i.value 
                    ? 'bg-purple-100 text-purple-700 font-medium' 
                    : 'bg-gray-50 text-gray-600 hover:bg-purple-50'}`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={onSave}
          className="w-full py-3 px-6 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
