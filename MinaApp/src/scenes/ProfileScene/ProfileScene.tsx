import React from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import profileImage from '../../assets/images/profile.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import {
  LineBoxView,
  LoginButton,
  LoginText,
  NameText,
  ProfileView,
  QuizButton,
  QuizButtonText,
  View,
} from './ProfileScene.css';

export const ProfileScene: React.FC = () => {
  const {logout} = useAuth();
  const {user} = useAuth();
  const {setAnsweredQuiz} = useQuiz();

  return (
    <View>
      <ProfileView>
        <Image
          source={profileImage}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
          }}
        ></Image>
        <NameText>{user?.displayName}</NameText>
      </ProfileView>
      <LineBoxView style={{marginTop: 20}} />
      <QuizButton
        onPress={() => {
          setAnsweredQuiz(false);
        }}
      >
        <Icon name={'solution1'} size={24} style={{alignSelf: 'center'}} />
        <QuizButtonText>Refazer Questionário</QuizButtonText>
      </QuizButton>
      <LineBoxView style={{marginBottom: 20}} />
      <LoginButton
        onPress={() => {
          logout();
        }}
      >
        <LoginText>Sair</LoginText>
      </LoginButton>
    </View>
  );
};
