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
    const [linkList, setLinkList] = useState<Link[]>([])
    const config = useSafeConfigContext()

    useEffect(() => {
        const linkListStringfied = config.state.mainScreen.link_list
        if (linkListStringfied.length > 0) {
            setLinkList(JSON.parse(linkListStringfied))
        }
    }, [config.state.mainScreen.link_list])

  return (
    <SocialContainer>
        <Links linkList={linkList}/>
    </SocialContainer>
  );
};

export default SocialBottom;
