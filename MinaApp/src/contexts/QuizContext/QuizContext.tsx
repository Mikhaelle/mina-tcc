import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {QuizService} from '../../services/QuizService/quizService';
import {useAuth} from '../AuthContext/AuthContext';

interface IQuizContext {
  answeredQuiz: boolean;
  setAnsweredQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  lastPeriod: Date;
  setLastPeriod: React.Dispatch<React.SetStateAction<any>>;
  periodDuration: number;
  setPeriodDuration: React.Dispatch<React.SetStateAction<number>>;
  cicleDuration: number;
  setCicleDuration: React.Dispatch<React.SetStateAction<number>>;
  regularCicle: boolean;
  setRegularCicle: React.Dispatch<React.SetStateAction<boolean>>;
  contraceptiveMethods: boolean;
  setContraceptiveMethods: React.Dispatch<React.SetStateAction<boolean>>;
  tpmSymptoms: boolean;
  setTpmSymptoms: React.Dispatch<React.SetStateAction<boolean>>;
  hormonalDisorder: boolean;
  setHormonalDisorder: React.Dispatch<React.SetStateAction<boolean>>;
  setUserQuizInfos(): Promise<void>;
  quizLoading: boolean;
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
  const [cicleDuration, setCicleDuration] = useState(28);
  const [regularCicle, setRegularCicle] = useState(false);
  const [contraceptiveMethods, setContraceptiveMethods] = useState(false);
  const [tpmSymptoms, setTpmSymptoms] = useState(false);
  const [hormonalDisorder, setHormonalDisorder] = useState(false);
  const [quizLoading, setQuizLoading] = useState(true);

  useEffect(() => {
    if (user != null) {
      console.log('oxe');
      quizService.quiz.getUserQuizInfos().then(userQuiz => {
        console.log(userQuiz);
        if (userQuiz) {
          if (userQuiz.isAnswered) {
            console.log('aqui');
            var date = new Date(userQuiz.lastPeriod);
            setLastPeriod(date);
            setAnsweredQuiz(userQuiz.isAnswered);
            setCicleDuration(userQuiz.cicleDuration);
            setRegularCicle(userQuiz.regularCicle);
            setContraceptiveMethods(userQuiz.contraceptiveMethods);
            setHormonalDisorder(userQuiz.hormonalDisorder);
            setTpmSymptoms(userQuiz.tpmSymptoms);
          }
        } else {
          setAnsweredQuiz(false);
        }
        setQuizLoading(false);
      });
    }
  }, [user]);

  const setUserQuizInfos = async () => {
    quizService.quiz.setUserQuizInfo(
      user.uid,
      answeredQuiz,
      lastPeriod,
      periodDuration,
      cicleDuration,
      regularCicle,
      contraceptiveMethods,
      tpmSymptoms,
      hormonalDisorder,
    );
    setQuizLoading(false);
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
        cicleDuration,
        setCicleDuration,
        regularCicle,
        setRegularCicle,
        contraceptiveMethods,
        setContraceptiveMethods,
        tpmSymptoms,
        setTpmSymptoms,
        hormonalDisorder,
        setHormonalDisorder,
        setUserQuizInfos,
        quizLoading,
      }}
      {...props}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

export {QuizProvider, QuizConsumer, useQuiz, QuizContext};
