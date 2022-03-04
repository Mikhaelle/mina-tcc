import React, {
  createContext,
  useState,
  useContext,
  Context,
  useEffect,
} from 'react';
import {QuizService} from '../../services/QuizService/quizService';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

interface IQuizContext {
  userAnsweredQuiz: boolean;
}

const QuizContext: Context<IQuizContext> = createContext(undefined as any);
const QuizConsumer = QuizContext.Consumer;
const useQuiz = () => useContext(QuizContext);

const QuizProvider: React.FC<{quiz: QuizService}> = props => {
  const quiz = props;

  const [userAnsweredQuiz, setUserAnsweredQuiz] = useState(false);

  useEffect(() => {}, []);

  return (
    <QuizContext.Provider
      value={{
        userAnsweredQuiz,
      }}
      {...props}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

export {QuizProvider, QuizConsumer, useQuiz, QuizContext};
