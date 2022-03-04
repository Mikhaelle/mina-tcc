import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {FormText, View, Button, ButtonText, DropdownButton, DropdownText, ButtonDropdownText} from './QuizScene.css';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalDropdown from 'react-native-modal-dropdown';


export const Quiz2Scene: React.FC = () => {
    const dropdownOptions = ['1 dia', '2 dias', '3 dias', '4 dias', '5 dias', '6 dias', '7 dias', '8 dias', '9 dias', '10 dias', '11 dias', '12 dias'];

    const navigation = useNavigation();



  return (

      <View>
        <FormText>Quanto tempo dura normalmente sua menstruação ?</FormText>
          <ModalDropdown options={dropdownOptions}/>
          <Button onPress={()=> navigation.navigate('Quiz3')}><ButtonText>Continuar</ButtonText></Button>
      </View>
  );
};
