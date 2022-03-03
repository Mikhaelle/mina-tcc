import React from 'react';
import {Alert, Text, View} from 'react-native';
import {styles} from './BottomTab.css';

const PostScreen = ({children}) => {
  return (
    <>
      {children}
      {Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {
            text: 'Cancel',
            onPress: () => Alert.alert('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              'This alert was dismissed by tapping outside of the alert dialog.',
            ),
        },
      )}
      s
    </>
  );
};

export default PostScreen;
