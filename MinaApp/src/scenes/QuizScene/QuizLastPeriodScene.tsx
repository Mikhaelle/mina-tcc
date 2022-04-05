import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {BackHandler, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import quizImage from '../../assets/images/quiz.png';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import {Button, ButtonText, FormText, View} from './QuizScene.css';

export const QuizLastPeriodScene: React.FC = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const route = useRoute();
  const {setLastPeriod} = useQuiz();

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
      <Button
        onPress={() => {
          setLastPeriod({date}), navigation.navigate('QuizPeriodDuration');
        }}
      >
        <ButtonText>Continuar</ButtonText>
      </Button>
      <Image
        source={quizImage}
        style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
      />
    </View>
  );
};
