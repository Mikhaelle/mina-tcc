import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton, Button} from './QuizScene.css';

export const Quiz4Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
       
        <FormText>Você utiliza metodos contraceptivos hormonais ?</FormText>
          <Button>Proximo</Button>

      </View>
    </>
  );
};
