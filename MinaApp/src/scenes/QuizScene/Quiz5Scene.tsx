import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {
  FormText,
  View,
  ForgetButton,
  Button,
  ButtonText,
  RoundButtonContainer,
  RoundButton,
} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import Icon from 'react-native-vector-icons/AntDesign';

export const Quiz5Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>Você possui sintomas de tensão pré menstrual(TPM) ?</FormText>
        <RoundButtonContainer>
            <RoundButton style={{backgroundColor:'red'}} onPress={() => navigation.navigate('Quiz6')}>
            <Icon name={'close'} size={24} color={'white'}/>
            </RoundButton>
            <RoundButton style={{backgroundColor:'green'}} onPress={() => navigation.navigate('Quiz6')}>
            <Icon name={'check'} size={24} color={'white'}/>
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
