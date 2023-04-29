import { StyleSheet, View  } from 'react-native';
import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";
import globalProps, { utilsGlobalStyles } from "../styles.js";
import TextStandard from './TextStandard.js';

function CountLabel({ text, count, size })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <View style = {{ 
                ...styles.conOuter,  backgroundColor: theme.header, borderColor: theme.borders
            }}
        >

            <View style = {{ marginLeft: utilsGlobalStyles.fontSizeN(size) }}>
                <TextStandard text = { text } size = { size } isBold />
            </View>

            <View style = {{ 
                    ...styles.conCount, width: 3 * utilsGlobalStyles.fontSizeN(size), backgroundColor: theme.header, 
                    borderLeftWidth: 1, borderColor: theme.borders
                }}
            >
                <TextStandard text = { count } size = { size } isBold />
            </View>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        conOuter:
        {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderWidth: 1,
            marginBottom: Math.floor(utilsGlobalStyles.spacingVertN(-1)),
        },

        conCount:
        {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 0.35 * utilsGlobalStyles.fontSizeN(1)
        },

    }
);

export default CountLabel;