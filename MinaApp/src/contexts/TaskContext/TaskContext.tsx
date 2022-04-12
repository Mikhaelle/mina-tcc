import {useNavigation} from '@react-navigation/native';
import React, {Context, createContext, useContext, useState} from 'react';
import {Alert} from 'react-native';
import {TaskService} from '../../services/TaskService/TaskService';
import {usePeriod} from '../PeriodContext/PeriodContext';
import {useQuiz} from '../QuizContext/QuizContext';

interface ITaskContext {
  isLoadingTasks: boolean;
  isSendingFeedback: boolean;
  userTasks: any;
  lastFeedback: any;
  createUserTasks(): Promise<void>;
  getUserTasks(): Promise<any>;
  sendFeedback(feedbacks: any): Promise<void>;
}

const TaskContext: Context<ITaskContext> = createContext(undefined as any);
const TaskConsumer = TaskContext.Consumer;
const useTask = () => useContext(TaskContext);

const TaskProvider: React.FC<{taskService: TaskService}> = props => {
  const [userTasks, setUserTasks] = useState({});
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const [lastFeedback, setLastFeedback] = useState();
  const navigation = useNavigation();

  const task = props;
  const {phase} = usePeriod();
  const {contraceptiveMethods, hormonalDisorder} = useQuiz();

  const createUserTasks = async () => {
    task.taskService.createUserTasks(contraceptiveMethods, hormonalDisorder);
  };

  const getUserTasks = async () => {
    setIsLoadingTasks(true);

    task.taskService.getUserTask(phase).then(tasks => {
      setUserTasks(tasks);
      setIsLoadingTasks(false);
    });
  };

  const sendFeedback = async (feedbacks: any) => {
    setIsSendingFeedback(true);
    console.log('enviar feedbak');
    task.taskService.sendUserFeedback(phase, feedbacks).then(() => {
      Alert.alert(
        'Avaliação enviada',
        'Recebemos a sua avaliação e iremos calibrar nossas recomendações. Obrigada, sua opinião é muito importante e ajudará outras pessoas.',
        [
          {
            text: 'Entendi',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ],
        {cancelable: false},
      );
      setIsSendingFeedback(false);
    });
  };

  return (
    <TaskContext.Provider
      value={{
        userTasks,
        isLoadingTasks,
        createUserTasks,
        getUserTasks,
        sendFeedback,
        lastFeedback,
        isSendingFeedback,
      }}
      {...props}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export {TaskProvider, TaskConsumer, useTask, TaskContext};
