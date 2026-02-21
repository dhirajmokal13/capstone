import * as SQLite from 'expo-sqlite';

const DB_NAME = 'little_lemon';

let db = null;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await createMenuTable();
    await createCategoriesTable();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getDatabase = () => {
  if (!db) {
    console.error('Database not initialized. Call initDatabase first.');
  }
  return db;
};

export const createMenuTable = async () => {
  if (!db) return;
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        image TEXT,
        category TEXT
      );
    `);
  } catch (error) {
    console.error('Error creating menu table:', error);
  }
};

export const createCategoriesTable = async () => {
  if (!db) return;
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        title TEXT UNIQUE NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error creating categories table:', error);
  }
};

export const saveMenuItems = async (items) => {
  if (!db) return;
  try {
    const placeholders = items.map(() => '(?, ?, ?, ?, ?, ?)').join(',');
    const values = [];

    items.forEach((item) => {
      values.push(
        item.id,
        item.name,
        item.price,
        item.description,
        item.image,
        item.category
      );
    });

    await db.runAsync(
      `INSERT OR REPLACE INTO menu (id, name, price, description, image, category)
       VALUES ${placeholders}`,
      values
    );
  } catch (error) {
    console.error('Error saving menu items:', error);
  }
};

export const saveCategories = async (categories) => {
  if (!db) return;
  try {
    for (const category of categories) {
      await db.runAsync(
        'INSERT OR REPLACE INTO categories (title) VALUES (?)',
        [category]
      );
    }
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

export const getMenuItems = async () => {
  if (!db) return [];
  try {
    const result = await db.getAllAsync('SELECT * FROM menu ORDER BY name');
    return result || [];
  } catch (error) {
    console.error('Error getting menu items:', error);
    return [];
  }
};

export const getCategories = async () => {
  if (!db) return [];
  try {
    const result = await db.getAllAsync('SELECT DISTINCT title FROM categories ORDER BY title');
    return result ? result.map((cat) => cat.title) : [];
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const filterMenuItems = async (selectedCategories = [], searchQuery = '') => {
  if (!db) return [];
  try {
    const trimmedQuery = searchQuery.trim();

    if (selectedCategories.length === 0 && !trimmedQuery) {
      return await getMenuItems();
    }

    let query = 'SELECT * FROM menu WHERE 1=1';
    const params = [];

    if (selectedCategories.length > 0) {
      const placeholders = selectedCategories.map(() => '?').join(',');
      query += ` AND category IN (${placeholders})`;
      params.push(...selectedCategories);
    }

    if (trimmedQuery) {
      query += ' AND name LIKE ? COLLATE NOCASE';
      params.push(`%${trimmedQuery}%`);
    }

    query += ' ORDER BY name';

    const result = await db.getAllAsync(query, params);
    return result || [];
  } catch (error) {
    console.error('Error filtering menu items:', error);
    return [];
  }
};

export const menuExists = async () => {
  if (!db) return false;
  try {
    const result = await db.getFirstAsync(
      'SELECT COUNT(*) as count FROM menu'
    );
    return result && result.count > 0;
  } catch (error) {
    console.error('Error checking if menu exists:', error);
    return false;
  }
};

export const clearMenu = async () => {
  if (!db) return;
  try {
    await db.runAsync('DELETE FROM menu');
    await db.runAsync('DELETE FROM categories');
  } catch (error) {
    console.error('Error clearing menu:', error);
  }
};
