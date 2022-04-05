import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import quizImage from '../../assets/images/quiz.png';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import {useTask} from '../../contexts/TaskContext/TaskContext';
import {
  FormText,
  RoundButton,
  RoundButtonContainer,
  View,
} from './QuizScene.css';

export const QuizTpmSymptomsScene: React.FC = () => {
  const navigation = useNavigation();
  const {setTpmSymptoms, setUserQuizInfos, answeredQuiz, setAnsweredQuiz} =
    useQuiz();
  const {createUserTasks} = useTask();

  useEffect(() => {
    if (answeredQuiz) {
      setUserQuizInfos();
    }
  }, [answeredQuiz]);

  return (
    <>
      <View>
        <FormText>Você possui sintomas de tensão pré menstrual(TPM) ?</FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setTpmSymptoms(false), setAnsweredQuiz(true), createUserTasks();
              navigation.navigate('Tabnavigator');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setTpmSymptoms(false), setAnsweredQuiz(true), createUserTasks();
              navigation.navigate('Tabnavigator');
            }}
          >
            <Icon name={'check'} size={24} color={'white'} />
          </RoundButton>
        </RoundButtonContainer>

        <Image
          source={quizImage}
          style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
        />
      </View>
    </>
  );
};
