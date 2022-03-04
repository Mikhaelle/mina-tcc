import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import {AboutScene} from '../scenes/AboutScene/AboutScene';
import {HomeScene} from '../scenes/HomeScene/HomeScene';
import {ProfileScene} from '../scenes/ProfileScene/ProfileScene';
import {SymptomScene} from '../scenes/SymptomScene/SymptomScene';
import {TaskScene} from '../scenes/TaskScene/TaskScene';
import Icon from 'react-native-vector-icons/AntDesign';
import {View} from 'react-native';
import {styles} from './BottomTab.css';
import PostScreen from './NewCicle';
import LinearGradient from 'react-native-linear-gradient';

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
      })}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="Profile" component={ProfileComponent} />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={() => ({
          tabBarIcon: ({}) => (
            <View>
              <LinearGradient
                style={styles.iconTabRound}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#EB5757', '#FFD4D5']}
              >
                <Icon name="plus" size={26} color="#FFF" />
              </LinearGradient>
            </View>
          ),
        })}
      />
      <Tab.Screen name="Task" component={TaskComponent} />
      <Tab.Screen name="Symptoms" component={TaskComponent} />
    </Tab.Navigator>
  );
};

export default Tabnavigator;
