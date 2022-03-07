import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {
  Button,
  ButtonText,
  RoundButton,
  RowContainer,
  TitleText,
  View,
} from './HomeScene.css';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';
import {BackHandler} from 'react-native';
import {usePeriod} from '../../contexts/PeriodContext/PeriodContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

export const HomeScene: React.FC = () => {
  LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan.',
      'Fev.',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul.',
      'Ago',
      'Set.',
      'Out.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sabado',
    ],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: 'Hoje',
  };
  LocaleConfig.defaultLocale = 'br';

  const navigation = useNavigation();

  const {lastPeriod, periods} = usePeriod();
  const {periodDuration} = useQuiz();

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

  var calendarDays = {};
  const daysToMark = () => {
    for (var i = 0; i < periodDuration; i++) {
      var date = new Date();
      date.setDate(lastPeriod.getDate() + i);

      const datePeriodString =
        date.getFullYear().toString() +
        '-' +
        ('0' + (date.getMonth() + 1).toString()).slice(-2) +
        '-' +
        ('0' + date.getDate().toString()).slice(-2);
      if (i === 0) {
        calendarDays[datePeriodString] = {startingDay: true, color: '#F87D6D'};
      } else if (i === periodDuration - 1) {
        calendarDays[datePeriodString] = {endingDay: true, color: '#F87D6D'};
      } else {
        calendarDays[datePeriodString] = {color: '#F87D6D'};
      }
    }
    console.log(calendarDays);
    return calendarDays;
  };

  const nextDaysToMark = () => {
    for (var i = 0; i < periodDuration; i++) {
      var date = new Date();
      date.setDate(lastPeriod.getDate() + i);

      const datePeriodString =
        date.getFullYear().toString() +
        '-' +
        ('0' + (date.getMonth() + 1).toString()).slice(-2) +
        '-' +
        ('0' + date.getDate().toString()).slice(-2);
      if (i === 0) {
        calendarDays[datePeriodString] = {startingDay: true, color: '#F87D6D'};
      } else if (i === periodDuration - 1) {
        calendarDays[datePeriodString] = {endingDay: true, color: '#F87D6D'};
      } else {
        calendarDays[datePeriodString] = {color: '#F87D6D'};
      }
    }
    console.log(calendarDays);
    return calendarDays;
  };

  return (
    <View>
      <Calendar
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMMM yyyy'}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={7}
        markingType={'period'}
        markedDates={daysToMark()}
      />
      <RowContainer>
        <TitleText>Fase: Folicular inicial</TitleText>
        <RoundButton
          style={{backgroundColor: '#F37676'}}
          onPress={() => navigation.navigate('Quiz6')}
        >
          <Icon name={'plus'} size={24} color={'white'} />
        </RoundButton>
      </RowContainer>
      <Button onPress={() => navigation.navigate('Task')}>
        <ButtonText>PREVISÃO DE HOJE</ButtonText>
        <Icon name={'right'} />
      </Button>
      <Button onPress={() => navigation.navigate('About')}>
        <ButtonText>SOBRE A FASE</ButtonText>
        <Icon name={'right'} />
      </Button>
    </View>
  );
};
