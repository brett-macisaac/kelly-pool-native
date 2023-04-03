import { StyleSheet, Text, View  } from 'react-native';

import { keyProperties as gGlobalProperties } from "../styles.js";

const gFontSizeText = Math.floor(gGlobalProperties.fontSizeStandard * 1.25);

const gFontSizeCount = Math.floor(gGlobalProperties.fontSizeStandard * 1.4);

function CountLabel({ text, count })
{
    return (
        <View style = { styles.conOuter }>

            <View style = { styles.conText }>
                <Text style = { styles.textConText  }>{ text }</Text>
            </View>

            <View style = { styles.conCount }>
                <Text style = { styles.textConCount  }>{ count }</Text>
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
            marginBottom: Math.floor(gGlobalProperties.spacingStandard * 0.75),
            backgroundColor: "#000",
        },

        conText:
        {
            marginLeft: gFontSizeText,
        },
        textConText:
        {
            fontSize: gFontSizeText,
            color: "#FFF",
            fontWeight: 600
        },

        conCount:
        {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF",
            width: gFontSizeCount * 3,
            paddingVertical: gFontSizeCount * 0.35
        },
        textConCount:
        {
            fontSize: gFontSizeCount,
            color: "#000",
            fontWeight: 600
        }

    }
);

export default CountLabel;