import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FormText,
  View,
  Button,
  ButtonText,
  DropdownButton,
  DropdownText,
  ButtonDropdownText,
} from './QuizScene.css';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalDropdown from 'react-native-modal-dropdown';
import {Image, StyleSheet} from 'react-native';
import quizImage from '../../assets/images/quiz.png';

export const Quiz2Scene: React.FC = () => {
  const dropdownOptions = [
    '1 dia',
    '2 dias',
    '3 dias',
    '4 dias',
    '5 dias',
    '6 dias',
    '7 dias',
    '8 dias',
    '9 dias',
    '10 dias',
    '11 dias',
    '12 dias',
  ];

  const [selected, setSelected] = useState(dropdownOptions[4]);
  const navigation = useNavigation();

  const icon = () => {
    return <Icon name={'down'} />;
  };

  return (
    <View>
      <FormText>Quanto tempo dura normalmente sua menstruação ?</FormText>
      <ModalDropdown
        onSelect={(idx: any, value: any) => setSelected(value)}
        options={dropdownOptions}
        defaultValue={dropdownOptions[4]}
        style={styles.dropdown_2}
        textStyle={styles.dropdown_2_text}
        renderRightComponent={icon}
      />
      <Button onPress={() => navigation.navigate('Quiz3')}>
        <ButtonText>Continuar</ButtonText>
      </Button>
      <Image
        source={quizImage}
        style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown_2: {
    alignSelf: 'center',
    width: '40%',
    margin: 20,
    borderRadius: 3,
    backgroundColor: '#E0E5F8',
    padding: 15,
  },
  dropdown_2_text: {
    flex: 1,
    right: 10,
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});
