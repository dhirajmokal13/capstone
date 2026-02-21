import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation/RootNavigator';

// Ignore warnings
LogBox.ignoreLogs([
  'Non-serializable values',
  'ViewPropTypes',
  'Animated',
  'AsyncStorage',
]);

export default function App() {
  useEffect(() => {
    // Initialize app
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
