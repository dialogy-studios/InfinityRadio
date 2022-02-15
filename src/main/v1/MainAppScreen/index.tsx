import {SafeAreaView} from 'react-native';
import BasicPlayer from '../../../player/v1/basicplayer';
import React from 'react';
import HeaderBasic from '../../../header/v1/HeaderBasic';
import SocialBottom from '../../../bottom/socialBottom/v1';
import PlayerProvider from "../../../player/v1/basicplayer/config/Context";
import LiveLabel from "../../../player/v1/basicplayer/livelabel";
import remoteConfig from "@react-native-firebase/remote-config";

const MainAppScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={[[{flex: 1}]]}>
      <HeaderBasic />
        <PlayerProvider>
        <BasicPlayer />
      </PlayerProvider>
      <SocialBottom />
    </SafeAreaView>
  );
};

export default MainAppScreen;
