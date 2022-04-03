import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as theme from './assets/variables.css';
import Tabnavigator from './components/BottomTab';
import {AuthProvider} from './contexts/AuthContext/AuthContext';
import {PeriodProvider} from './contexts/PeriodContext/PeriodContext';
import {QuizProvider} from './contexts/QuizContext/QuizContext';
import {TaskProvider} from './contexts/TaskContext/TaskContext';
import {AboutScene} from './scenes/AboutScene/AboutScene';
import {ForgotPasswordScene} from './scenes/ForgotPasswordScene/ForgotPasswordScene';
import {LoginScene} from './scenes/LoginScene/LoginScene';
import {NewAccountScene} from './scenes/NewAccountScene/NewAccountScene';
import {QuizCicleDurationScene} from './scenes/QuizScene/QuizCicleDurationScene';
import {QuizHormonalContraceptivesScene} from './scenes/QuizScene/QuizHormonalContraceptivesScene';
import {QuizHormonalDisorderScene} from './scenes/QuizScene/QuizHormonalDisorderScene';
import {QuizLastPeriodScene} from './scenes/QuizScene/QuizLastPeriodScene';
import {QuizPeriodDurationScene} from './scenes/QuizScene/QuizPeriodDurationScene';
import {QuizRegularCicleScene} from './scenes/QuizScene/QuizRegularCicleScene';
import {QuizTpmSymptomsScene} from './scenes/QuizScene/QuizTpmSymptomsScene';
import {TaskScene} from './scenes/TaskScene/TaskScene';
import {AuthService} from './services/AuthService/authService';
import {PeriodService} from './services/PeriodService/periodService';
import {QuizService} from './services/QuizService/quizService';
import {TaskService} from './services/TaskService/TaskService';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

GoogleSignin.configure({
  webClientId:
    '40899982825-namadccgk417bi8vs8uuaqld99i7lsp1.apps.googleusercontent.com',
});

export const LoginComponent = () => <LoginScene />;
export const NewAccountComponent = () => <NewAccountScene />;
export const ForgotPasswordComponent = () => <ForgotPasswordScene />;
export const AboutComponent = () => <AboutScene />;
export const TaskComponent = () => <TaskScene />;
export const QuizLastPeriodComponent = () => <QuizLastPeriodScene />;
export const QuizCicleDurationComponent = () => <QuizCicleDurationScene />;
export const QuizPeriodDurationComponent = () => <QuizPeriodDurationScene />;
export const QuizRegularCicleComponent = () => <QuizRegularCicleScene />;
export const QuizHormonalContraceptivesComponent = () => (
  <QuizHormonalContraceptivesScene />
);
export const QuizTpmSymptomsComponent = () => <QuizTpmSymptomsScene />;
export const QuizHormonalDisorderComponent = () => (
  <QuizHormonalDisorderScene />
);

const App = () => {
  const auth = AuthService.getInstance();
  const quizService = QuizService.getInstance();
  const taskService = TaskService.getInstance();
  const periodService = PeriodService.getInstance();

  const QuizStack = createStackNavigator();
  const CrudStack = createStackNavigator();
  const Stack = createStackNavigator();

  const QuizNavigator = () => {
    return (
      <QuizStack.Navigator initialRouteName="QuizLastPeriod">
        <QuizStack.Screen
          name="QuizLastPeriod"
          component={QuizLastPeriodComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            headerLeft: () => null,
            gestureEnabled: false,
            title: 'Configurações iniciais',
          }}
        />
        <QuizStack.Screen
          name="QuizPeriodDuration"
          component={QuizPeriodDurationComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
            headerBackTitleVisible: false,
          }}
        />
        <QuizStack.Screen
          name="QuizCicleDuration"
          component={QuizCicleDurationComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
            headerBackTitleVisible: false,
          }}
        />
        <QuizStack.Screen
          name="QuizRegularCicle"
          component={QuizRegularCicleComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
            headerBackTitleVisible: false,
          }}
        />
        <QuizStack.Screen
          name="QuizHormonalContraceptives"
          component={QuizHormonalContraceptivesComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
            headerBackTitleVisible: false,
          }}
        />
        <QuizStack.Screen
          name="QuizTpmSymptoms"
          component={QuizTpmSymptomsComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
            headerBackTitleVisible: false,
          }}
        />
        <QuizStack.Screen
          name="QuizHormonalDisorder"
          component={QuizHormonalDisorderComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
            headerBackTitleVisible: false,
          }}
        />
      </QuizStack.Navigator>
    );
  };

  const CrudNavigator = () => {
    return (
      <CrudStack.Navigator initialRouteName="QuizLastPeriod">
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
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: null,
            headerBackTitleVisible: false,
          }}
        />
        <CrudStack.Screen
          name="ForgotPassword"
          component={ForgotPasswordComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: null,
            headerBackTitleVisible: false,
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
            <PeriodProvider periodService={periodService}>
              <TaskProvider taskService={taskService}>
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
                  <Stack.Screen
                    name="About"
                    component={AboutComponent}
                    options={{
                      headerShown: true,
                      headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                      headerTintColor: theme.BLACK,
                      headerBackTitleVisible: false,
                      title: 'Sobre a Fase',
                    }}
                  />
                  <Stack.Screen
                    name="Task"
                    component={TaskComponent}
                    options={{
                      headerShown: true,
                      headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                      headerTintColor: theme.BLACK,
                      headerBackTitleVisible: false,
                      title: 'Previsão de Hoje',
                    }}
                  />
                </Stack.Navigator>
              </TaskProvider>
            </PeriodProvider>
          </QuizProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
