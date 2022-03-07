import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {
  FormText,
  View,
  RoundButton,
  RoundButtonContainer,
} from './QuizScene.css';
import quizImage from '../../assets/images/quiz.png';
import Icon from 'react-native-vector-icons/AntDesign';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

export const Quiz7Scene: React.FC = () => {
  const navigation = useNavigation();
  const {setAnsweredQuiz, answeredQuiz, setBehaviorChange, setUserQuizInfos} =
    useQuiz();

  useEffect(() => {
    if (answeredQuiz) {
      setUserQuizInfos();
    }
  }, [answeredQuiz]);

  return (
    <>
      <View>
        <FormText>
          Você costuma apresentar alteração comportamental durante seu ciclo ?
        </FormText>
        <RoundButtonContainer>
          <RoundButton
            style={{backgroundColor: 'red'}}
            onPress={() => {
              setBehaviorChange(false),
                setAnsweredQuiz(true),
                navigation.navigate('Tabnavigator');
            }}
          >
            <Icon name={'close'} size={24} color={'white'} />
          </RoundButton>
          <RoundButton
            style={{backgroundColor: 'green'}}
            onPress={() => {
              setBehaviorChange(true),
                setAnsweredQuiz(true),
                navigation.navigate('Tabnavigator');
            }}
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
