import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../utils/api';

const MenuItem = ({ item, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description || 'Delicious dish'}
        </Text>
        <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
      </View>
      <View style={styles.imageContainer}>
        {imageLoading && !imageError && (
          <ActivityIndicator size="small" color="#495057" style={styles.loader} />
        )}
        {!imageError ? (
          <Image
            source={{ uri: getImageUrl(item.image) }}
            style={styles.image}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🍽️</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    marginRight: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f4ce14',
    marginTop: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loader: {
    position: 'absolute',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 24,
  },
});

export default MenuItem;
