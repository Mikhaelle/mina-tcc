import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton, Button} from './QuizScene.css';

export const Quiz6Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
       <FormText>
          Você costuma apresentar mudança de humor no seu ciclo ?
        </FormText>
          <Button>Proximo</Button>

      </View>
    </>
  );
};
