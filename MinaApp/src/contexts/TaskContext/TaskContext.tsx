import React, { Context, createContext, useContext, useState } from 'react';
import { TaskService } from '../../services/TaskService/TaskService';
import { useAuth } from '../AuthContext/AuthContext';
import { usePeriod } from '../PeriodContext/PeriodContext';

interface ITaskContext {
  isLoadingTasks: boolean;
  userTasks: any;
  createUserTasks(): Promise<void>;
  getUserTasks(): Promise<any>;
}

const TaskContext: Context<ITaskContext> = createContext(undefined as any);
const TaskConsumer = TaskContext.Consumer;
const useTask = () => useContext(TaskContext);

const TaskProvider: React.FC<{taskService: TaskService}> = props => {
  const [userTasks, setUserTasks] = useState({});
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const task = props;
  const {user} = useAuth();
  const {phase} = usePeriod();

  const createUserTasks = async () => {
    task.taskService.createUserTasks();
  };

  const getUserTasks = async () => {
    setIsLoadingTasks(true);
    console.log('aqqqqquiiiii')
    task.taskService.getUserTask(phase).then(tasks => {
      console.log(tasks)
      setUserTasks(tasks);
    });
  };

  return (
    <TaskContext.Provider
      value={{
        userTasks,
        isLoadingTasks,
        createUserTasks,
        getUserTasks,
      }}
      {...props}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskConsumer, useTask, TaskContext };

