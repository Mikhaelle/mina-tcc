import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import {AboutScene} from '../scenes/AboutScene/AboutScene';
import {HomeScene} from '../scenes/HomeScene/HomeScene';
import {ProfileScene} from '../scenes/ProfileScene/ProfileScene';
import {SymptomScene} from '../scenes/SymptomScene/SymptomScene';
import {TaskScene} from '../scenes/TaskScene/TaskScene';
import Icon from 'react-native-vector-icons/AntDesign';
import {ThemeConsumer} from 'styled-components/native';
import * as theme from '../assets/variables.css';
import {PeriodService} from '../services/PeriodService/periodService';
import {PeriodProvider} from '../contexts/PeriodContext/PeriodContext';

export const ProfileComponent = () => <ProfileScene />;
export const TaskComponent = () => <TaskScene />;
export const SymptomsComponent = () => <SymptomScene />;
export const AboutComponent = () => <AboutScene />;
export const HomeComponent = () => <HomeScene />;

const Tab = createBottomTabNavigator();
const periodService = PeriodService.getInstance();

const screenOptions = (route: RouteProp<ParamListBase, string>) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Profile':
      iconName = 'user';
      break;
    case 'Task':
      iconName = 'form';
      break;
    case 'Symptoms':
      iconName = 'hearto';
      break;
    default:
      break;
  }

  return <Icon name={iconName} size={24} />;
};

const Tabnavigator = () => {
  return (
    <PeriodProvider periodService={periodService}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => screenOptions(route),
        })}
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            headerLeft: () => null,
            title: 'Mina',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            title: 'Perfil',
          }}
        />
        <Tab.Screen
          name="Task"
          component={TaskComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            headerLeft: () => null,
            title: 'Previsão de hoje - tarefas',
          }}
        />
        <Tab.Screen
          name="Symptoms"
          component={SymptomsComponent}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            headerTintColor: theme.BLACK,
            headerLeft: () => null,
            title: 'Previsão de hoje - sintomas',
          }}
        />
      </Tab.Navigator>
    </PeriodProvider>
  );
};

export default Tabnavigator;
