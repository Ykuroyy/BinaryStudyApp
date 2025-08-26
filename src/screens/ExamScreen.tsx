import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { questions } from '../data/questions';
import { Question } from '../types';

const ExamScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all');

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('studyProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        // 進捗データがあれば何か処理
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const saveProgress = async (correct: number, total: number) => {
    try {
      const savedProgress = await AsyncStorage.getItem('studyProgress');
      let progress = savedProgress ? JSON.parse(savedProgress) : {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      };
      
      progress.totalQuestions += total;
      progress.correctAnswers += correct;
      progress.wrongAnswers += (total - correct);
      progress.lastStudyDate = new Date().toISOString();
      
      await AsyncStorage.setItem('studyProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const startExam = () => {
    let filteredQuestions = questions;
    if (difficulty !== 'all') {
      filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // ランダムに10問選択（または全問題が10問未満の場合は全て）
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(10, shuffled.length));
    
    setExamQuestions(selectedQuestions);
    setAnsweredQuestions(new Array(selectedQuestions.length).fill(false));
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerIndex: number) => {
    if (answeredQuestions[currentQuestionIndex]) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === examQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    setShowResult(true);
    saveProgress(score, examQuestions.length);
    
    const percentage = (score / examQuestions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
      message = '完璧です！素晴らしい！';
    } else if (percentage >= 80) {
      message = 'よくできました！';
    } else if (percentage >= 60) {
      message = 'もう少し頑張りましょう！';
    } else {
      message = '基礎からもう一度復習しましょう。';
    }
    
    Alert.alert(
      '試験終了',
      `スコア: ${score}/${examQuestions.length} (${percentage.toFixed(0)}%)\n${message}`,
      [{ text: 'OK', onPress: () => setExamStarted(false) }]
    );
  };

  if (!examStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>試験問題モード</Text>
          <Text style={styles.subtitle}>
            実力を試してみましょう
          </Text>
          
          <View style={styles.difficultySection}>
            <Text style={styles.sectionTitle}>難易度を選択</Text>
            {[
              { value: 'beginner', label: '初級', color: '#4CAF50' },
              { value: 'intermediate', label: '中級', color: '#FF9800' },
              { value: 'advanced', label: '上級', color: '#F44336' },
              { value: 'all', label: 'すべて', color: '#2196F3' },
            ].map((level) => (
              <TouchableOpacity
                key={level.value}
                style={[
                  styles.difficultyButton,
                  { borderColor: level.color },
                  difficulty === level.value && { backgroundColor: level.color }
                ]}
                onPress={() => setDifficulty(level.value as any)}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === level.value && styles.selectedDifficultyText
                  ]}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={startExam}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>試験開始</Text>
          </TouchableOpacity>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>試験について</Text>
            <Text style={styles.infoText}>
              • 10問の問題が出題されます{'\n'}
              • 各問題は4択です{'\n'}
              • 制限時間はありません{'\n'}
              • 結果は学習進捗に記録されます
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];
  const isAnswered = answeredQuestions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%` }
            ]}
          />
        </View>
        
        <Text style={styles.questionNumber}>
          問題 {currentQuestionIndex + 1} / {examQuestions.length}
        </Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  isAnswered && index === currentQuestion.correctAnswer && styles.correctOption,
                  isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && styles.wrongOption,
                ]}
                onPress={() => handleAnswer(index)}
                disabled={isAnswered}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText,
                    isAnswered && index === currentQuestion.correctAnswer && styles.correctOptionText,
                    isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && styles.wrongOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {isAnswered && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>解説</Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>
          )}
        </View>
        
        {isAnswered && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={nextQuestion}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < examQuestions.length - 1 ? '次の問題' : '結果を見る'}
            </Text>
          </TouchableOpacity>
        )}
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
  scrollView: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  difficultySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  difficultyButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  difficultyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  selectedDifficultyText: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    marginBottom: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  wrongOption: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#388E3C',
    fontWeight: '600',
  },
  wrongOptionText: {
    color: '#D32F2F',
    fontWeight: '600',
  },
  explanationBox: {
    padding: 15,
    backgroundColor: '#FFF9C4',
    borderRadius: 10,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExamScreen;