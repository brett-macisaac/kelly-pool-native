import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { keyProperties as gGlobalProperties } from "../styles.js";

function CheckBox({ text, isChecked, onPress })
{
    return (
        <TouchableOpacity style = { styles.conOuter } onPress = { onPress } activeOpacity = { 1.0 }>

            <View style = { styles.conText }>
                <Text style = { styles.textConText }>{ text }</Text>
            </View>

            <View style = { { ...styles.check, backgroundColor: isChecked ? gGlobalProperties.colourSelected : "#FFF" } }>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        conOuter:
        {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#000",
            paddingVertical: 0.4 * gGlobalProperties.fontSizeStandard,
            paddingHorizontal: 0.75 * gGlobalProperties.fontSizeStandard
        },

        conText:
        {
            marginRight: 1 * gGlobalProperties.fontSizeStandard,
        },
        textConText:
        {
            fontFamily: gGlobalProperties.fontFamilyMono,
            fontSize: gGlobalProperties.fontSizeStandard,
            color: "#FFF",
            fontWeight: 600
        },

        conCheck:
        {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            width: 3 * gGlobalProperties.fontSizeStandard,
            height: 3 * gGlobalProperties.fontSizeStandard,
            borderRadius: (3 * gGlobalProperties.fontSizeStandard) / 2
        },
        check:
        {
            width: 2.3 * gGlobalProperties.fontSizeStandard,
            height: 2.3 * gGlobalProperties.fontSizeStandard,
            borderRadius: (2.3 * gGlobalProperties.fontSizeStandard) / 2
        }

    }
);

export default CheckBox;