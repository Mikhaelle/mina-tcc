import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {
  FormText,
  View,
  RoundButtonContainer,
  RoundButton,
} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import Icon from 'react-native-vector-icons/AntDesign';

export const Quiz4Scene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <FormText>Você utiliza metodos contraceptivos hormonais ?</FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => navigation.navigate('Quiz5')}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => navigation.navigate('Quiz5')}
          >
            <Icon name={'check'} size={24} color={'white'} />
          </RoundButton>
        </RoundButtonContainer>

        <Image
          source={quizImage}
          style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0}}
        />
      </View>
    </>
  );
};
