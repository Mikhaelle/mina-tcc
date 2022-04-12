import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Loader} from '../../components/Loader/Loader';
import {useTask} from '../../contexts/TaskContext/TaskContext';
import images from '../../managers/images';
import {
  BoxText,
  BoxView,
  ContainerTask,
  LineBoxView,
  TaskView,
  TitleText,
  View,
} from './TaskScene.css';

export const TaskScene: React.FC = () => {
  const {getUserTasks, userTasks, isLoadingTasks} = useTask();
  const [userTasksComponents, setUserTasksComponents] = useState([] as any);

  const [taskUp, setTaskUp] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getUserTasks();
    }, []),
  );

  useEffect(() => {
    if (userTasks) {
      if (userTasks.length !== 0 && !taskUp) {
        taskList();
      }
    }
  }, [userTasks]);

  const taskList = () => {
    Object.keys(userTasks).forEach(userTask => {
      const userTaskObj = userTasks[userTask];
      const newTaskComponent = (
        <ContainerTask key={userTaskObj['taskName']}>
          <TaskView>
            <Image source={images[userTask]} />
            <TitleText>{userTaskObj['taskName']}</TitleText>
            <Image source={images[userTaskObj['taskPrediction']]} />
          </TaskView>
          <LineBoxView />
        </ContainerTask>
      );

      setUserTasksComponents((userTasksComponent: any) => [
        ...userTasksComponent,
        newTaskComponent,
      ]);
      setTaskUp(true);
    });
  };

  if (isLoadingTasks) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  return (
    <>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BoxView>
            <BoxText>
              Ajude-nos a te dar uma previsão melhor. Na aba Avaliação, para
              cada tarefa selecione a opção que melhor se encaixa em como foi a
              execução da tarefa no seu dia.
            </BoxText>
          </BoxView>
          <LineBoxView />
          {userTasksComponents.length === 0 ? (
            <TitleText>
              As recomendações ainda estão sendo geradas, tente novamente daqui
              a pouco.
            </TitleText>
          ) : (
            userTasksComponents.map(
              (userTasksComponent: any) => userTasksComponent,
            )
          )}
        </ScrollView>
      </View>
    </>
  );
};
