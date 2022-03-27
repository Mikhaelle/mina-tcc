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

export const QuizHormonalContraceptivesScene: React.FC = () => {
  const navigation = useNavigation();
  const {setContraceptiveMethods} = useQuiz();

  return (
    <>
      <View>
        <FormText>Você utiliza metodos contraceptivos hormonais ?</FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setContraceptiveMethods(false),
                navigation.navigate('QuizHormonalDisorder');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setContraceptiveMethods(true),
                navigation.navigate('QuizHormonalDisorder');
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
