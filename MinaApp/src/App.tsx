
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {AuthService} from './services/AuthService/authService'
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScene } from './scenes/LoginScene/LoginScene';
import * as theme from './assets/variables.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NewAccountScene } from './scenes/NewAccountScene/NewAccountScene';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Tabnavigator from './components/BottomTab';

GoogleSignin.configure({
  webClientId: '40899982825-namadccgk417bi8vs8uuaqld99i7lsp1.apps.googleusercontent.com',
});

export const LoginComponent = () => <LoginScene />;
export const NewAccountComponent = () => <NewAccountScene />;


const App = () => {
    const auth = AuthService.getInstance();
    const Stack = createStackNavigator();

    return (
        <SafeAreaProvider>
        <NavigationContainer>
                <StatusBar barStyle="light-content" />
                    <AuthProvider oauth={auth}>
                        <Stack.Navigator initialRouteName="Login">
                            <Stack.Screen
                                name="Login"
                                component={LoginComponent}
                                options={{
                                    headerShown: false,
                                    headerStyle: { backgroundColor: theme.PRIMARY_COLOR },
                                    headerTintColor: theme.WHITE,
                                }}
                            />
                            <Stack.Screen
                                name="NewAccount"
                                component={NewAccountComponent}
                                options={{
                                    headerShown: false,
                                    headerStyle: { backgroundColor: theme.PRIMARY_COLOR },
                                    headerTintColor: theme.WHITE,
                                }}
                            />
                             <Stack.Screen
                                name="Home"
                                component={Tabnavigator}
                                options={{
                                    headerShown: false,
                                    headerStyle: { backgroundColor: theme.PRIMARY_COLOR },
                                    headerTintColor: theme.WHITE,
                                }}
                            />
                            
                        </Stack.Navigator>
                    </AuthProvider>
                    

        </NavigationContainer>
            </SafeAreaProvider>
    );
};

export default App;
