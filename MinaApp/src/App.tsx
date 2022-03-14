import React from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {
  NavigationContainer,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {AuthService} from './services/AuthService/authService';
import {QuizService} from './services/QuizService/quizService';
import {AuthProvider, useAuth} from './contexts/AuthContext/AuthContext';
import {QuizProvider} from './contexts/QuizContext/QuizContext';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScene} from './scenes/LoginScene/LoginScene';
import * as theme from './assets/variables.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NewAccountScene} from './scenes/NewAccountScene/NewAccountScene';
import {QuizLastPeriodScene} from './scenes/QuizScene/QuizLastPeriodScene';
import {QuizCicleDurationScene} from './scenes/QuizScene/QuizCicleDurationScene';
import {QuizPeriodDurationScene} from './scenes/QuizScene/QuizPeriodDurationScene';
import {QuizRegularCicleScene} from './scenes/QuizScene/QuizRegularCicleScene';
import {QuizHormonalContraceptivesScene} from './scenes/QuizScene/QuizHormonalContraceptivesScene';
import {QuizTpmSymptomsScene} from './scenes/QuizScene/QuizTpmSymptomsScene';
import {QuizHumorChangeScene} from './scenes/QuizScene/QuizHumorChangeScene';
import {QuizBehaviorChangeScene} from './scenes/QuizScene/QuizBehaviorChangeScene';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Tabnavigator from './components/BottomTab';
import {AboutScene} from './scenes/AboutScene/AboutScene';
import {TaskProvider} from './contexts/TaskContext/TaskContext';
import {TaskService} from './services/TaskService/TaskService';

GoogleSignin.configure({
  webClientId:
    '40899982825-namadccgk417bi8vs8uuaqld99i7lsp1.apps.googleusercontent.com',
});

export const LoginComponent = () => <LoginScene />;
export const NewAccountComponent = () => <NewAccountScene />;
export const AboutComponent = () => <AboutScene />;
export const QuizLastPeriodComponent = () => <QuizLastPeriodScene />;
export const QuizCicleDurationComponent = () => <QuizCicleDurationScene />;
export const QuizPeriodDurationComponent = () => <QuizPeriodDurationScene />;
export const QuizRegularCicleComponent = () => <QuizRegularCicleScene />;
export const QuizHormonalContraceptivesComponent = () => (
  <QuizHormonalContraceptivesScene />
);
export const QuizTpmSymptomsComponent = () => <QuizTpmSymptomsScene />;
export const QuizHumorChange = () => <QuizHumorChangeScene />;
export const QuizBehaviorChangeComponent = () => <QuizBehaviorChangeScene />;

const App = () => {
  const auth = AuthService.getInstance();
  const quizService = QuizService.getInstance();
  const taskService = TaskService.getInstance();

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
          }}
        />
        <QuizStack.Screen
          name="QuizHumorChange"
          component={QuizHumorChange}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
          }}
        />
        <QuizStack.Screen
          name="QuizBehaviorChange"
          component={QuizBehaviorChangeComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Configurações iniciais',
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
                    headerShown: false,
                    headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
                    headerTintColor: theme.WHITE,
                  }}
                />
              </Stack.Navigator>
            </TaskProvider>
          </QuizProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
