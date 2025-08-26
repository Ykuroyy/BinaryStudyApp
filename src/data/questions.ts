import { Question } from '../types';

export const questions: Question[] = [
  // 初級問題
  {
    id: 'q1',
    question: '10進数の5を2進数で表すと？',
    options: ['100', '101', '110', '111'],
    correctAnswer: 1,
    explanation: '5を2で割ると、5÷2=2余り1、2÷2=1余り0、1÷2=0余り1。余りを下から読むと101になります。',
    difficulty: 'beginner',
    category: 'conversion'
  },
  {
    id: 'q2',
    question: '2進数の1010を10進数で表すと？',
    options: ['8', '9', '10', '11'],
    correctAnswer: 2,
    explanation: '1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10',
    difficulty: 'beginner',
    category: 'conversion'
  },
  {
    id: 'q3',
    question: '16進数のAは10進数でいくつ？',
    options: ['9', '10', '11', '12'],
    correctAnswer: 1,
    explanation: '16進数では、A=10, B=11, C=12, D=13, E=14, F=15を表します。',
    difficulty: 'beginner',
    category: 'concept'
  },
  {
    id: 'q4',
    question: '8進数の12を10進数で表すと？',
    options: ['8', '9', '10', '12'],
    correctAnswer: 2,
    explanation: '1×8¹ + 2×8⁰ = 8 + 2 = 10',
    difficulty: 'beginner',
    category: 'conversion'
  },
  {
    id: 'q5',
    question: '10進数の15を16進数で表すと？',
    options: ['E', 'F', '10', '15'],
    correctAnswer: 1,
    explanation: '16進数では15はFで表されます。16になると10になります。',
    difficulty: 'beginner',
    category: 'conversion'
  },
  
  // 中級問題
  {
    id: 'q6',
    question: '2進数の11011を8進数で表すと？',
    options: ['31', '32', '33', '34'],
    correctAnswer: 2,
    explanation: '11011を右から3桁ずつ区切ると011 011。011₂=3₈、011₂=3₈なので33₈',
    difficulty: 'intermediate',
    category: 'conversion'
  },
  {
    id: 'q7',
    question: '16進数の2Fを2進数で表すと？',
    options: ['101111', '100111', '110111', '111111'],
    correctAnswer: 0,
    explanation: '2₁₆=0010₂、F₁₆=1111₂なので、2F₁₆=00101111₂=101111₂',
    difficulty: 'intermediate',
    category: 'conversion'
  },
  {
    id: 'q8',
    question: '10進数の100を2進数で表すと？',
    options: ['1100100', '1100101', '1100110', '1100111'],
    correctAnswer: 0,
    explanation: '100÷2=50余り0、50÷2=25余り0、25÷2=12余り1、12÷2=6余り0、6÷2=3余り0、3÷2=1余り1、1÷2=0余り1。下から読むと1100100',
    difficulty: 'intermediate',
    category: 'conversion'
  },
  {
    id: 'q9',
    question: '8進数の77を16進数で表すと？',
    options: ['3D', '3E', '3F', '40'],
    correctAnswer: 2,
    explanation: '77₈ = 7×8¹ + 7×8⁰ = 56 + 7 = 63₁₀ = 3F₁₆',
    difficulty: 'intermediate',
    category: 'conversion'
  },
  {
    id: 'q10',
    question: '2進数で1バイト（8ビット）で表せる最大の10進数は？',
    options: ['127', '128', '255', '256'],
    correctAnswer: 2,
    explanation: '8ビットすべてが1の場合、11111111₂ = 255₁₀。これが1バイトで表せる最大値です。',
    difficulty: 'intermediate',
    category: 'concept'
  },
  
  // 上級問題
  {
    id: 'q11',
    question: 'IPアドレス192.168.1.1の第3オクテット（1）を2進数で表すと？',
    options: ['00000001', '00000010', '00000100', '00001000'],
    correctAnswer: 0,
    explanation: '1₁₀ = 00000001₂（8ビットで表現）',
    difficulty: 'advanced',
    category: 'conversion'
  },
  {
    id: 'q12',
    question: '色コード#FF00FFのRGB値で、緑（G）の10進数値は？',
    options: ['0', '15', '240', '255'],
    correctAnswer: 0,
    explanation: '#FF00FFは、R=FF₁₆=255₁₀、G=00₁₆=0₁₀、B=FF₁₆=255₁₀を表します。',
    difficulty: 'advanced',
    category: 'conversion'
  },
  {
    id: 'q13',
    question: 'Unixファイル権限755を2進数で表すと？（所有者の権限部分のみ）',
    options: ['101', '110', '111', '1000'],
    correctAnswer: 2,
    explanation: '7₈ = 111₂（読み取り+書き込み+実行）',
    difficulty: 'advanced',
    category: 'conversion'
  },
  {
    id: 'q14',
    question: '2の補数表現で、8ビットの2進数10000001が表す10進数は？',
    options: ['-1', '-127', '-128', '129'],
    correctAnswer: 1,
    explanation: '最上位ビットが1なので負数。反転して01111110、+1して01111111=127。よって-127',
    difficulty: 'advanced',
    category: 'calculation'
  },
  {
    id: 'q15',
    question: '16進数のABCDを2進数で表すと何ビット必要？',
    options: ['12', '14', '16', '20'],
    correctAnswer: 2,
    explanation: '16進数1桁は2進数4ビット。ABCDは4桁なので4×4=16ビット必要です。',
    difficulty: 'advanced',
    category: 'concept'
  }
];