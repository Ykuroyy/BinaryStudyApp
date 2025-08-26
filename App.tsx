import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import StudyScreen from './src/screens/StudyScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ExamScreen from './src/screens/ExamScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '2進法学習アプリ' }}
        />
        <Stack.Screen 
          name="Study" 
          component={StudyScreen} 
          options={{ title: '学習モード' }}
        />
        <Stack.Screen 
          name="Practice" 
          component={PracticeScreen} 
          options={{ title: '練習モード' }}
        />
        <Stack.Screen 
          name="Exam" 
          component={ExamScreen} 
          options={{ title: '試験モード' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}