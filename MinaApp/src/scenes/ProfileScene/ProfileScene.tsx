import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {FormText, View} from './ProfileScene.css'

export const ProfileScene: React.FC = () => {
    const navigation = useNavigation();

  return (
      <View>
              <FormText>About</FormText>      
        </View>
  );
};
