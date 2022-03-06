import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {TotalText, View, Container} from './AboutScene.css';
import aboutImage from '../../assets/images/about.png';

export const AboutScene: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <View>
        <TotalText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis
          eu volutpat odio facilisis mauris. Urna neque viverra justo nec
          ultrices dui sapien. Sit amet volutpat consequat mauris nunc congue
          nisi. Amet nisl purus in mollis. Adipiscing vitae proin sagittis nisl
          rhoncus mattis. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Non diam phasellus{' '}
        </TotalText>
      </View>
      <Image source={aboutImage}></Image>
    </Container>
  );
};
