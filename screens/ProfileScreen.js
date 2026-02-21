import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem('userProfile');
      if (profile) {
        const parsedProfile = JSON.parse(profile);
        setFirstName(parsedProfile.firstName || '');
        setLastName(parsedProfile.lastName || '');
        setEmail(parsedProfile.email || '');
        setPhone(parsedProfile.phone || '');
        setNotifications(
          parsedProfile.notifications || {
            orderStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
          }
        );
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const normalizePhone = (value) => value.replace(/\D/g, '').slice(0, 10);

  const formatPhone = (digits) => {
    if (!digits) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const isValidUsPhone = (value) => normalizePhone(value).length === 10;

  const handlePhoneChange = (value) => {
    const digits = normalizePhone(value);
    setPhone(formatPhone(digits));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getInitials = () => {
    const first = firstName.trim().charAt(0).toUpperCase();
    const last = lastName.trim().charAt(0).toUpperCase();
    const initials = `${first}${last || ''}`.trim();
    return initials || 'LL';
  };



  const saveProfile = async () => {
    if (!email || !firstName) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }

    if (phone && !isValidUsPhone(phone)) {
      Alert.alert('Validation', 'Please enter a valid US phone number');
      return;
    }

    try {
      const profile = {
        firstName,
        lastName,
        email,
        phone,
        notifications,
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleLogout = async () => {
    const confirmLogout = async () => {
      try {
        await AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    if (Platform.OS === 'web') {
      const ok = window.confirm('Are you sure you want to logout?');
      if (ok) {
        await confirmLogout();
      }
      return;
    }

    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: confirmLogout,
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} scrollEnabled={true} showsVerticalScrollIndicator={true}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, !navigation.canGoBack() && styles.backButtonDisabled]}
          onPress={() => navigation.goBack()}
          disabled={!navigation.canGoBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../assets/Profile.png')} 
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            editable={isEditing}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            editable={isEditing}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            placeholder="(555) 123-4567"
            value={phone}
            onChangeText={handlePhoneChange}
            editable={isEditing}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.notificationsSection}>
          <Text style={styles.sectionTitle}>Email Notifications</Text>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => toggleNotification('orderStatuses')}
            disabled={!isEditing}
          >
            <View style={[styles.checkbox, notifications.orderStatuses && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Order statuses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => toggleNotification('passwordChanges')}
            disabled={!isEditing}
          >
            <View style={[styles.checkbox, notifications.passwordChanges && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Password changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => toggleNotification('specialOffers')}
            disabled={!isEditing}
          >
            <View style={[styles.checkbox, notifications.specialOffers && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Special offers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => toggleNotification('newsletter')}
            disabled={!isEditing}
          >
            <View style={[styles.checkbox, notifications.newsletter && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Newsletter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonGroup}>
          {isEditing ? (
            <View style={{ gap: 8, width: '100%' }}>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveProfile}>
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setIsEditing(false);
                  loadProfile();
                }}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Discard Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#495057',
  },
  backButton: {
    opacity: 0.5,
  },
  backButtonDisabled: {
    opacity: 0.3,
  },
  backText: {
    fontSize: 14,
    color: '#ffffff',
  },
  backButtonPlaceholder: {
    width: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f4ce14',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
  buttonGroup: {
    gap: 8,
    marginTop: 16,
    width: '100%',
  },
  button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  editButton: {
    backgroundColor: '#495057',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#f4ce14',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#dee2e6',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: 24,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  saveButtonText: {
    color: '#495057',
  },
  cancelButtonText: {
    color: '#495057',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  form: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
    width: '100%',
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
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  notificationsSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#495057',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#495057',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },


});

export default ProfileScreen;
