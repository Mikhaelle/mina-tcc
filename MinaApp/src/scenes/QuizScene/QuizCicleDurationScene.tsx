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
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

export const QuizCicleDurationScene: React.FC = () => {
  const dropdownOptions = [
    '20 dia',
    '21 dias',
    '22 dias',
    '23 dias',
    '24 dias',
    '25 dias',
    '26 dias',
    '27 dias',
    '28 dias',
    '29 dias',
    '30 dias',
    '31 dias',
    '32 dias',
    '33 dias',
    '34 dias',
    '35 dias',
  ];

  const [selected, setSelected] = useState(28);
  const navigation = useNavigation();
  const {setCicleDuration} = useQuiz();

  const icon = () => {
    return <Icon name={'down'} />;
  };

  return (
    <View>
      <FormText>Quanto tempo dura normalmente seu ciclo ?</FormText>
      <ModalDropdown
        onSelect={(idx: any, value: any) => setSelected(idx + 20)}
        options={dropdownOptions}
        style={styles.dropdown_2}
        defaultValue={dropdownOptions[8]}
        textStyle={styles.dropdown_2_text}
        renderRightComponent={icon}
      />
      <Button
        onPress={() => {
          setCicleDuration(selected), navigation.navigate('QuizRegularCicle');
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
