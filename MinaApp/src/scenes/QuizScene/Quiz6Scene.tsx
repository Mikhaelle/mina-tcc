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

export const Quiz6Scene: React.FC = () => {
  const navigation = useNavigation();
  const {setHumorChange} = useQuiz();

  return (
    <>
      <View>
        <FormText>
          Você costuma apresentar mudança de humor no seu ciclo ?
        </FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setHumorChange(false), navigation.navigate('Quiz7');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setHumorChange(true), navigation.navigate('Quiz7');
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
