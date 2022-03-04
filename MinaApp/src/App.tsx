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
import {Quiz1Scene} from './scenes/QuizScene/Quiz1Scene';
import {Quiz2Scene} from './scenes/QuizScene/Quiz2Scene';
import {Quiz3Scene} from './scenes/QuizScene/Quiz3Scene';
import {Quiz4Scene} from './scenes/QuizScene/Quiz4Scene';
import {Quiz5Scene} from './scenes/QuizScene/Quiz5Scene';
import {Quiz6Scene} from './scenes/QuizScene/Quiz6Scene';
import {Quiz7Scene} from './scenes/QuizScene/Quiz7Scene';


import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Tabnavigator from './components/BottomTab';

GoogleSignin.configure({
  webClientId:
    '40899982825-namadccgk417bi8vs8uuaqld99i7lsp1.apps.googleusercontent.com',
});

export const LoginComponent = () => <LoginScene />;
export const NewAccountComponent = () => <NewAccountScene />;
export const Quiz1Component = () => <Quiz1Scene />;
export const Quiz2Component = () => <Quiz2Scene />;
export const Quiz3Component = () => <Quiz3Scene />;
export const Quiz4Component = () => <Quiz4Scene />;
export const Quiz5Component = () => <Quiz5Scene />;
export const Quiz6Component = () => <Quiz6Scene />;
export const Quiz7Component = () => <Quiz7Scene />;


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
            component={Quiz1Component}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
              headerTintColor: theme.BLACK,
              headerLeft: null,
            }}
          />
            <QuizStack.Screen
                name="Quiz2"
                component={Quiz2Component}
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                    headerTintColor: theme.BLACK,
                    headerLeft: null,
                }}
            />
            <QuizStack.Screen
                name="Quiz3"
                component={Quiz3Component}
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                    headerTintColor: theme.BLACK,
                    headerLeft: null,
                }}
            />
            <QuizStack.Screen
                name="Quiz4"
                component={Quiz4Component}
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                    headerTintColor: theme.BLACK,
                    headerLeft: null,
                }}
            />
            <QuizStack.Screen
                name="Quiz5"
                component={Quiz5Component}
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                    headerTintColor: theme.BLACK,
                    headerLeft: null,
                }}
            />
            <QuizStack.Screen
                name="Quiz6"
                component={Quiz6Component}
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                    headerTintColor: theme.BLACK,
                    headerLeft: null,
                }}
            />
            <QuizStack.Screen
                name="Quiz7"
                component={Quiz7Component}
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
