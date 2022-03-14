import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';
import {Dimensions} from 'react-native';

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
margin-top:10px
background-color: #FDF1F1;
border-color: #FECACA;
border-width:1px;
width:100%
align-items: center;
padding: 20px;
font-family: ${theme.FONT_FAMILY};
`;

export const LineBoxView = styled.View`
  background-color: #fdf1f1;
  border-color: #fecaca;
  border-width: 1px;
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

export const TaskButton = styled.TouchableOpacity``;
