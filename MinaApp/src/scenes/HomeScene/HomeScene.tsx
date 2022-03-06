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
import { BackHandler } from 'react-native';

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
      <RowContainer>
        <TitleText>Fase: Folicular inicial</TitleText>
        <RoundButton
          style={{backgroundColor: '#F37676'}}
          onPress={() => navigation.navigate('Quiz6')}
        >
          <Icon name={'plus'} size={24} color={'white'} />
        </RoundButton>
      </RowContainer>
      <Calendar
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMMM yyyy'}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={7}
        markingType={'period'}
        markedDates={{
          '2022-02-02': {startingDay: true, color: '#F87D6D'},
          '2022-02-03': {color: '#F87D6D'},
          '2022-02-04': {color: '#F87D6D'},
          '2022-02-05': {endingDay: true, color: '#F87D6D'},
          '2022-02-15': {startingDay: true, color: '#98C872'},
          '2022-02-16': {color: '#98C872'},
          '2022-02-17': {color: '#98C872'},
          '2022-02-18': {color: '#98C872'},
          '2022-02-19': {color: '#98C872'},
          '2022-02-20': {color: '#98C872'},
          '2022-02-21': {color: '#98C872'},
          '2022-02-22': {color: '#98C872', endingDay: true},
        }}
      />

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
