import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const BoxText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  font-weight: 400;
`;

export const TitleText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  font-weight: 700;
  padding: 20px;
`;

export const BoxView = styled.View`
width:100%
align-items: center;
padding: 20px;
font-family: ${theme.FONT_FAMILY};
`;

export const LineBoxView = styled.View`
  background-color: #fdf1f1;
  border-color: #fecaca;
  border-width: 0.5px;
  width: ${Dimensions.get('window').width + 'px'};
`;

export const View = styled.View`
  background-color: ${theme.WHITE};
  height: 100%;
  align-items: center;
  font-family: ${theme.FONT_FAMILY};
`;

export const TaskView = styled.View`
  width: ${Dimensions.get('window').width - 20 + 'px'};
  margin:10px;
flex-direction:row
justify-content:space-between;
`;

export const ContainerTask = styled.View`
flex-direction:column
align-items:center
`;

export const TaskButton = styled.TouchableOpacity``;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: ${theme.TERTIARY_COLOR};
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  text-align: center;
  align-self: center;
  border-radius: 5px;
  flex-direction: row;
  height: 48px;
`;

export const ButtonText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 24px;
  align-self: center;
  font-weight: 700;
`;
