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
  login(email: string, password: string): Promise<void>;
  createAccount(email: string, password: string): Promise<void>;
  onGoogleButtonPress(): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext: Context<IAuthContext> = createContext(undefined as any);
const AuthConsumer = AuthContext.Consumer;
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{oauth: AuthService}> = props => {
  const oauth = props;
  const [user, setUser] = useState<any>();
  const [accessToken, setAccessToken] = useState<string>('');
  const [initializing, setInitializing] = useState(true);
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
    try {
      await authService.login(email, password);
    } catch (e: any) {
      console.log(e);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await authService.onGoogleButtonPress();
    } catch (e: any) {
      console.log(e);
    }
  };
  const logout = async () => {
    authService.logout();
    navigation.navigate('Login');
  };

  const createAccount = async (email: string, password: string) => {
    try {
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        createAccount,
        onGoogleButtonPress,
        logout,
      }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthConsumer, useAuth, AuthContext};
