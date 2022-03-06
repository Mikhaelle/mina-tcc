import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, Image} from 'react-native';
import {FormText, View, Button, ButtonText} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import DatePicker from 'react-native-date-picker';

export const Quiz1Scene: React.FC = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View>
      <FormText>Qual a data da sua ultima menstruação ?</FormText>
      <DatePicker
        mode={'date'}
        locale={'pt-BR'}
        date={date}
        onDateChange={setDate}
      />
      <Button onPress={() => navigation.navigate('Quiz2')}>
        <ButtonText>Continuar</ButtonText>
      </Button>
      <Image
        source={quizImage}
        style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
      />
    </View>
  );
};
