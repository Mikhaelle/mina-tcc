import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {Loader} from '../../components/Loader/Loader';
import {usePeriod} from '../../contexts/PeriodContext/PeriodContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import {
  AlertText,
  Button,
  ButtonText,
  CancelModalButton,
  CenteredModalView,
  ModalButton,
  ModalButtonText,
  ModalView,
  RoundButton,
  RowContainer,
  TitleText,
  View,
} from './HomeScene.css';

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
  const {isLoading, daysOfPeriods, getUserPeriods, phase} = usePeriod();

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const {answeredQuiz, quizLoading} = useQuiz();

  const {setUserPeriods} = usePeriod();
  var today = new Date();

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

  useEffect(() => {
    if (!answeredQuiz && !quizLoading) {
      navigation.navigate('Quiz');
    }
  }, [answeredQuiz, quizLoading]);

  useEffect(() => {
    if (!quizLoading) {
      getUserPeriods();
    }
  }, [quizLoading]);

  if (quizLoading || isLoading) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  return (
    <View>
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
      <Modal isVisible={modalVisible}>
        <CenteredModalView>
          <ModalView>
            <AlertText>
              Adicione uma nova data para iniciar um novo ciclo.
            </AlertText>
            <DatePicker
              mode={'date'}
              locale={'pt-BR'}
              date={date}
              onDateChange={setDate}
              maximumDate={new Date()}
            />
            <RowContainer>
              <CancelModalButton
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <ModalButtonText>Cancelar</ModalButtonText>
              </CancelModalButton>
              <ModalButton
                onPress={() => {
                  setModalVisible(false), setUserPeriods(date);
                }}
              >
                <ModalButtonText>Adicionar</ModalButtonText>
              </ModalButton>
            </RowContainer>
          </ModalView>
        </CenteredModalView>
      </Modal>
    </View>
  );
};
