import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const FormText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_SUPER_LARGE};
  line-height: 33px;
  text-align:center;
  margin-bottom:20px
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.PRIMARY_COLOR};
  margin-top: 10px;
  justify-content: center;
  text-align:center;
  height: 45px;
  width: 30%;
  border-radius: ${theme.BORDER_RADIUS};
`;

export const ButtonText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  text-align:center;
  justify-content: center;
`;

export const View = styled.View`
  row:column;
  background-color: ${theme.WHITE};
  height: 100%;
  align-items: center;
  padding: 25px;
  padding-top: 80px;
  padding-bottom: 80px;
  font-family: ${theme.FONT_FAMILY};
  border-color: red;
  border-width: 1px
`;

