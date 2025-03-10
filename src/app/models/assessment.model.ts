export interface QuestionItem {
    id: string; 
    text: string;
    options: AnswerOption[];
    selectedOption?: string;
    answerStatus?: string;
    correctAnswer?: string;
  }
  
  export interface AnswerOption {
    id: string; 
    text: string;
    isCorrect: number;
  }
  