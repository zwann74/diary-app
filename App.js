import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DiaryListScreen from './src/screens/DiaryListScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <DiaryListScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}