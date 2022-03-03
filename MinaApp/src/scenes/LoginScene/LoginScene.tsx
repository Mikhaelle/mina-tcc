import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Button} from 'react-native';
import logoImage from '../../assets/icons/logo/logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';

import {
  FormText,
  View,
  FormTextInput,
  GoogleButton,
  BR,
  ForgetButton,
  LoginButton,
  NewAccountButton,
  FormView,
  ElementView,
  ForgetText,
  LoginText,
  NewAccountText,
} from './LoginScene.css';

export const LoginScene: React.FC = () => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');

  const {user, onGoogleButtonPress, login} = useAuth();
  const {userAnsweredQuiz} = useQuiz();
  const navigation = useNavigation();

  const [userIsLogIn, setUserIsLogIn] = useState(false);

  useEffect(() => {
    user ? setUserIsLogIn(true) : setUserIsLogIn(false);
  }, []);

  const navigateTo = () => {
    userAnsweredQuiz
      ? navigation.navigate('Tabnavigator')
      : navigation.navigate('Quiz');
  };

  return !userIsLogIn ? (
    <View>
      <ElementView>
        <Image source={logoImage} style={{alignSelf: 'center'}} />
        <FormView>
          <FormText>Email</FormText>
          <BR />
          <FormTextInput onChangeText={setUserEmail} value={userEmail} />
        </FormView>
        <FormView>
          <FormText>Senha</FormText>
          <BR />
          <FormTextInput
            onChangeText={setPassword}
            value={userPassword}
            secureTextEntry={true}
          />
        </FormView>
        <ForgetButton onPress={() => {}}>
          <ForgetText>Esqueceu a senha?</ForgetText>
        </ForgetButton>
        <LoginButton
          onPress={() => {
            login(userEmail, userPassword).then(navigateTo);
          }}
        >
          <LoginText>Entrar</LoginText>
        </LoginButton>
        <GoogleButton
          onPress={() => {
            onGoogleButtonPress();
          }}
        >
          <Image source={googleLogo} />
          <NewAccountText>Entrar com o Google</NewAccountText>
        </GoogleButton>
        <NewAccountButton
          onPress={() => {
            navigation.navigate('NewAccount');
          }}
        >
          <NewAccountText>Criar conta</NewAccountText>
        </NewAccountButton>
      </ElementView>
    </View>
  ) : (
    <>{navigateTo()}</>
  );
};
