import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormText, View} from './SymptomScene.css';

export const SymptomScene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <FormText>About</FormText>
    </View>
  );
};
