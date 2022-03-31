import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const FormText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
`;

export const ForgetButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const ButtonContaienr = styled.TouchableOpacity`
  flex-grow: 1px;
`;

export const LoginText = styled.Text`
  color: ${theme.WHITE};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: ${theme.FONT_SIZE_SMALL};
  line-height: 16px;
`;

export const LoginButton = styled.TouchableOpacity`
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  border-radius: 100px;
  background-color: ${theme.TERTIARY_COLOR};
  justify-content: center;
  height: 45px;
  width: 80%;
  align-self: center;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
`;

export const GoogleButton = styled.TouchableOpacity`
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  border-radius: 100px;
  background-color: ${theme.WHITE};
  height: 45px;
  width: 80%;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  margin-bottom: 20px;
`;

export const ElementView = styled.View`
  flex-direction: column;
  background-color: ${theme.PRIMARY_COLOR};
  font-family: ${theme.FONT_FAMILY};
  width: 100%;
  height: 100%;
  padding: 25px;
`;

export const FormView = styled.View`
  margin-bottom: 20px;
`;

export const FormContainer = styled.View`
  flex-grow: 1;
`;

export const ImgView = styled.View`
  flex-grow: 1;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const NewView = styled.View`
  flex-direction: column;
  width: ${Dimensions.get('window').width - 50 + 'px'};
  height: ${Dimensions.get('window').height - 50 + 'px'};
`;

export const BR = styled.View`
  height: 10px;
`;
