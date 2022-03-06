import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {FormText, LoginButton, LoginText, View} from './ProfileScene.css';

export const ProfileScene: React.FC = () => {
  const navigation = useNavigation();
  const {logout} = useAuth();

  return (
    <View>
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
