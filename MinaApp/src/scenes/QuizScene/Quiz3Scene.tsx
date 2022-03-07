import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FormText,
  View,
  RoundButton,
  RoundButtonContainer,
} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

export const Quiz3Scene: React.FC = () => {
  const navigation = useNavigation();
  const {setRegularCicle} = useQuiz();

  return (
    <>
      <View>
        <FormText>Você considera o seu ciclo regular ?</FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setRegularCicle(false), navigation.navigate('Quiz4');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setRegularCicle(true), navigation.navigate('Quiz4');
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
