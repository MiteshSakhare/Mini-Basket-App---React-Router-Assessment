// Cart helper functions
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const getTotalItems = (items) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

// Format currency
export const formatPrice = (price) => {
  return `₹${price.toLocaleString()}`;
};

// Storage helpers
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
  }
};
