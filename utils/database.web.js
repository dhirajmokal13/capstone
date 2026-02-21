const MENU_STORAGE_KEY = 'little_lemon_menu_items';
const CATEGORY_STORAGE_KEY = 'little_lemon_categories';

let menuItems = [];
let categories = [];

const loadFromStorage = (key, fallback) => {
  try {
    const raw = globalThis?.localStorage?.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    globalThis?.localStorage?.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

export const initDatabase = async () => {
  menuItems = loadFromStorage(MENU_STORAGE_KEY, []);
  categories = loadFromStorage(CATEGORY_STORAGE_KEY, []);
  return;
};

export const getDatabase = () => null;

export const createMenuTable = async () => {
  return;
};

export const createCategoriesTable = async () => {
  return;
};

export const saveMenuItems = async (items) => {
  menuItems = Array.isArray(items) ? [...items] : [];
  saveToStorage(MENU_STORAGE_KEY, menuItems);
};

export const saveCategories = async (items) => {
  categories = Array.isArray(items) ? [...items] : [];
  saveToStorage(CATEGORY_STORAGE_KEY, categories);
};

export const getMenuItems = async () => menuItems;

export const getCategories = async () => categories;

export const filterMenuItems = async (selectedCategories = [], searchQuery = '') => {
  const trimmedQuery = searchQuery.trim().toLowerCase();

  if (selectedCategories.length === 0 && !trimmedQuery) {
    return menuItems;
  }

  return menuItems.filter((item) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesQuery =
      !trimmedQuery || item.name.toLowerCase().includes(trimmedQuery);
    return matchesCategory && matchesQuery;
  });
};

export const menuExists = async () => menuItems.length > 0;

export const clearMenu = async () => {
  menuItems = [];
  categories = [];
  saveToStorage(MENU_STORAGE_KEY, menuItems);
  saveToStorage(CATEGORY_STORAGE_KEY, categories);
};
