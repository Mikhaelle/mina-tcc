import React from 'react';
import {Image, ScrollView} from 'react-native';
import logoImage from '../../assets/icons/logo/logo.png';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {ImgView} from '../LoginScene/LoginScene.css';
import {
  ElementView,
  FormText,
  FormTextInput,
  FormView,
  LoginButton,
  LoginText,
} from './ForgotPasswordScene.css';

export const ForgotPasswordScene: React.FC = () => {
  const [userEmail, setUserEmail] = React.useState('');

  const {user, resetPassword} = useAuth();

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
              setUserEmail(value);
            }}
            value={userEmail}
          />
        </FormView>

        <LoginButton
          onPress={() => {
            resetPassword(userEmail);
          }}
        >
          <LoginText>Enviar email</LoginText>
        </LoginButton>
      </ScrollView>
    </ElementView>
  );
};
