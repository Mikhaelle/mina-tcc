import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthService} from './services/AuthService/authService';
import {QuizService} from './services/QuizService/quizService';
import {AuthProvider, useAuth} from './contexts/AuthContext/AuthContext';
import {QuizProvider} from './contexts/QuizContext/QuizContext';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScene} from './scenes/LoginScene/LoginScene';
import * as theme from './assets/variables.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NewAccountScene} from './scenes/NewAccountScene/NewAccountScene';
import {QuizScene} from './scenes/QuizScene/QuizScene';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Tabnavigator from './components/BottomTab';

GoogleSignin.configure({
  webClientId:
    '40899982825-namadccgk417bi8vs8uuaqld99i7lsp1.apps.googleusercontent.com',
});

export const LoginComponent = () => <LoginScene />;
export const NewAccountComponent = () => <NewAccountScene />;
export const QuizComponent = () => <QuizScene />;

const App = () => {
  const auth = AuthService.getInstance();
  const quizService = QuizService.getInstance();

  const QuizStack = createStackNavigator();
  const CrudStack = createStackNavigator();
  const Stack = createStackNavigator();

  const QuizNavigator = () => {
    return (
        <QuizStack.Navigator initialRouteName="Quiz1">
          <QuizStack.Screen
            name="Quiz1"
            component={QuizComponent}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
              headerTintColor: theme.BLACK,
              headerLeft: null,
            }}
          />
        </QuizStack.Navigator>
    );
  };

  const CrudNavigator = () => {
    return (
      <CrudStack.Navigator initialRouteName="Quiz1">
        <CrudStack.Screen
          name="Login"
          component={LoginComponent}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.WHITE,
          }}
        />
        <CrudStack.Screen
          name="NewAccount"
          component={NewAccountComponent}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.WHITE,
          }}
        />
      </CrudStack.Navigator>
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AuthProvider oauth={auth}>
          <QuizProvider quiz={quizService}>
            <Stack.Navigator initialRouteName="Crud">
              <Stack.Screen
                name="Crud"
                component={CrudNavigator}
                options={{
                  headerShown: false,
                  headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                  headerTintColor: theme.WHITE,
                }}
              />
              <Stack.Screen
                name="Quiz"
                component={QuizNavigator}
                options={{
                  headerShown: false,
                  headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                  headerTintColor: theme.WHITE,
                }}
              />
              <Stack.Screen
                name="Tabnavigator"
                component={Tabnavigator}
                options={{
                  headerShown: false,
                  headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                  headerTintColor: theme.WHITE,
                }}
              />
            </Stack.Navigator>
          </QuizProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
