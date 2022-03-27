import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import quizImage from '../../assets/images/quiz.png';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import {
  FormText,
  RoundButton,
  RoundButtonContainer,
  View,
} from './QuizScene.css';

export const QuizHormonalDisorderScene: React.FC = () => {
  const navigation = useNavigation();
  const {setAnsweredQuiz, setHormonalDisorder} = useQuiz();

  return (
    <>
      <View>
        <FormText>
          Você tem algum distúrbio endócrino como ovários policísticos? ou
          outros ?
        </FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setHormonalDisorder(false),
                navigation.navigate('QuizTpmSymptoms');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setHormonalDisorder(true), navigation.navigate('QuizTpmSymptoms');
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
