import React from 'react';
import {View} from 'react-native';
import Centered from "../../../../resources/v1/styles/view/Centered";

interface Props {
  children?: any;
}

const HeaderContainer: React.FC<Props> = ({children}) => {
  return (
    <View
      style={[
        Centered,
        {
          flex: 1,
      // backgroundColor: 'red'
        },
      ]}>
      {children}
    </View>
  );
};

export default HeaderContainer;
