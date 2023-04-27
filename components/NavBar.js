import { StyleSheet, View } from 'react-native';
import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";
import globalProps, { utilsGlobalStyles, styles as globalStyles } from '../styles';
import ButtonStandard from './ButtonStandard.js';

function NavBar({ text, onPress })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <View style = {{ ...styles.container, backgroundColor: theme.navBar, borderTopColor: theme.borders  }}>
            <ButtonStandard 
                text = { text }
                onPress = { onPress }
                style = {{ ...styles.button, backgroundColor: theme.buttonNavBar, borderColor: theme.borders }}
                sizeText = { 2 }
                isBold
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            alignItems: "center",
            justifyContent: "center",
            height: globalProps.heightNavBar,
            borderTopWidth: 1,
        },
        button:
        {
            width: "80%",
            maxWidth: 500,
            alignItems: "center",
            padding: 10,
            borderRadius: globalProps.borderRadiusStandard,
            // borderWidth: 1
        },
    }
);

export default NavBar;