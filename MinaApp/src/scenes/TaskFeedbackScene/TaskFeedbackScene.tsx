import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import * as theme from '../../assets/variables.css';
import { Loader } from '../../components/Loader/Loader';
import { useTask } from '../../contexts/TaskContext/TaskContext';
import images from '../../managers/images';
import {
  BoxText,
  BoxView,
  Button,
  ButtonText,
  ContainerTask,
  LineBoxView,
  TaskView,
  TitleText,
  View
} from './TaskFeedbackScene.css';

export const TaskFeedbackScene: React.FC = () => {
  var radio_props = [
    {label: 'mais difícil', value: 'difficult'},
    {label: 'neutro', value: 'neutral'},
    {label: 'mais fácil', value: 'easy'},
  ];

  const {
    getUserTasks,
    userTasks,
    isLoadingTasks,
    sendFeedback,
    isSendingFeedback,
  } = useTask();
  const [userTasksComponents, setUserTasksComponents] = useState([] as any);

  const [taskUp, setTaskUp] = useState(false);
  const [userFeebacks, setUserFeebacks] = useState([] as any);

  const [cleaningFeedback, setCleaningFeedback] = useState({
    taskName: 'cleaning',
    taskVote: 'neutral',
  });
  const [createFeedback, setCreateFeedback] = useState({
    taskName: 'create',
    taskVote: 'neutral',
  });
  const [drawFeedback, setDrawFeedback] = useState({
    taskName: 'draw',
    taskVote: 'neutral',
  });
  const [exerciseFeedback, setExerciseFeedback] = useState({
    taskName: 'exercise',
    taskVote: 'neutral',
  });
  const [listenFeedback, setListenFeedback] = useState({
    taskName: 'listen',
    taskVote: 'neutral',
  });
  const [meetingsFeedback, setMeetingsFeedback] = useState({
    taskName: 'meetings',
    taskVote: 'neutral',
  });
  const [readFeedback, setReadFeedback] = useState({
    taskName: 'read',
    taskVote: 'neutral',
  });
  const [socializeFeedback, setSocializeFeedback] = useState({
    taskName: 'socialize',
    taskVote: 'neutral',
  });
  const [studyFeedback, setStudyFeedback] = useState({
    taskName: 'study',
    taskVote: 'neutral',
  });
  const [watchFeedback, setWatchFeedback] = useState({
    taskName: 'watch',
    taskVote: 'neutral',
  });
  const [workFeedback, setWorkFeedback] = useState({
    taskName: 'work',
    taskVote: 'neutral',
  });
  const [writeFeedback, setWriteFeedback] = useState({
    taskName: 'write',
    taskVote: 'neutral',
  });

  useEffect(() => {
    getUserTasks();
  }, []);

  useEffect(() => {
    if (userTasks) {
      if (userTasks.length !== 0 && !taskUp) {
        taskList();
      }
    }
  }, [userTasks]);

  useEffect(() => {
    if (userFeebacks.length == 12) {
      sendFeedback(userFeebacks);
    }
  }, [userFeebacks]);

  const createFeedbackArray = () => {
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      cleaningFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      createFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      drawFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      exerciseFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      listenFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      meetingsFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      readFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      socializeFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      studyFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      watchFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      workFeedback,
    ]);
    setUserFeebacks((oldUserFeedbacks: any) => [
      ...oldUserFeedbacks,
      writeFeedback,
    ]);
  };

  const taskList = () => {
    Object.keys(userTasks).forEach(userTask => {
      const userTaskObj = userTasks[userTask];
      const newTaskComponent = (
        <ContainerTask key={userTaskObj['taskName']}>
          <TitleText>{userTaskObj['taskName']}</TitleText>
          <TaskView>
            <Image source={images[userTask]} />
            <RadioForm
              formHorizontal={true}
              radio_props={radio_props}
              initial={1}
              selectedButtonColor={theme.TERTIARY_COLOR}
              buttonColor={theme.GRAY_COLOR_800}
              onPress={value => {
                switch (userTaskObj['taskName']) {
                  case 'Faxinar':
                    setCleaningFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Criar':
                    setCreateFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Desenhar':
                    setDrawFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Exercitar':
                    setExerciseFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Ouvir música':
                    setListenFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Fazer reuniões':
                    setMeetingsFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Ler':
                    setReadFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Socializar':
                    setSocializeFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Estudar':
                    setStudyFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Assisti séries/tv':
                    setWatchFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Trabalhar':
                    setWorkFeedback({taskName: userTask, taskVote: value});
                    break;
                  case 'Escrever':
                    setWriteFeedback({taskName: userTask, taskVote: value});
                    break;
                  default:
                }
              }}
              radioStyle={{paddingBottom: 25, paddingRight: 5}}
            />
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
              Ajude-nos a te dar uma previsão melhor. Para cada tarefa selecione
              a opção que melhor se encaixa em como foi a execução da tarefa no
              seu dia e nos envie um feedback.
            </BoxText>
          </BoxView>
          <LineBoxView />
          {userTasksComponents.length === 0 ? (
            <TitleText>
              As recomendações ainda estão sendo geradas, tente novamente daqui
              a pouco.
            </TitleText>
          ) : (
            <>
              {userTasksComponents.map(
                (userTasksComponent: any) => userTasksComponent,
              )}
              <Button
                onPress={() => {
                  createFeedbackArray();
                }}
                disabled={isSendingFeedback}
              >
                <ButtonText>Enviar</ButtonText>
              </Button>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};
