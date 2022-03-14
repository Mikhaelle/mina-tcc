import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTask} from '../../contexts/TaskContext/TaskContext';
import {
  BoxText,
  BoxView,
  LineBoxView,
  TaskButton,
  TaskView,
  TitleText,
  View,
} from './TaskScene.css';
import images from '../../managers/images'

export const TaskScene: React.FC = () => {
  const navigation = useNavigation();

  const {getUserTasks, userTasks} = useTask();
  const [userTasksComponents, setUserTasksComponents] = useState([] as any);

  useEffect(() => {
    getUserTasks();
  }, []);

  useEffect(() => {
    if (userTasks.length !== 0) {
      taskList();
    }
  }, [userTasks]);

  const taskList = () => {
    Object.keys(userTasks).forEach(userTask => {
      const userTaskObj = userTasks[userTask];
      const newTaskComponent = (
        <>
        <TaskView>
          <TaskButton>
            <Image source={images[userTask]} />
          </TaskButton>
          <TitleText>{userTaskObj['taskName']}</TitleText>
          <Image source={images[userTaskObj['taskPrediction']]} /></TaskView>
        </>
      );

      setUserTasksComponents((userTasksComponent: any) => [
        ...userTasksComponent,
        newTaskComponent,
      ]);
      userTasksComponents.push();
    });
  };

  return (
    <>
      <View>
        <BoxView>
          <BoxText>
            Ajude-nos a te dar uma previsão melhor. Selecione o icone das previsões de
            tarefas corrretas
          </BoxText>
        </BoxView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleText>Tarefas</TitleText>
          <LineBoxView />
          
            {userTasksComponents.map(
              (userTasksComponent: any) => userTasksComponent,
            )}
        </ScrollView>
      </View>
    </>
  );
};
