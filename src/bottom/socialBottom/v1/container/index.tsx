import {View} from 'react-native';
import React from 'react';
import FlexRowCentered from '../../../../resources/v1/styles/view/FlexRowCentered';
import FlexRow from "../../../../resources/v1/styles/view/FlexRow";
import JustifyCenter from "../../../../resources/v1/styles/view/JustifyCenter";
import AlignCenter from "../../../../resources/v1/styles/view/AlignCenter";

interface Props {
  children?: any;
}

const SocialContainer: React.FC<Props> = ({children}) => {
  return (
    <View
      style={[
        FlexRow,
          JustifyCenter,
          AlignCenter,
        {
          // backgroundColor: 'brown'
        },
      ]}>
      {children}
    </View>
  );
};

export default SocialContainer;
