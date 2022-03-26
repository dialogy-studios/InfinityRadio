import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import {Linking} from "react-native";
const openLink = async (url: string, color: string) => {
    try {
        await InAppBrowser
            .open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: color,
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: color,
                secondaryToolbarColor: 'black',
                navigationBarColor: 'black',
                navigationBarDividerColor: 'white',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                }
            })
        return
    } catch(error) {
        console.log(error)
    }
    try {
        await Linking.openURL(url)
    } catch (error) {

    }
}

export default openLink;
