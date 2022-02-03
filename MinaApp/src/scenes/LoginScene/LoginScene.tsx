import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Image, Button} from 'react-native'
import logoImage from '../../assets/icons/logo/logo.png'
import googleLogo from '../../assets/images/google-logo.png'
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import {FormText, View, FormTextInput,GoogleButton,BR, ForgetButton, LoginButton, NewAccountButton,FormView, ElementView,ForgetText, LoginText,NewAccountText} from './LoginScene.css'

export const LoginScene: React.FC = () => {
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setPassword] = React.useState("");

    const { user,onGoogleButtonPress, login } = useAuth();
    const navigation = useNavigation();

    const navigateToHome=() =>{
        try {
            console.log('oi')
            navigation.navigate('Tabnavigator')
        } catch (error) {
            console.log(error)
        }
    }

  return (
      !user?
      <View>

          <ElementView>
              <Image source={logoImage} style={{alignSelf:'center'}}/>
              <FormView>
              <FormText >Email</FormText>
                  <BR/>
                  <FormTextInput onChangeText={setUserEmail} value={userEmail}/>
              </FormView>
              <FormView>
              <FormText>Senha</FormText>
                  <BR/>
                  <FormTextInput onChangeText={setPassword} value={userPassword} secureTextEntry={true}/>
              </FormView>
              <ForgetButton onPress={() => {}}><ForgetText>Esqueceu a senha?</ForgetText></ForgetButton>
              <LoginButton onPress={() => { login(userEmail, userPassword)}}><LoginText>Entrar</LoginText></LoginButton>
              <GoogleButton onPress={() => {onGoogleButtonPress()}}>
                  <Image source={googleLogo} />
                  <NewAccountText>Entrar com o Google</NewAccountText>
              </GoogleButton>
              <NewAccountButton onPress={() => {
                  navigation.navigate('NewAccount');}}><NewAccountText>Criar conta</NewAccountText></NewAccountButton>
            </ElementView>
        </View>: <>{navigateToHome()}</>
  );
};
