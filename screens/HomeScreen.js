import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, Platform } from 'react-native';
import Header from '../components/Header';
import Banner from '../components/Banner';
import CategoryFilter from '../components/CategoryFilter';
import MenuItem from '../components/MenuItem';
import {
  initDatabase,
  getMenuItems,
  saveMenuItems,
  saveCategories,
  menuExists,
  filterMenuItems,
} from '../utils/database';
import { fetchMenuData, parseMenuData, getUniqueCategories } from '../utils/api';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimer = useRef(null);

  // Initialize database and load data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDatabase();
        await loadMenuData();
      } catch (error) {
        console.error('Error initializing app:', error);
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Load menu data from database or API
  const loadMenuData = async () => {
    try {
      const hasData = await menuExists();

      if (hasData) {
        // Load from database
        const items = await getMenuItems();
        setAllMenuItems(items);
        setMenuItems(items);
        const cats = getUniqueCategories(items);
        setCategories(cats);
      } else {
        // Fetch from API and save to database
        const data = await fetchMenuData();
        const parsedItems = parseMenuData(data);
        const cats = getUniqueCategories(parsedItems);

        await saveMenuItems(parsedItems);
        await saveCategories(cats);

        setAllMenuItems(parsedItems);
        setMenuItems(parsedItems);
        setCategories(cats);
      }
    } catch (error) {
      console.error('Error loading menu data:', error);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter change
  const handleCategoryChange = async (newCategories) => {
    setSelectedCategories(newCategories);
    await updateFilteredItems(newCategories, searchQuery);
  };

  // Handle search with debounce
  const handleSearchChange = (query) => {
    setSearchQuery(query);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      updateFilteredItems(selectedCategories, query);
    }, 500);
  };

  // Update filtered menu items
  const updateFilteredItems = async (categories, query) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (Platform.OS === 'web') {
      const filtered = allMenuItems.filter((item) => {
        const matchesCategory =
          categories.length === 0 || categories.includes(item.category);
        const matchesQuery =
          !trimmedQuery || item.name.toLowerCase().includes(trimmedQuery);
        return matchesCategory && matchesQuery;
      });
      setMenuItems(filtered);
      return;
    }

    try {
      const filtered = await filterMenuItems(categories, query);
      setMenuItems(filtered);
    } catch (error) {
      console.error('Error filtering menu items:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4ce14" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onProfilePress={() => navigation.navigate('Profile')} />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            onPress={() => navigation.navigate('MenuDetails', { item })}
          />
        )}
        ListHeaderComponent={
          <>
            <Banner 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            {categories.length > 0 && (
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            )}
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dishes found</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#495057',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
