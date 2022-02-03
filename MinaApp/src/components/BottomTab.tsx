import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AboutScene } from '../scenes/AboutScene/AboutScene';
import { HomeScene } from '../scenes/HomeScene/HomeScene';
import { ProfileScene } from '../scenes/ProfileScene/ProfileScene';
import { SymptomScene } from '../scenes/SymptomScene/SymptomScene';
import { TaskScene } from '../scenes/TaskScene/TaskScene';


export const ProfileComponent = () => <ProfileScene />;
export const TaskComponent = () => <TaskScene />;
export const SymptomsComponent = () => <SymptomScene />;
export const AboutComponent = () => <AboutScene />;
export const HomeComponent = () => <HomeScene />;


const Tab = createBottomTabNavigator();

export default function Tabnavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="Profile" component={ProfileComponent} />
      <Tab.Screen name="Tasks" component={TaskComponent} />
      <Tab.Screen name="Symptoms" component={SymptomsComponent} />
      <Tab.Screen name="About" component={AboutComponent} />
    </Tab.Navigator>
  );
}
