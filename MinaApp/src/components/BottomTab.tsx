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
        tabBarStyle: {backgroundColor: theme.PRIMARY_COLOR},
      })}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="Profile" component={ProfileComponent} />
      <Tab.Screen name="Task" component={TaskComponent} />
      <Tab.Screen name="Symptoms" component={TaskComponent} />
    </Tab.Navigator>
  );
};

export default Tabnavigator;
