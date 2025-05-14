import quotes from '../data/quotes.json';

const MOOD_MAP = {
  'Feliz': 'motivacion',
  'Triste': 'triste',
  'Estresado': 'estresado',
  'Cansado': 'bienestar',
  'Motivado': 'motivacion'
};

export const getQuote = (mood) => {
  const key = MOOD_MAP[mood] || mood?.toLowerCase() || 'motivacion';
  if (quotes[key] && quotes[key].length > 0) {
    return quotes[key][Math.floor(Math.random() * quotes[key].length)];
  }
  if (quotes['motivacion'] && quotes['motivacion'].length > 0) {
    return quotes['motivacion'][Math.floor(Math.random() * quotes['motivacion'].length)];
  }
  return 'No hay frases disponibles.';
};
