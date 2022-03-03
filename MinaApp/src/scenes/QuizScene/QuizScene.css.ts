import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const FormText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_SUPER_LARGE};
  line-height: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 33px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
`;

export const View = styled.View`
  background-color: ${theme.WHITE};
  height: 100%;
  align-items: center;
  padding: 25px;
  padding-top: 80px;
  padding-bottom: 80px;
  font-family: ${theme.FONT_FAMILY};
`;

export const ForgetButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: flex-end;
`;
