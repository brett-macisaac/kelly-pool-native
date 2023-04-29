import { Ionicons } from '@expo/vector-icons';
import { useContext } from "react";
import { Alert } from 'react-native';
import ThemeContext from "../contexts/ThemeContext.js";

import globalProps from '../styles';
import ButtonStandard from './ButtonStandard';
import PopUpStandard from './PopUpStandard.js';

/*
* These are the button components available to be placed in the Header component.
*/
const buttons = 
{
    /*
    * The 'back' button. Simply returns to the previous page.

    * Props:
        > navigation: the app's navigation object.
    */
    back: ({ navigation }) =>
    {
        const { themeName } = useContext(ThemeContext);
        let theme = globalProps.themes[themeName];

        return (
            <ButtonStandard 
                icon = { 
                    <Ionicons 
                        name = "chevron-back-sharp" color = { theme.iconHeader }  
                        size = { globalProps.sizeIconHeaderFooter } 
                    />
                }
                onPress =  { () => navigation.goBack() }
                style = {{ 
                    backgroundColor: 'transparent', 
                    padding: (globalProps.heightHeader - globalProps.sizeIconHeaderFooter) / 2 
                }}
            />
        );
    },

    /*
    * Goes to the 'menu' page.

    * Props:
        > navigation: the app's navigation object.
    */
    menu: ({ navigation, setOptionsPopUpMsg }) =>
    {
        const { themeName } = useContext(ThemeContext);
        let theme = globalProps.themes[themeName];

        const handleAlert = () =>
        {
            setOptionsPopUpMsg(
                {
                    title: 'Return to Menu',
                    message: "Are you sure? You will lose your game's progress.",
                    buttons: [
                        {
                            text: "Cancel",
                        },
                        {
                            text: "Return",
                            onPress: () => {
                                //setOptionsPopUpMsg(undefined);
                                navigation.navigate("gameParameters")
                            },
                        }
                    ],
                    removePopUp: () => setOptionsPopUpMsg(undefined)
                }
            );

            // Alert.alert(
            //     'Return to Menu',
            //     "Are you sure? You will lose your game's progress.",
            //     [
            //         {
            //             text: "Cancel",
            //             style: "cancel"
            //         },
            //         {
            //             text: "Return",
            //             onPress: () => navigation.navigate("gameParameters"),
            //             style: "default"
            //         }
            //     ],
            //     { cancelable: true }
            // );
        }

        return (
            <ButtonStandard 
                icon = { 
                    <Ionicons 
                        name = "home" color = { theme.iconHeader }  
                        size = { globalProps.sizeIconHeaderFooter } 
                    />
                }
                onPress = { handleAlert }
                style = {{ 
                    backgroundColor: 'transparent', 
                    padding: (globalProps.heightHeader - globalProps.sizeIconHeaderFooter) / 2 
                }}
            />
        );
    },

    /*
    * Goes to the 'settings' page.

    * Props:
        > navigation: the app's navigation object.
    */
    settings: ({ navigation }) =>
    {
        const { themeName } = useContext(ThemeContext);
        let theme = globalProps.themes[themeName];

        return (
            <ButtonStandard 
                icon = { 
                    <Ionicons 
                        name = "settings" color = { theme.iconHeader } 
                        size = { globalProps.sizeIconHeaderFooter } 
                    /> 
                }
                onPress =  { () => navigation.navigate("settings") } 
                style = {{ 
                    backgroundColor: 'transparent', 
                    padding: (globalProps.heightHeader - globalProps.sizeIconHeaderFooter) / 2 
                }}
            />
        );
    }

};

export default buttons;