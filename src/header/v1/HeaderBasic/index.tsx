import React from 'react';
import HeaderContainer from './container';
import {Image} from 'react-native';
import remoteConfig from "@react-native-firebase/remote-config";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

const Header: React.FC<any> = () => {
    const config = useSafeConfigContext()
  return (
    <HeaderContainer>
      <Image
        style={{
          height: 100,
          width: 200,
          resizeMode: 'contain',
        }}
        source={{
          uri: config.state.mainScreen.header_image
        }}
        resizeMode={'cover'}
      />
    </HeaderContainer>
  );
};

export default Header;
