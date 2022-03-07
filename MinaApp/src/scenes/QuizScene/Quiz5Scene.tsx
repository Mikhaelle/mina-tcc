import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {
  FormText,
  View,
  RoundButtonContainer,
  RoundButton,
} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import Icon from 'react-native-vector-icons/AntDesign';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

export const Quiz5Scene: React.FC = () => {
  const navigation = useNavigation();
  const {setTpmSymptoms} = useQuiz();

  return (
    <>
      <View>
        <FormText>Você possui sintomas de tensão pré menstrual(TPM) ?</FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setTpmSymptoms(false), navigation.navigate('Quiz6');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setTpmSymptoms(true), navigation.navigate('Quiz6');
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
