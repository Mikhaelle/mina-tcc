import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, ScrollView} from 'react-native';
import logoImage from '../../assets/icons/logo/logo.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {useQuiz} from '../../contexts/QuizContext/QuizContext';
import {ErrorText, ImgView} from '../LoginScene/LoginScene.css';
import {
  ElementView,
  FormText,
  FormTextInput,
  FormView,
  LoginButton,
  LoginText,
} from './NewAccountScene.css';

export const NewAccountScene: React.FC = () => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');

  const {
    user,
    createAccount,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
  } = useAuth();
  const {answeredQuiz} = useQuiz();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      answeredQuiz
        ? navigation.navigate('Tabnavigator')
        : navigation.navigate('Quiz');
    }
  }, [user]);

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
          <FormText>Nome de usuário</FormText>
          <FormTextInput
            onChangeText={value => {
              setDisplayName(value);
            }}
            value={displayName}
          />
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
            createAccount(userEmail, userPassword, displayName);
          }}
        >
          <LoginText>Criar conta</LoginText>
        </LoginButton>
      </ScrollView>
    </ElementView>
  );
};
