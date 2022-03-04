import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton, Button} from './QuizScene.css';

export const Quiz5Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
     <FormText>Você possui sintomas de tensão pré menstrual(TPM) ?</FormText>
          <Button>Proximo</Button>

      </View>
    </>
  );
};
