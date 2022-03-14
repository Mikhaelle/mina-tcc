import React, {createContext, useContext, Context, useState} from 'react';
import {TaskService} from '../../services/TaskService/TaskService';
import {useAuth} from '../AuthContext/AuthContext';

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

  const createUserTasks = async () => {
    task.taskService.createUserTasks(user.uid);
  };

  const getUserTasks = async () => {
    setIsLoadingTasks(true);
    task.taskService.getUserTask(user.uid).then(tasks => {
      setUserTasks(tasks.tasks);
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
      }}
      {...props}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export {TaskProvider, TaskConsumer, useTask, TaskContext};
