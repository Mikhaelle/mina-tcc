import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const TotalText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  font-size: 16px;
  font-weight: 500;
`;

export const View = styled.View`
  background-color: ${theme.WHITE};
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;

  padding-top: 20px;
  font-family: ${theme.FONT_FAMILY};
  justify-content: center;
`;

export const Container = styled.View`
  background-color: ${theme.WHITE};
  height: 100%;
  justify-content: flex-end;
`;
