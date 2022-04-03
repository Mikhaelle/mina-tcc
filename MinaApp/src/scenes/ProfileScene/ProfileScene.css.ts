import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const NameText = styled.Text`
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  color: #1c1919;
  margin-left: 40px;
`;

export const View = styled.View`
  background-color: ${theme.WHITE};
  height: 100%;
  align-items: center;
  padding: 25px;
  padding-bottom: 80px;
  font-family: ${theme.FONT_FAMILY};
`;

export const ProfileView = styled.View`
  padding-top: 20px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
`;

export const LineBoxView = styled.View`
  background-color: ${theme.PRIMARY_COLOR};
  border-color: ${theme.PRIMARY_COLOR};
  border-width: 0.5px;
  width: ${Dimensions.get('window').width + 'px'};
`;

export const QuizButton = styled.TouchableOpacity`
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  height: 60px;
  width: 100%;
  flex-direction: row;
  text-align: center;
  align-itens: center;
`;

export const QuizButtonText = styled.Text`
  color: #1c1919;
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  align-self: center;
  margin-left: 15px;
`;

export const LoginText = styled.Text`
  color: ${theme.WHITE};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
`;

export const LoginButton = styled.TouchableOpacity`
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  border-radius: 100px;
  background-color: ${theme.TERTIARY_COLOR};
  justify-content: center;
  height: 45px;
  width: 80%;
  align-self: center;
`;
