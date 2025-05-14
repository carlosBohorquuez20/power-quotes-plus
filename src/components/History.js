import React from 'react';

export default function History({ history, favorites, onToggleFavorite }) {
  // Detectar si es ventana de favoritos
  const isFavorites = history === favorites;
  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isFavorites ? 'Frases favoritas' : 'Historial de frases'}
      </h2>
      <ul className="space-y-3">
        {history.length === 0 && <li className="text-gray-400 text-center">{isFavorites ? 'No tienes frases favoritas.' : 'No hay frases aún.'}</li>}
        {history.map((q, idx) => (
          <li key={idx} className="flex items-center justify-between rounded-xl px-4 py-3 shadow bg-white/80 dark:bg-[#3a2a5d]/80">
            <span className="flex-1 text-base text-[#6d4ba1] dark:text-[#e0d6f7]">{q}</span>
            <button
              className={`ml-4 text-2xl transition-colors ${favorites.includes(q) ? 'text-pink-400' : 'text-gray-300 hover:text-pink-200'}`}
              onClick={() => onToggleFavorite(q)}
              aria-label="Favorito"
            >
              ♥
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
