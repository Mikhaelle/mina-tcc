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

export const Quiz7Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>
          Você costuma apresentar alteração comportamental durante seu ciclo ?
        </FormText>
        <Button onPress={() => navigation.navigate('Tabnavigator')}>
          <ButtonText>Finalizar</ButtonText>
        </Button>
        <Image
          source={quizImage}
          style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
        />
      </View>
    </>
  );
};
