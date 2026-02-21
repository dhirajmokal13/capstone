import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { getImageUrl } from '../utils/api';

const MenuDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params || {};

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Menu item not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dish Details</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <Image source={{ uri: getImageUrl(item.image) }} style={styles.heroImage} />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#495057',
  },
  backButton: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 14,
    color: '#ffffff',
  },
  backButtonPlaceholder: {
    width: 48,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  heroImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f4ce14',
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default MenuDetailsScreen;
