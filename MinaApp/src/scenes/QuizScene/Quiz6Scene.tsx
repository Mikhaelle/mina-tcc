import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View, ForgetButton} from './QuizScene.css';

export const Quiz1Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
       <FormText>
          Você costuma apresentar mudança de humor no seu ciclo ?
        </FormText>
        
      </View>
    </>
  );
};
