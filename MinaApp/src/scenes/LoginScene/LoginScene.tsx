import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView} from 'react-native';
import logoImage from '../../assets/icons/logo/logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

import {
  FormText,
  FormTextInput,
  GoogleButton,
  ForgetButton,
  LoginButton,
  NewAccountButton,
  FormView,
  ElementView,
  ForgetText,
  LoginText,
  NewAccountText,
  ImgView,
  ErrorText,
} from './LoginScene.css';

export const LoginScene: React.FC = () => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');

  const {
    user,
    onGoogleButtonPress,
    login,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
  } = useAuth();
  const {answeredQuiz} = useQuiz();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('user: ' + user);
    if (user) {
      answeredQuiz
        ? navigation.navigate('Tabnavigator')
        : navigation.navigate('Quiz');
    }
  }, [user, answeredQuiz]);

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

        <ForgetButton onPress={() => {}}>
          <ForgetText>Esqueceu a senha?</ForgetText>
        </ForgetButton>

        <LoginButton
          onPress={() => {
            login(userEmail, userPassword);
          }}
        >
          <LoginText>Entrar</LoginText>
        </LoginButton>

        <GoogleButton
          onPress={() => {
            onGoogleButtonPress();
          }}
        >
          <Image
            source={googleLogo}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <NewAccountText>Entrar com o Google</NewAccountText>
        </GoogleButton>

        <NewAccountButton
          onPress={() => {
            navigation.navigate('NewAccount');
          }}
        >
          <NewAccountText>Criar conta</NewAccountText>
        </NewAccountButton>
      </ScrollView>
    </ElementView>
  );
};
