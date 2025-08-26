import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { lessons } from '../data/lessons';
import { Lesson } from '../types';

const StudyScreen: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  if (selectedLesson) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.lessonContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedLesson(null)}
          >
            <Text style={styles.backButtonText}>← レッスン一覧に戻る</Text>
          </TouchableOpacity>

          <Text style={styles.lessonTitle}>{selectedLesson.title}</Text>
          <Text style={styles.lessonText}>{selectedLesson.content}</Text>

          {selectedLesson.examples.length > 0 && (
            <View style={styles.examplesSection}>
              <Text style={styles.sectionTitle}>例題</Text>
              {selectedLesson.examples.map((example, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.exampleCard}
                  onPress={() => 
                    setExpandedExample(expandedExample === index ? null : index)
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.exampleTitle}>{example.title}</Text>
                  <Text style={styles.exampleDescription}>
                    {example.description}
                  </Text>
                  {expandedExample === index && (
                    <View style={styles.stepsContainer}>
                      {example.steps.map((step, stepIndex) => (
                        <View key={stepIndex} style={styles.step}>
                          <Text style={styles.stepNumber}>
                            Step {stepIndex + 1}
                          </Text>
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.screenTitle}>基礎学習</Text>
        <Text style={styles.screenSubtitle}>
          基礎から順番に学んでいきましょう
        </Text>
        
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => setSelectedLesson(lesson)}
            activeOpacity={0.8}
          >
            <Text style={styles.lessonCardTitle}>{lesson.title}</Text>
            <Text style={styles.lessonCardDescription}>
              タップして学習を始める →
            </Text>
          </TouchableOpacity>
        ))}
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
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  lessonCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  lessonCardDescription: {
    fontSize: 14,
    color: '#4CAF50',
  },
  lessonContent: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2196F3',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  lessonText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 30,
  },
  examplesSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  exampleCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
  },
  stepsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  step: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 10,
    minWidth: 50,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default StudyScreen;