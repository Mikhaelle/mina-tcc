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
import {useAuth} from '../AuthContext/AuthContext';

interface IQuizContext {
  answeredQuiz: boolean;
  setAnsweredQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  lastPeriod: Date;
  setLastPeriod: React.Dispatch<React.SetStateAction<any>>;
  periodDuration: number;
  setPeriodDuration: React.Dispatch<React.SetStateAction<number>>;
  regularCicle: boolean;
  setRegularCicle: React.Dispatch<React.SetStateAction<boolean>>;
  contraceptiveMethods: boolean;
  setContraceptiveMethods: React.Dispatch<React.SetStateAction<boolean>>;
  tpmSymptoms: boolean;
  setTpmSymptoms: React.Dispatch<React.SetStateAction<boolean>>;
  humorChange: boolean;
  setHumorChange: React.Dispatch<React.SetStateAction<boolean>>;
  behaviorChange: boolean;
  setBehaviorChange: React.Dispatch<React.SetStateAction<boolean>>;
  setUserQuizInfos(): Promise<void>;
}

const QuizContext: Context<IQuizContext> = createContext(undefined as any);
const QuizConsumer = QuizContext.Consumer;
const useQuiz = () => useContext(QuizContext);

const QuizProvider: React.FC<{quiz: QuizService}> = props => {
  const quizService = props;

  const {user} = useAuth();

  const [answeredQuiz, setAnsweredQuiz] = useState(false);
  const [lastPeriod, setLastPeriod] = useState(new Date());
  const [periodDuration, setPeriodDuration] = useState(5);
  const [regularCicle, setRegularCicle] = useState(false);
  const [contraceptiveMethods, setContraceptiveMethods] = useState(false);
  const [tpmSymptoms, setTpmSymptoms] = useState(false);
  const [humorChange, setHumorChange] = useState(false);
  const [behaviorChange, setBehaviorChange] = useState(false);

  useEffect(() => {
    if (user) {
      quizService.quiz.getUserQuizInfos(user.uid).then(userQuiz => {
        if (userQuiz.isAnswered) {
          var date = new Date(userQuiz.lastPeriod);
          setLastPeriod(date);
          setAnsweredQuiz(userQuiz.isAnswered);
          setRegularCicle(userQuiz.regularCicle);
          setContraceptiveMethods(userQuiz.contraceptiveMethods);
          setTpmSymptoms(userQuiz.tpmSymptoms);
          setHumorChange(userQuiz.humorChange);
          setBehaviorChange(userQuiz.behaviorChange);
        }
      });
    }
  }, [user]);

  const setUserQuizInfos = async () => {
    quizService.quiz.setUserQuizInfo(
      user.uid,
      answeredQuiz,
      lastPeriod,
      periodDuration,
      regularCicle,
      contraceptiveMethods,
      tpmSymptoms,
      humorChange,
      behaviorChange,
    );
  };

  return (
    <QuizContext.Provider
      value={{
        answeredQuiz,
        setAnsweredQuiz,
        lastPeriod,
        setLastPeriod,
        periodDuration,
        setPeriodDuration,
        regularCicle,
        setRegularCicle,
        contraceptiveMethods,
        setContraceptiveMethods,
        tpmSymptoms,
        setTpmSymptoms,
        humorChange,
        setHumorChange,
        behaviorChange,
        setBehaviorChange,
        setUserQuizInfos,
      }}
      {...props}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

export {QuizProvider, QuizConsumer, useQuiz, QuizContext};
