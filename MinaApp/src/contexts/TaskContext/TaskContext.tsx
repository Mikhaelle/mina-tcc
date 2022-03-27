import React, {Context, createContext, useContext, useState} from 'react';
import {TaskService} from '../../services/TaskService/TaskService';
import {useAuth} from '../AuthContext/AuthContext';
import {PeriodPhases, usePeriod} from '../PeriodContext/PeriodContext';

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
    task.taskService.createUserTasks().then(initialTasks => {
      console.log(initialTasks);
      console.log('phase' + phase);
      if (phase === PeriodPhases.folicularInicial) {
        const tasks = initialTasks.groupTasksData.folicularInicial;
        setUserTasks(tasks);
      } else if (phase === PeriodPhases.folicularFinal) {
        const tasks = initialTasks.groupTasksData.folicularFinal;
        setUserTasks(tasks);
      } else if (phase == PeriodPhases.luteaInicial) {
        const tasks = initialTasks.groupTasksData.luteaInicial;
        setUserTasks(tasks);
      } else {
        const tasks = initialTasks.groupTasksData.luteaFinal;
        setUserTasks(tasks);
      }
    });
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
