import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import * as theme from '../../assets/variables.css';
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
} from './TaskScene.css';

export const TaskScene: React.FC = () => {
  var radio_props = [
    {label: 'mais difícil', value: 0},
    {label: 'neutro', value: 1},
    {label: 'mais fácil', value: 2},
  ];

  const {getUserTasks, userTasks} = useTask();
  const [userTasksComponents, setUserTasksComponents] = useState([] as any);

  const [taskUp, setTaskUp] = useState(false);
  const [cleaningFeedback, setCleaningFeedback] = useState('0');
  const [createFeedback, setCreateFeedback] = useState('0');
  const [drawFeedback, setDrawFeedback] = useState('0');
  const [exerciseFeedback, setExerciseFeedback] = useState('0');
  const [listenFeedback, setListenFeedback] = useState('0');
  const [meetingsFeedback, setMeetingsFeedback] = useState('0');
  const [readFeedback, setReadFeedback] = useState('0');
  const [socializeFeedback, setSocializeFeedback] = useState('0');
  const [studyFeedback, setStudyFeedback] = useState('0');
  const [watchFeedback, setWatchFeedback] = useState('0');
  const [workFeedback, setWorkFeedback] = useState('0');
  const [writeFeedback, setWriteFeedback] = useState('0');

  useEffect(() => {
    getUserTasks();
  }, []);

  useEffect(() => {
    console.log(userTasks)
    if (userTasks.length !== 0 && !taskUp) {
      taskList();
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
          <RadioForm
            formHorizontal={true}
            radio_props={radio_props}
            initial={1}
            selectedButtonColor={theme.TERTIARY_COLOR}
            buttonColor={theme.GRAY_COLOR_800}
            onPress={value => {
              switch (userTaskObj['taskName']) {
                case 'Faxinar':
                  setCleaningFeedback(value);
                  break;
                case 'Criar':
                  setCreateFeedback(value);
                  break;
                case 'Desenhar':
                  setDrawFeedback(value);
                  break;
                case 'Exercitar':
                  setExerciseFeedback(value);
                  break;
                case 'Ouvir música':
                  setListenFeedback(value);
                  break;
                case 'Fazer reuniões':
                  setMeetingsFeedback(value);
                  break;
                case 'Ler':
                  setReadFeedback(value);
                  break;
                case 'Socializar':
                  setSocializeFeedback(value);
                  break;
                case 'Estudar':
                  setStudyFeedback(value);
                  break;
                case 'Assisti séries/tv':
                  setWatchFeedback(value);
                  break;
                case 'Trabalhar':
                  setWorkFeedback(value);
                  break;
                case 'Escrever':
                  setWriteFeedback(value);
                  break;
                default:
              }
            }}
            radioStyle={{paddingBottom: 25, paddingRight: 10}}
          />
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

          {userTasksComponents.map(
            (userTasksComponent: any) => userTasksComponent,
          )}
          <Button onPress={() => {}}>
            <ButtonText>Enviar</ButtonText>
          </Button>
        </ScrollView>
      </View>
    </>
  );
};
