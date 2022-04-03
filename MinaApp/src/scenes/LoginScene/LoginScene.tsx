import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, ScrollView} from 'react-native';
import logoImage from '../../assets/icons/logo/logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {
  ElementView,
  ErrorText,
  ForgetButton,
  ForgetText,
  FormText,
  FormTextInput,
  FormView,
  GoogleButton,
  ImgView,
  LoginButton,
  LoginText,
  NewAccountButton,
  NewAccountText,
  NewView,
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
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigation.navigate('Tabnavigator');
    }
  }, [user]);

  return (
    <ElementView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewView>
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

          <ForgetButton
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
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
        </NewView>
      </ScrollView>
    </ElementView>
  );
};
