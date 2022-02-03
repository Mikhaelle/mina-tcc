import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';


export const FormText = styled.Text`
    color: ${theme.BLACK};
    font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
    line-height: 16px;
`;

export const ForgetText = styled.Text`
    color: ${theme.BLACK};
    font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
    line-height: 16px;
    align-self: flex-end;
`;

export const FormTextInput = styled.TextInput`
    height: 40px;
    background: ${theme.WHITE};
    border-radius: 8px;
`;


export const View = styled.View`
  background-color: ${theme.WHITE};
  height: 100%;
  align-items: center;
  padding: 25px;
  padding-top:80px;
  padding-bottom:80px;
  font-family: ${theme.FONT_FAMILY};
`;

export const ForgetButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: flex-end;
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

export const NewAccountText = styled.Text`
    color: ${theme.TERTIARY_COLOR};
    font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
    line-height: 16px;
    align-self: center;
`;

export const NewAccountButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: flex-end;
 `;

export const GoogleButton = styled.TouchableOpacity`
   font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
    border-radius: 100px;
    background-color: ${theme.WHITE};
    height: 45px;
    width: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;
 `;

export const ElementView = styled.View`
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
`;

export const FormView = styled.View`
`;

export const BR = styled.View`
height: 10px;
`;
