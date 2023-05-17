import {Image, TouchableWithoutFeedback} from 'react-native';
import {NavButtonProps, NaviButtonStyle, nameMapper} from './nav.type';
import styled from 'styled-components/native';

const Btn = styled.View`
  width: 60px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.Text<NameProps>`
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: ${({isSelected}) => (isSelected ? '#efefef' : '#6A7395')};
`;
type NameProps = {
  isSelected: boolean;
};

export const NavBtn: React.FC<NavButtonProps> = ({
  item,
  isSelected,
  onPress,
}) => (
  <TouchableWithoutFeedback key={item.name} onPress={onPress}>
    <Btn>
      <Image
        style={NaviButtonStyle[item.name]}
        source={isSelected ? item.selectedIcon : item.defaultIcon}
      />
      <Name isSelected={isSelected}>{nameMapper[item.name]}</Name>
    </Btn>
  </TouchableWithoutFeedback>
);
