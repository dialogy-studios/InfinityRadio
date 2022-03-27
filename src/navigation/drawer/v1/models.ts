import type { DrawerScreenProps } from '@react-navigation/drawer';

export enum ScreensNames {
    MAIN = "Main",
    SHARE = "Share"
}

export type DrawerParamList = {
    Main: MainAppScreenProperties,
    Share: ShareScreenProperties
}

export interface MainAppScreenProperties {

}

export interface ShareScreenProperties {

}

export type MainScreenNavigationProps = DrawerScreenProps<DrawerParamList, 'Main'>
export type ShareScreenNavigationProps = DrawerScreenProps<DrawerParamList, 'Share'>
