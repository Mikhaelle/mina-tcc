import React, {useEffect} from 'react';
import {Image, Button} from 'react-native';
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

export const NewAccountScene: React.FC = () => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [checkEqualPassword, setCheckEqualPassword] = React.useState(true);
  const {createAccount} = useAuth();

  const equalPassword = (text: string) => {
    setConfirmPassword(text);
    if (userPassword !== confirmPassword) {
      setCheckEqualPassword(false);
    } else {
      setCheckEqualPassword(true);
    }
  };

  return (
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
        <FormView>
          <FormText>Confirmar Senha</FormText>
          <BR />
          <FormTextInput
            onChangeText={text => {
              equalPassword(text);
            }}
            value={confirmPassword}
            secureTextEntry={true}
          />
          {!checkEqualPassword && <FormText>Senhas não coincidem</FormText>}
        </FormView>
        <LoginButton
          onPress={() => {
            createAccount(userEmail, userPassword);
          }}
        >
          <LoginText>Criar conta</LoginText>
        </LoginButton>
      </ElementView>
    </View>
  );
};
