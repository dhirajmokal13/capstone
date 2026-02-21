import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(
        selectedCategories.filter(c => c !== category)
      );
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              isSelected && styles.categoryButtonSelected,
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                isSelected && styles.categoryTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  categoryButtonSelected: {
    backgroundColor: '#495057',
    borderColor: '#495057',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  categoryTextSelected: {
    color: '#f4ce14',
  },
});

export default CategoryFilter;
