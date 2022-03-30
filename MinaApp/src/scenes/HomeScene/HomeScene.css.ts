import styled from 'styled-components/native';
import * as theme from '../../assets/variables.css';

export const TitleText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 24px;
  align-self: center;
  font-weight: 500;
`;

export const ButtonText = styled.Text`
  flex: 1;
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
`;

export const AlertText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
  text-align: center;
  margin-bottom: 10px;
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
  shadow-color: #000;
  shadow-offset: {
    width: 0,
    height: 2
  };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

export const ModalButtonText = styled.Text`
  color: ${theme.BLACK};
  font-size: ${theme.FONT_SIZE_CUSTOM_MEDIUM};
  line-height: 16px;
  align-self: center;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${theme.PRIMARY_COLOR};
  margin-top: 10px;
  justify-content: center;
  text-align: center;
  align-self: center;
  border-radius: 10px;
  flex-direction: row;
  padding: 15px;
  padding-right: 20px;
  padding-left: 20px;
  shadow-color: #000;
shadow-offset: {
  width: 0,
  height: 2
};
shadow-opacity: 0.25;
shadow-radius: 4px;
elevation: 5;
`;

export const RoundButton = styled.TouchableOpacity`
  background-color: ${theme.TERTIARY_COLOR};
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border-radius: 100px;
  shadow-color: #000;
  shadow-offset: {
    width: 0,
    height: 2
  };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
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

export const CenteredModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
background-color: white;
border-radius: 10px;
padding: 35px;
align-items: center;
shadow-color: #000;
shadow-offset: {
  width: 0,
  height: 2
};
shadow-opacity: 0.25;
shadow-radius: 4px;
elevation: 5;
`;
