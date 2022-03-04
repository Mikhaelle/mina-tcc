import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View} from './TaskScene.css';

export const TaskScene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <FormText>About</FormText>
    </View>
  );
};
