import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useContext } from "react";

import TextStandard from './TextStandard.js';
import ThemeContext from "../contexts/ThemeContext.js";
import globalProps from "../styles.js";

function CheckBox({ text, isChecked, onPress, monospaceFont, style })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <TouchableOpacity style = {{ ...styles.conOuter, ...style, backgroundColor: theme.header }} onPress = { onPress } activeOpacity = { 1.0 }>

            <View style = { styles.conText }>
                <TextStandard text = { text } isBold = { true } isMonospace = { monospaceFont } />
            </View>

            <View style = { { ...styles.check, backgroundColor: isChecked ? theme.selected : theme.font } }>
                {
                    isChecked && (
                        <MaterialCommunityIcons 
                            name = "check" 
                            color = "#ffffff"//{ theme.font }
                            size = { 2 * globalProps.fontSizeBase } 
                        />
                    )
                }
            </View>

        </TouchableOpacity>
    );
}

CheckBox.propTypes =
{
    text: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onPress: PropTypes.func,
    monospaceFont: PropTypes.bool,
    style: PropTypes.object
};

CheckBox.defaultProps =
{
    monospaceFont: false,
    style: {}
}

const styles = StyleSheet.create(
    {
        conOuter:
        {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "#000",
            paddingVertical: 0.4 * globalProps.fontSizeBase,
            paddingHorizontal: 0.75 * globalProps.fontSizeBase,
            borderRadius: globalProps.borderRadiusStandard
        },

        conText:
        {
            marginRight: globalProps.fontSizeBase,
        },

        check:
        {
            width: 2.3 * globalProps.fontSizeBase,
            height: 2.3 * globalProps.fontSizeBase,
            borderRadius: (2.3 * globalProps.fontSizeBase) / 2,
            alignItems: "center",
            justifyContent: "center"
        }

    }
);

export default CheckBox;