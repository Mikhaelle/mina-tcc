import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {
  Button,
  ButtonText,
  RoundButton,
  RowContainer,
  TitleText,
  View,
  AlertText,
} from './HomeScene.css';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';
import {Alert, BackHandler, Modal} from 'react-native';
import {usePeriod} from '../../contexts/PeriodContext/PeriodContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import DatePicker from 'react-native-date-picker';

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
  const {isLoading, daysOfPeriods, daysToMark, phase, phaseToSet} = usePeriod();
  const {quizLoading} = useQuiz();

  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!quizLoading) {
        daysToMark();
        phaseToSet();
      }
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [quizLoading]),
  );

  return (
    <View>
      {!isLoading ? (
        <>
          <Calendar
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={7}
            markingType={'period'}
            markedDates={daysOfPeriods}
          />
          <RowContainer>
            <TitleText>Fase: {phase}</TitleText>
            <RoundButton
              style={{backgroundColor: '#F37676'}}
              onPress={() => {
                setModalVisible(true);
              }}
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <AlertText>Opa</AlertText>
          </Modal>
        </>
      ) : null}
    </View>
  );
};
