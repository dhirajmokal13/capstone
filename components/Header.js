import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const Header = ({ onProfilePress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>🍋</Text>
        <Text style={styles.restaurantName}>Little Lemon</Text>
      </View>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={onProfilePress}
      >
        <Text style={styles.profileIcon}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 28,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#495057',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
});

export default Header;
