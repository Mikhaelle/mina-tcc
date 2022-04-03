import React, {Context, createContext, useContext, useState} from 'react';
import {TaskService} from '../../services/TaskService/TaskService';
import {useAuth} from '../AuthContext/AuthContext';
import {usePeriod} from '../PeriodContext/PeriodContext';
import {useQuiz} from '../QuizContext/QuizContext';

interface ITaskContext {
  isLoadingTasks: boolean;
  userTasks: any;
  createUserTasks(): Promise<void>;
  getUserTasks(): Promise<any>;
  cleaningFeedback: string;
  createFeedback: string;
  drawFeedback: string;
  exerciseFeedback: string;
  listenFeedback: string;
  meetingsFeedback: string;
  readFeedback: string;
  socializeFeedback: string;
  studyFeedback: string;
  watchFeedback: string;
  workFeedback: string;
  writeFeedback: string;
  setCleaningFeedback: React.Dispatch<React.SetStateAction<string>>;
  setCreateFeedback: React.Dispatch<React.SetStateAction<string>>;
  setDrawFeedback: React.Dispatch<React.SetStateAction<string>>;
  setExerciseFeedback: React.Dispatch<React.SetStateAction<string>>;
  setListenFeedback: React.Dispatch<React.SetStateAction<string>>;
  setMeetingsFeedback: React.Dispatch<React.SetStateAction<string>>;
  setReadFeedback: React.Dispatch<React.SetStateAction<string>>;
  setSocializeFeedback: React.Dispatch<React.SetStateAction<string>>;
  setStudyFeedback: React.Dispatch<React.SetStateAction<string>>;
  setWatchFeedback: React.Dispatch<React.SetStateAction<string>>;
  setWorkFeedback: React.Dispatch<React.SetStateAction<string>>;
  setWriteFeedback: React.Dispatch<React.SetStateAction<string>>;
}

const TaskContext: Context<ITaskContext> = createContext(undefined as any);
const TaskConsumer = TaskContext.Consumer;
const useTask = () => useContext(TaskContext);

const TaskProvider: React.FC<{taskService: TaskService}> = props => {
  const [userTasks, setUserTasks] = useState({});
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [cleaningFeedback, setCleaningFeedback] = useState('neutral');
  const [createFeedback, setCreateFeedback] = useState('neutral');
  const [drawFeedback, setDrawFeedback] = useState('neutral');
  const [exerciseFeedback, setExerciseFeedback] = useState('neutral');
  const [listenFeedback, setListenFeedback] = useState('neutral');
  const [meetingsFeedback, setMeetingsFeedback] = useState('neutral');
  const [readFeedback, setReadFeedback] = useState('neutral');
  const [socializeFeedback, setSocializeFeedback] = useState('neutral');
  const [studyFeedback, setStudyFeedback] = useState('neutral');
  const [watchFeedback, setWatchFeedback] = useState('neutral');
  const [workFeedback, setWorkFeedback] = useState('neutral');
  const [writeFeedback, setWriteFeedback] = useState('neutral');

  const task = props;
  const {user} = useAuth();
  const {phase} = usePeriod();
  const {contraceptiveMethods, hormonalDisorder} = useQuiz();

  const createUserTasks = async () => {
    task.taskService.createUserTasks(contraceptiveMethods, hormonalDisorder);
  };

  const getUserTasks = async () => {
    task.taskService.getUserTask(phase).then(tasks => {
      setUserTasks(tasks);
      setIsLoadingTasks(false);
    });
  };

  return (
    <TaskContext.Provider
      value={{
        userTasks,
        isLoadingTasks,
        createUserTasks,
        getUserTasks,
        cleaningFeedback,
        createFeedback,
        drawFeedback,
        exerciseFeedback,
        listenFeedback,
        meetingsFeedback,
        readFeedback,
        socializeFeedback,
        studyFeedback,
        watchFeedback,
        workFeedback,
        writeFeedback,
        setCleaningFeedback,
        setCreateFeedback,
        setDrawFeedback,
        setExerciseFeedback,
        setListenFeedback,
        setMeetingsFeedback,
        setReadFeedback,
        setSocializeFeedback,
        setStudyFeedback,
        setWatchFeedback,
        setWorkFeedback,
        setWriteFeedback,
      }}
      {...props}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export {TaskProvider, TaskConsumer, useTask, TaskContext};
