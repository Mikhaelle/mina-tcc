import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Image, Button} from 'react-native'
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import {FormText, View, FormTextInput,GoogleButton,BR, ForgetButton, LoginButton, NewAccountButton,FormView, ElementView,ForgetText, LoginText,NewAccountText} from './HomeScene.css'
import {Calendar, LocaleConfig} from 'react-native-calendars';

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
      'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'br';

    const { user,onGoogleButtonPress, logout } = useAuth();
    const navigation = useNavigation();

  return (
      <View>
        <Calendar
                  style={{ flex: 3, width: ("100%"), height: ("100%") }}

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
          '2022-02-22': {color: '#98C872', endingDay: true}

        }} style={{width:'400px'}}
        />
              <LoginButton onPress={() => {logout()}}><LoginText>Sair</LoginText></LoginButton>
        
        </View>
  );
};
