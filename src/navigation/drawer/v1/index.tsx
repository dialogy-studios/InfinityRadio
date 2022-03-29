import {createDrawerNavigator, DrawerNavigationProp} from "@react-navigation/drawer";
import {DrawerParamList} from "./models";
import {DrawerNavigationOptions} from "@react-navigation/drawer/lib/typescript/src/types";
import {createStackNavigator} from "@react-navigation/stack";

export type DrawerDefaults = {
    screenOptions: DrawerNavigationOptions
}

export const AppDrawer = createDrawerNavigator<DrawerParamList>()

export const MainScreenStack = createStackNavigator()

type MainScreenDrawerProp = DrawerNavigationProp<DrawerParamList, 'Main'>

export const drawerDefault = {
    screenOptions: {
        header: () => null
    }
}
