import React, {useEffect, useState} from 'react';
import SocialContainer from './container';
import remoteConfig from "@react-native-firebase/remote-config";
import Links from "./links";

export interface Link {
    icon: string,
    url: string,
    size: number,
    browserColor: string
}

const SocialBottom: React.FC<any> = () => {
    const [linkList, setLinkList] = useState<Link[]>([])

    useEffect(() => {
        const linkListStringfied = remoteConfig().getString('link_list');
        if (linkListStringfied.length > 0) {
            setLinkList(JSON.parse(linkListStringfied))
        }
    }, [])

  return (
    <SocialContainer>
        <Links linkList={linkList}/>
    </SocialContainer>
  );
};

export default SocialBottom;
