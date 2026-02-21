import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFirstName = (name) => {
    const trimmed = name.trim();
    const nameRegex = /^[A-Za-z ]+$/;
    return trimmed.length > 0 && nameRegex.test(trimmed);
  };

  const isFirstNameValid = validateFirstName(firstName);
  const isEmailValid = validateEmail(email);
  const isFormValid = isFirstNameValid && isEmailValid;

  const handleGetStarted = async () => {
    if (!isFirstNameValid || !isEmailValid) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Save user profile
      const userProfile = {
        firstName,
        email,
      };
      
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      await AsyncStorage.setItem('isOnboardingCompleted', 'true');

      // Navigate to Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error during onboarding:', error);
      Alert.alert('Error', 'Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.logoSmall}>🍋</Text>
        </View>
        <Text style={styles.subtitle}>Welcome to our restaurant</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Join us for an amazing culinary experience with authentic Mediterranean cuisine.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
            onPress={handleGetStarted}
            disabled={!isFormValid || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>What you'll enjoy:</Text>
          <Text style={styles.featureItem}>✓ Authentic Mediterranean recipes</Text>
          <Text style={styles.featureItem}>✓ Fresh, high-quality ingredients</Text>
          <Text style={styles.featureItem}>✓ Modern twist on traditional dishes</Text>
          <Text style={styles.featureItem}>✓ Easy online ordering</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#495057',
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f4ce14',
  },
  logoSmall: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  button: {
    backgroundColor: '#f4ce14',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#495057',
  },
  features: {
    gap: 8,
    paddingHorizontal: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default OnboardingScreen;
