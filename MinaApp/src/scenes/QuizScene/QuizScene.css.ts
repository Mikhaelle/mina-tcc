import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const FormText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_SUPER_LARGE};
  line-height: 33px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.TERTIARY_COLOR};
  margin-top: 10px;
  justify-content: center;
  text-align: center;
  height: 45px;
  width: 30%;
  border-radius: ${theme.BORDER_RADIUS};
`;

export const ButtonText = styled.Text`
  color: ${theme.WHITE};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  text-align: center;
  justify-content: center;
`;

export const DropdownText = styled.Text`
  position: absolute;
  background-color: #fff;
  top: 50px;
`;

export const DropdownView = styled.View`
  position: absolute;
    background-color: #fff;
    width: 100%;
    shadow-color: #000000
    shadow-radius: 4px;
    shadow-offset: { height: 4px, width: 0px };
shadow-opacity: 0.5px;
`;

export const ButtonDropdownText = styled.Text`
  flex: 1;
  textalign: center;
`;

export const DropdownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #efefef;
  height: 50px;
  width: 50%;
  padding-horizontal: 10px;
`;

export const RoundButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const RoundButton = styled.TouchableOpacity`
  background-color: ${theme.TERTIARY_COLOR};
  margin: 30px;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  border-radius: 100px;
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
