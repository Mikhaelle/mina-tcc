import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {Image } from 'react-native';
import {FormText, View, Button, ButtonText} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import DatePicker from 'react-native-date-picker'

export const Quiz1Scene: React.FC = () => {
  const navigation = useNavigation();
    const [date, setDate] = useState(new Date())

  return (
      <View>
        <FormText>Qual a data da sua ultima menstruação ?</FormText>
          <DatePicker mode={'date'}
                      locale={'pt-BR'} date={date} onDateChange={setDate} />
          <Button onPress={()=> navigation.navigate('Quiz2')}><ButtonText>Continuar</ButtonText></Button>
          <Image source={quizImage} style={{alignSelf: 'flex-end', position:'absolute', bottom:0}} />
      </View>
  );
};
