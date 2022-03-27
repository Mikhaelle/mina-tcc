import React from 'react';
import {ActivityIndicator} from 'react-native';
import * as theme from '../../assets/variables.css';

export const Loader: React.FC = () => {
  return (
    <ActivityIndicator
      testID="loader"
      size="large"
      color={theme.PRIMARY_COLOR}
    />
  );
};
