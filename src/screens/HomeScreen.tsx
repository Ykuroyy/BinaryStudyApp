import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, StudyProgress } from '../types';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [progress, setProgress] = useState<StudyProgress | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const storedProgress = await AsyncStorage.getItem('studyProgress');
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const menuItems = [
    {
      title: '学習モード',
      subtitle: '2進法の基礎を学ぼう',
      screen: 'Study' as keyof RootStackParamList,
      color: '#4CAF50',
    },
    {
      title: '練習モード',
      subtitle: '変換問題を練習しよう',
      screen: 'Practice' as keyof RootStackParamList,
      color: '#2196F3',
    },
    {
      title: '試験モード',
      subtitle: '実力をテストしよう',
      screen: 'Exam' as keyof RootStackParamList,
      color: '#FF9800',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>2進法マスター</Text>
          <Text style={styles.subtitle}>
            コンピュータの基礎を楽しく学ぼう！
          </Text>
        </View>

        {progress && (
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>学習進捗</Text>
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{progress.totalQuestions}</Text>
                <Text style={styles.statLabel}>総問題数</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{progress.correctAnswers}</Text>
                <Text style={styles.statLabel}>正解数</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {progress.totalQuestions > 0 
                    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100) 
                    : 0}%
                </Text>
                <Text style={styles.statLabel}>正答率</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>💡 今日のヒント</Text>
          <Text style={styles.tipText}>
            2進法では、右端から順に1, 2, 4, 8, 16...と2のべき乗の重みを持ちます。
            例: 1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 13₁₀
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  progressCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  tipContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;