// Utilidades para manejar localStorage
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key, defaultValue = null) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
