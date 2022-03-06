import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const TitleText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
  letter-spacing: 0.02;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: ${theme.SECONDARY_COLOR};
  margin-top: 10px;
  justify-content: center;
  text-align: center;
  align-self: center;
  border-radius: ${theme.BORDER_RADIUS};
  flex-direction: row;
  padding: 15px;
  padding-right: 40px;
  padding-left: 40px;
`;

export const RoundButton = styled.TouchableOpacity`
  background-color: ${theme.TERTIARY_COLOR};
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border-radius: 100px;
`;

export const View = styled.View`
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.WHITE};
  height: 100%;
  padding: 25px;
  font-family: ${theme.FONT_FAMILY};
`;
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
