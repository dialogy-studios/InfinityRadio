import React from 'react';
import HeaderContainer from './container';
import {Image} from 'react-native';
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

const Logo: React.FC<any> = () => {
    const config = useSafeConfigContext()
  return (
      <Image
          style={{
              flex: 1,
          }}
          source={{
              uri: config.state.mainScreen.header_image
          }}
          resizeMode={'stretch'}
      />
  );
};

export default Logo;
