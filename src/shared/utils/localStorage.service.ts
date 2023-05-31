export const getFromLocalStorage = (key: string) => localStorage.getItem(key);

export const setToLocalStorage = (key: string, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);

export const isExistsInLocalStorage = (key: string) =>
  !!localStorage.getItem(key);
