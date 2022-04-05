import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import {AuthService} from '../../services/AuthService/authService';

interface IAuthContext {
  accessToken: string;
  user: FirebaseAuthTypes.UserCredential | null;
  emailError: string;
  passwordError: string;
  login(email: string, password: string): Promise<void>;
  createAccount(
    email: string,
    password: string,
    displayName: string,
  ): Promise<void>;
  onGoogleButtonPress(): Promise<void>;
  logout(): Promise<void>;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  resetPassword(email: string): Promise<void>;
}

const AuthContext: Context<IAuthContext> = createContext(undefined as any);
const AuthConsumer = AuthContext.Consumer;
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{oauth: AuthService}> = props => {
  const oauth = props;
  const [user, setUser] = useState<any>();
  const [accessToken, setAccessToken] = useState<string>('');
  const [initializing, setInitializing] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [displayName, setDisplayName] = useState('');

  const navigation = useNavigation();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const authService = AuthService.getInstance();

  const login = async (email: string, password: string) => {
    if (!email) {
      setEmailError('Email não pode ser nulo');
      return;
    }
    if (!password) {
      setPasswordError('Senha não pode ser vazia');
      return;
    }
    await authService.login(email, password, setEmailError, setPasswordError);
  };

  const onGoogleButtonPress = async () => {
    try {
      await authService.onGoogleButtonPress();
    } catch (e: any) {}
  };

  const logout = async () => {
    authService.logout();
    clearAppMemory();
    navigation.navigate('Login');
  };

  const clearAppMemory = () => {
    RNRestart.Restart();
  };

  const resetPassword = async (email: string) => {
    authService.resetPassword(email).then(() => {
      Alert.alert(
        'Email enviado',
        'Se a conta nesse email existir um email será enviado. Verifique a sua caixa de email e siga as instruções para recuperar sua senha.',
        [
          {
            text: 'Entendi',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    });
  };

  const createAccount = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    if (!email) {
      setEmailError('Email não pode ser nulo');
      return;
    }
    if (!password) {
      setPasswordError('Senha não pode ser vazia');
      return;
    }
    await authService.createUserWithEmailAndPassword(
      email,
      password,
      displayName,
      setEmailError,
      setPasswordError,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        emailError,
        passwordError,
        login,
        createAccount,
        onGoogleButtonPress,
        logout,
        setEmailError,
        setPasswordError,
        setDisplayName,
        resetPassword,
        displayName,
      }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthConsumer, useAuth, AuthContext};
