import React, {useEffect, useState} from 'react';
import SocialContainer from './container';
import Links from "./links";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

export interface Link {
    icon: string,
    url: string,
    size: number,
    browserColor: string
}

const SocialBottom: React.FC<any> = () => {

  return (
    <SocialContainer>

    </SocialContainer>
  );
};

export default SocialBottom;
