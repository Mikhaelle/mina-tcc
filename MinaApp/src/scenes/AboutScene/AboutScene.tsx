import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {FormText, View} from './AboutScene.css'

export const AboutScene: React.FC = () => {
    const navigation = useNavigation();

  return (
      <View>
              <FormText>About</FormText>      
        </View>
  );
};
