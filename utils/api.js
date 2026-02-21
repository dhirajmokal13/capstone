import axios from 'axios';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const IMAGE_BASE_URL = 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images';

export const fetchMenuData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};

export const getImageUrl = (imageFileName) => {
  return `${IMAGE_BASE_URL}/${imageFileName}?raw=true`;
};

export const parseMenuData = (data) => {
  try {
    if (data.menu && Array.isArray(data.menu)) {
      return data.menu.map((item, index) => ({
        id: item.id || index,
        name: item.name,
        price: parseFloat(item.price),
        description: item.description,
        image: item.image,
        category: item.category,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error parsing menu data:', error);
    return [];
  }
};

export const getUniqueCategories = (menuItems) => {
  const categories = new Set();
  menuItems.forEach(item => {
    if (item.category) {
      categories.add(item.category);
    }
  });
  return Array.from(categories).sort();
};
