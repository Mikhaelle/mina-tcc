import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton, Button} from './QuizScene.css';

export const Quiz2Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>Quanto tempo dura normalmente sua menstruação ?</FormText>
      </View>
    </>
  );
};
