import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {
  FormText,
  View,
  ForgetButton,
  Button,
  ButtonText,
} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';

export const Quiz6Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>
          Você costuma apresentar mudança de humor no seu ciclo ?
        </FormText>
        <Button onPress={() => navigation.navigate('Quiz7')}>
          <ButtonText>Continuar</ButtonText>
        </Button>
        <Image
          source={quizImage}
          style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
        />
      </View>
    </>
  );
};
