import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton, Button, ButtonText} from './QuizScene.css';

export const Quiz3Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>Você considera o seu ciclo regular ?</FormText>
          <Button onPress={()=> navigation.navigate('Quiz4')}><ButtonText>Continuar</ButtonText></Button>

      </View>
    </>
  );
};
