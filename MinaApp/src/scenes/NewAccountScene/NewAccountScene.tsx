import React, {useEffect} from 'react';
import {Image, Button, ScrollView} from 'react-native';
import logoImage from '../../assets/icons/logo/logo.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {
  FormText,
  View,
  FormTextInput,
  BR,
  LoginButton,
  FormView,
  ElementView,
  LoginText,
} from './NewAccountScene.css';
import {useNavigation} from '@react-navigation/native';
import {ErrorText, ImgView} from '../LoginScene/LoginScene.css';
import { useQuiz } from '../../contexts/QuizContext/QuizContext';

export const NewAccountScene: React.FC = () => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [checkEqualPassword, setCheckEqualPassword] = React.useState(true);
  const {
    user,
    createAccount,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
  } = useAuth();
  const {userAnsweredQuiz} = useQuiz();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('user: ' + user);
    if (user) {
      userAnsweredQuiz
        ? navigation.navigate('Tabnavigator')
        : navigation.navigate('Quiz');
    }
  }, []);

  return (
    <ElementView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImgView>
          <Image source={logoImage} style={{alignSelf: 'center'}} />
        </ImgView>

        <FormView>
          <FormText>Email</FormText>
          <FormTextInput
            onChangeText={value => {
              setUserEmail(value), setEmailError('');
            }}
            value={userEmail}
          />
          {emailError ? <ErrorText>{emailError}</ErrorText> : null}
        </FormView>

        <FormView>
          <FormText>Senha</FormText>
          <FormTextInput
            onChangeText={value => {
              setPassword(value), setPasswordError('');
            }}
            value={userPassword}
            secureTextEntry={true}
          />
          {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
        </FormView>

        <LoginButton
          onPress={() => {
            createAccount(userEmail, userPassword);
          }}
        >
          <LoginText>Criar conta</LoginText>
        </LoginButton>
      </ScrollView>
    </ElementView>
  );
};
