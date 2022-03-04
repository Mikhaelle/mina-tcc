import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton, Button} from './QuizScene.css';

export const Quiz7Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>
          Você costuma apresentar alteração comportamental durante seu ciclo ?
        </FormText>
          <Button>Proximo</Button>

      </View>
    </>
  );
};
