import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Banner = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>
        <Text style={styles.description}>
          We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#495057',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f4ce14',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
});

export default Banner;
