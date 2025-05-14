import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import Settings from './components/Settings';
import { getQuote } from './services/QuoteService';
import { NotificationService, requestNotificationPermission } from './services/NotificationService';
import { saveToStorage, getFromStorage } from './utils/storage';
import History from './components/History';

const DEFAULT_INTERVAL = 3600000;

// Punto de ruptura para viewport
const isSmallScreen = window.innerWidth < 640;

// Colores de fondo por emoción
const MOOD_BG = {
  'Feliz': 'bg-yellow-200 text-yellow-900',
  'Triste': 'bg-blue-200 text-blue-900',
  'Estresado': 'bg-orange-200 text-orange-900',
  'Cansado': 'bg-purple-200 text-purple-900',
  'Motivado': 'bg-pink-200 text-pink-900',
};

export default function App() {
  const [mood, setMood] = useState(getFromStorage('mood', ''));
  const [interval, setIntervalValue] = useState(getFromStorage('interval', DEFAULT_INTERVAL));
  const [showSettings, setShowSettings] = useState(false);
  const [quote, setQuote] = useState('El descanso es parte del progreso.');
  const [favorites, setFavorites] = useState(getFromStorage('favorites', []));
  const [dark, setDark] = useState(getFromStorage('dark', false));
  const [history, setHistory] = useState(getFromStorage('history', []));
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [emotionLog, setEmotionLog] = useState(getFromStorage('emotionLog', []));
  const [showEmotionLog, setShowEmotionLog] = useState(false);

  useEffect(() => {
    requestNotificationPermission();
    const notificationService = new NotificationService(() => {
      const q = getQuote(mood);
      setQuote(q);
      return q;
    }, interval);
    notificationService.start();
    return () => notificationService.stop();
  }, [mood, interval]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    saveToStorage('dark', dark);
  }, [dark]);

  function addToHistory(q) {
    setHistory(prev => {
      if (prev.includes(q)) return prev;
      const updated = [q, ...prev].slice(0, 50);
      saveToStorage('history', updated);
      return updated;
    });
  }

  function handleMoodSelect(selectedMood) {
    setMood(selectedMood);
    saveToStorage('mood', selectedMood);
    const q = getQuote(selectedMood);
    setQuote(q);
    addToHistory(q);
    // Guardar emoción con fecha
    const today = new Date().toISOString().slice(0, 10);
    setEmotionLog(prev => {
      const updated = [{ date: today, mood: selectedMood }, ...prev];
      saveToStorage('emotionLog', updated);
      return updated;
    });
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: 'Power Quotes+', text: quote });
    } else {
      navigator.clipboard.writeText(quote).then(() => {
        alert('¡Frase copiada al portapapeles!');
      });
    }
    addToHistory(quote);
  }

  function handleToggleFavorite(q = quote) {
    setFavorites(prev => {
      const updated = prev.includes(q) 
        ? prev.filter(f => f !== q)
        : [...prev, q];
      saveToStorage('favorites', updated);
      return updated;
    });
  }

  // Text-to-Speech para frases
  function handleSpeak() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new window.SpeechSynthesisUtterance(quote);
      utter.lang = 'es-ES';
      window.speechSynthesis.speak(utter);
    } else {
      alert('Tu navegador no soporta lectura en voz alta.');
    }
  }

  // Estructura para frases según clima/localización (puedes expandir con integración real de API)
  // function getWeatherBasedQuote(weather, mood) { ... }
  return (
    <div className={`min-h-screen flex flex-col items-center py-2 sm:py-4 px-1 sm:px-2 transition-colors overflow-x-hidden ${dark ? 'bg-[#1a1027]' : 'bg-[#f7eafc]'}`}>
      {/* Header */}
      <div className={`w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto rounded-2xl sm:rounded-3xl ${dark ? 'bg-[#2d1e4d]' : 'bg-[#f6eaff]'} shadow-xl flex items-center justify-between px-2 sm:px-8 py-2 sm:py-6 mb-2 sm:mb-6`}>
        <div>
          <div className={`text-xl sm:text-4xl font-extrabold ${dark ? 'text-[#e0d6f7]' : 'text-[#6d4ba1]'} leading-none flex items-center gap-2`}>
            Power Quotes<span className="text-xl sm:text-4xl font-extrabold">+</span>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-3 items-center">
          <button className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${dark ? 'bg-[#3a2a5d]' : 'bg-[#fff7e6]'} flex items-center justify-center shadow`} onClick={() => setDark(d => !d)}><span className={`text-base sm:text-xl ${dark ? 'text-yellow-300' : 'text-yellow-400'}`}>☀️</span></button>
          <button className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${dark ? 'bg-[#3a2a5d]' : 'bg-[#ede6ff]'} flex items-center justify-center shadow`} onClick={() => setShowSettings(!showSettings)}><span className={`${dark ? 'text-[#e0d6f7]' : 'text-[#6d4ba1]'} text-base sm:text-xl`}>⚙️</span></button>
          <button className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${dark ? 'bg-[#3a2a5d]' : 'bg-[#ede6ff]'} flex items-center justify-center shadow`} onClick={() => setShowFavorites(true)}><span className={`${dark ? 'text-pink-300' : 'text-pink-400'} text-base sm:text-xl`}>♥</span></button>
          <button className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${dark ? 'bg-[#3a2a5d]' : 'bg-[#ede6ff]'} flex items-center justify-center shadow`}><span className={`${dark ? 'text-[#e0d6f7]' : 'text-[#6d4ba1]'} text-base sm:text-xl`}>☰</span></button>
        </div>
      </div>
      {/* Pregunta */}
      <div className={`w-full max-w-xs sm:max-w-md md:max-w-xl rounded-2xl sm:rounded-[2rem] ${dark ? 'bg-[#2d1e4d]' : 'bg-[#f6eaff]'} shadow-md text-center py-2 sm:py-4 mb-2 sm:mb-4`}>
        <span className={`text-base sm:text-2xl ${dark ? 'text-[#e0d6f7]' : 'text-[#6d4ba1]'} font-semibold`}>¿Cómo te sientes?</span>
      </div>
      {/* Selector de emociones */}
      <div className="w-full flex justify-center">
        <MoodSelector selectedMood={mood} onSelect={handleMoodSelect} />
      </div>
      {/* Botones de historial y calendario */}
      <div className="w-full flex justify-center mb-2 gap-2 flex-wrap px-1">
        <button
          onClick={() => setShowHistory(true)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md font-medium text-lg transition-colors border-2 ${dark ? 'bg-[#2d1e4d] text-[#e0d6f7] border-[#6d4ba1] hover:bg-[#3a2a5d]' : 'bg-white text-[#6d4ba1] border-[#bba3e3] hover:bg-[#f6eaff]'}`}
        >
          <span className="text-xl">🕑</span> Historial
        </button>
        <button
          onClick={() => setShowEmotionLog(true)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md font-medium text-lg transition-colors border-2 ${dark ? 'bg-[#2d1e4d] text-[#e0d6f7] border-[#6d4ba1] hover:bg-[#3a2a5d]' : 'bg-white text-[#6d4ba1] border-[#bba3e3] hover:bg-[#f6eaff]'}`}
        >
          <span className="text-xl">📆</span> Calendario emocional
        </button>
      </div>
      {/* Frase principal */}
      <div className={`w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl rounded-2xl sm:rounded-[2rem] shadow-xl text-center text-base sm:text-2xl md:text-3xl font-serif py-4 sm:py-8 px-2 sm:px-6 my-2 sm:my-8 transition-colors duration-300 ${mood && MOOD_BG[mood] ? MOOD_BG[mood] : (dark ? 'bg-[#6d4ba1] text-white' : 'bg-[#bba3e3] text-white')} ${dark && !(mood && MOOD_BG[mood]) ? 'text-white' : ''}`}>
        {quote}
      </div>
      {/* Botones de acción */}
      <div className="flex gap-3 sm:gap-8 mt-2 mb-4 flex-wrap justify-center w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <button
          onClick={() => handleToggleFavorite(quote)}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-pink-50 transition-colors"
          aria-label="Favorito"
        >
          <span className={`text-3xl ${favorites.includes(quote) ? 'text-pink-400' : 'text-pink-200'}`}>♥</span>
        </button>
        <button
          onClick={() => {
            if (window.speechSynthesis.speaking) {
              window.speechSynthesis.cancel();
            } else {
              handleSpeak();
            }
          }}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
          aria-label="Escuchar frase"
        >
          <span className="text-blue-400 text-3xl">🎧</span>
        </button>
        <button
          onClick={handleShare}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
          aria-label="Compartir"
        >
          <span className="text-blue-400 text-3xl">🔗</span>
        </button>
      </div>
      {/* Historial modal flotante */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl p-8 ${dark ? 'bg-[#2d1e4d] text-[#e0d6f7]' : 'bg-white text-[#6d4ba1]'}`}
            style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
            <button
              onClick={() => setShowHistory(false)}
              className={`absolute -top-6 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 ${dark ? 'bg-[#6d4ba1] border-[#2d1e4d] text-white' : 'bg-[#bba3e3] border-white text-[#6d4ba1]'} hover:scale-110 transition-transform`}
              aria-label="Cerrar historial"
              style={{ zIndex: 10 }}
            >
              <span className="text-3xl font-bold">✕</span>
            </button>
            <History history={history} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </div>
        </div>
      )}
      {/* Favoritos modal flotante */}
      {showFavorites && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl p-8 ${dark ? 'bg-[#2d1e4d] text-[#e0d6f7]' : 'bg-white text-[#6d4ba1]'}`}
            style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
            <button
              onClick={() => setShowFavorites(false)}
              className={`absolute -top-6 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 ${dark ? 'bg-[#6d4ba1] border-[#2d1e4d] text-white' : 'bg-[#bba3e3] border-white text-[#6d4ba1]'} hover:scale-110 transition-transform`}
              aria-label="Cerrar favoritos"
              style={{ zIndex: 10 }}
            >
              <span className="text-3xl font-bold">✕</span>
            </button>
            <History history={favorites} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
            <div className="text-center text-base mt-4 opacity-60">Haz clic en el corazón para quitar de favoritos</div>
          </div>
        </div>
      )}
      {/* Modal calendario emocional */}
      {showEmotionLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl p-8 ${dark ? 'bg-[#2d1e4d] text-[#e0d6f7]' : 'bg-white text-[#6d4ba1]'}`}
            style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
            <button
              onClick={() => setShowEmotionLog(false)}
              className={`absolute -top-6 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 ${dark ? 'bg-[#6d4ba1] border-[#2d1e4d] text-white' : 'bg-[#bba3e3] border-white text-[#6d4ba1]'} hover:scale-110 transition-transform`}
              aria-label="Cerrar calendario"
              style={{ zIndex: 10 }}
            >
              <span className="text-3xl font-bold">✕</span>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Calendario emocional</h2>
            <ul className="space-y-3 max-h-[60vh] overflow-y-auto">
              {emotionLog.length === 0 && <li className="text-gray-400 text-center">No hay registros aún.</li>}
              {emotionLog.map((entry, idx) => (
                <li key={idx} className="flex items-center justify-between rounded-xl px-4 py-3 shadow bg-white/80 dark:bg-[#3a2a5d]/80">
                  <span className="flex-1 text-base text-[#6d4ba1] dark:text-[#e0d6f7]">{entry.date}</span>
                  <span className="ml-4 text-lg font-semibold">{entry.mood}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Configuración modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <Settings
              interval={interval}
              onIntervalChange={setIntervalValue}
              onSave={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
