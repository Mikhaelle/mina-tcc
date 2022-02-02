import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Image, Button} from 'react-native'
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import {FormText, View, FormTextInput,GoogleButton,BR, ForgetButton, LoginButton, NewAccountButton,FormView, ElementView,ForgetText, LoginText,NewAccountText} from './HomeScene.css'

export const HomeScene: React.FC = () => {

    const { user,onGoogleButtonPress, logout } = useAuth();
    const navigation = useNavigation();

  return (
      <View>
              <LoginButton onPress={() => {logout()}}><LoginText>Sair</LoginText></LoginButton>
        
        </View>
  );
};
