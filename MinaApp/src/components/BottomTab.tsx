import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import * as theme from '../assets/variables.css';
import {AboutScene} from '../scenes/AboutScene/AboutScene';
import {HomeScene} from '../scenes/HomeScene/HomeScene';
import {ProfileScene} from '../scenes/ProfileScene/ProfileScene';
import {SymptomScene} from '../scenes/SymptomScene/SymptomScene';
import {TaskScene} from '../scenes/TaskScene/TaskScene';

export const ProfileComponent = () => <ProfileScene />;
export const TaskComponent = () => <TaskScene />;
export const SymptomsComponent = () => <SymptomScene />;
export const AboutComponent = () => <AboutScene />;
export const HomeComponent = () => <HomeScene />;

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => screenOptions(route),
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
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
  );
};

export default Tabnavigator;
