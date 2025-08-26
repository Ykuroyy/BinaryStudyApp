import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

type ConversionType = '10to2' | '2to10' | '10to16' | '16to10' | '10to8' | '8to10';

const PracticeScreen: React.FC = () => {
  const [conversionType, setConversionType] = useState<ConversionType>('10to2');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const conversionOptions = [
    { value: '10to2', label: '10進 → 2進' },
    { value: '2to10', label: '2進 → 10進' },
    { value: '10to16', label: '10進 → 16進' },
    { value: '16to10', label: '16進 → 10進' },
    { value: '10to8', label: '10進 → 8進' },
    { value: '8to10', label: '8進 → 10進' },
  ];

  const validateInput = (value: string, type: ConversionType): boolean => {
    switch (type) {
      case '10to2':
      case '10to16':
      case '10to8':
        return /^[0-9]+$/.test(value);
      case '2to10':
        return /^[01]+$/.test(value);
      case '16to10':
        return /^[0-9A-Fa-f]+$/.test(value);
      case '8to10':
        return /^[0-7]+$/.test(value);
      default:
        return false;
    }
  };

  const convert = () => {
    if (!inputValue) {
      Alert.alert('エラー', '値を入力してください');
      return;
    }

    if (!validateInput(inputValue, conversionType)) {
      Alert.alert('エラー', '入力値が正しくありません');
      return;
    }

    let convertedValue = '';
    
    try {
      switch (conversionType) {
        case '10to2':
          convertedValue = parseInt(inputValue, 10).toString(2);
          break;
        case '2to10':
          convertedValue = parseInt(inputValue, 2).toString(10);
          break;
        case '10to16':
          convertedValue = parseInt(inputValue, 10).toString(16).toUpperCase();
          break;
        case '16to10':
          convertedValue = parseInt(inputValue, 16).toString(10);
          break;
        case '10to8':
          convertedValue = parseInt(inputValue, 10).toString(8);
          break;
        case '8to10':
          convertedValue = parseInt(inputValue, 8).toString(10);
          break;
      }
      
      setResult(convertedValue);
      setShowAnswer(true);
    } catch (error) {
      Alert.alert('エラー', '変換中にエラーが発生しました');
    }
  };

  const reset = () => {
    setInputValue('');
    setResult('');
    setShowAnswer(false);
  };

  const getPlaceholder = () => {
    switch (conversionType) {
      case '10to2':
      case '10to16':
      case '10to8':
        return '10進数を入力（例：42）';
      case '2to10':
        return '2進数を入力（例：101010）';
      case '16to10':
        return '16進数を入力（例：2A）';
      case '8to10':
        return '8進数を入力（例：52）';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>変換練習</Text>
        <Text style={styles.subtitle}>
          様々な進数変換を練習しましょう
        </Text>

        <View style={styles.typeSelector}>
          <Text style={styles.sectionTitle}>変換タイプを選択</Text>
          <View style={styles.buttonGrid}>
            {conversionOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.typeButton,
                  conversionType === option.value && styles.selectedTypeButton,
                ]}
                onPress={() => {
                  setConversionType(option.value as ConversionType);
                  reset();
                }}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    conversionType === option.value && styles.selectedTypeButtonText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>値を入力</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={getPlaceholder()}
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="characters"
          />
        </View>

        <TouchableOpacity
          style={styles.convertButton}
          onPress={convert}
          activeOpacity={0.8}
        >
          <Text style={styles.convertButtonText}>変換する</Text>
        </TouchableOpacity>

        {showAnswer && (
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>変換結果</Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>{result}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.resetButton}
              onPress={reset}
              activeOpacity={0.8}
            >
              <Text style={styles.resetButtonText}>もう一度</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.hintSection}>
          <Text style={styles.hintTitle}>ヒント</Text>
          <Text style={styles.hintText}>
            {conversionType === '10to2' && '2で割り続けて、余りを下から読みます'}
            {conversionType === '2to10' && '各桁に2の累乗を掛けて足します'}
            {conversionType === '10to16' && '16で割り続けて、10以上はA〜Fに変換'}
            {conversionType === '16to10' && 'A=10, B=11, C=12, D=13, E=14, F=15'}
            {conversionType === '10to8' && '8で割り続けて、余りを下から読みます'}
            {conversionType === '8to10' && '各桁に8の累乗を掛けて足します'}
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
  typeSelector: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    width: '48%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedTypeButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  typeButtonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectedTypeButtonText: {
    color: '#fff',
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  convertButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultSection: {
    marginBottom: 30,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hintSection: {
    backgroundColor: '#FFF9C4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  hintTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default PracticeScreen;