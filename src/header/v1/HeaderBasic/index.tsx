import React from 'react';
import HeaderContainer from './container';
import {Image} from 'react-native';
import remoteConfig from "@react-native-firebase/remote-config";

const Header: React.FC<any> = () => {
  return (
    <HeaderContainer>
      <Image
        style={{
          height: 100,
          width: 200,
          resizeMode: 'contain',
        }}
        source={{
          uri: remoteConfig().getString('header_image'),
        }}
        resizeMode={'cover'}
      />
    </HeaderContainer>
  );
};

export default Header;
