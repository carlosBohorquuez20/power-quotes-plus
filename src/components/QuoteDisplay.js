import React from 'react';

export default function QuoteDisplay({ quote, onShare, onSettings, onToggleFavorite, isFavorite }) {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
      <div className="w-full bg-purple-400 text-white rounded-3xl p-8 shadow-lg mb-8">
        <p className="text-2xl font-serif text-center leading-relaxed">
          {quote}
        </p>
      </div>
      
      <div className="flex justify-center gap-8 mt-4">
        <button
          onClick={onToggleFavorite}
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-50 transition-colors"
          aria-label="Favorito"
        >
          <span className={`text-2xl ${isFavorite ? 'text-pink-500' : 'text-pink-300'}`}>♥</span>
        </button>
        
        <button
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors"
          onClick={onShare}
          aria-label="Compartir"
        >
          <span className="text-blue-500">✏️</span>
        </button>
        
        <button
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
          onClick={onSettings}
          aria-label="Configuración"
        >
          <span className="text-purple-500">⚙️</span>
        </button>
      </div>
    </div>
  );
}
