import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const FormText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
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
