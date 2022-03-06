import React, {
  createContext,
  useState,
  useContext,
  Context,
  useEffect,
} from 'react';
import {AuthService} from '../../services/AuthService/authService';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

interface IAuthContext {
  accessToken: string;
  user: FirebaseAuthTypes.UserCredential | null;
  emailError: string;
  passwordError: string;
  login(email: string, password: string): Promise<void>;
  createAccount(email: string, password: string): Promise<void>;
  onGoogleButtonPress(): Promise<void>;
  logout(): Promise<void>;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
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
    navigation.navigate('Login');
  };

  const createAccount = async (email: string, password: string) => {
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
      }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthConsumer, useAuth, AuthContext};
