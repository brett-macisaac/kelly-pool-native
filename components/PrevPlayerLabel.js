import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from "react";

import globalProps from "../styles.js";
import CheckBox from './CheckBox.js';
import ThemeContext from "../contexts/ThemeContext.js";
import TextStandard from './TextStandard.js';

function PrevPlayerLabel({ name, isSelected, onSelect, onRemove })
{   
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <View 
            style = {{ ...styles.conOuter, backgroundColor: theme.header }}
            activeOpacity = { 1.0 }
        >
            <CheckBox text = { name } isChecked = { isSelected } onPress = { onSelect } monospaceFont />

            <TouchableOpacity style = { styles.btnRemove } onPress = { onRemove } activeOpacity = { 1.0 }>
                <TextStandard text = "—" size = { 2 } isBold style = {{ color: "#ffffff" }} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        conOuter:
        {
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "space-between",
            borderRadius: globalProps.fontSizeStandard * 0.5,
            overflow: "hidden"
        },

        conName:
        {
            alignSelf: "center", // Overrides 'alignItems' property of parent.
            marginLeft: globalProps.fontSizeStandard,
        },

        btnRemove:
        {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#b30202",
            width: 3 * globalProps.fontSizeStandard,
            paddingVertical: 0.35 * globalProps.fontSizeStandard,
        }
    }
);

PrevPlayerLabel.propTypes =
{
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

PrevPlayerLabel.defaultProps =
{
    isSelected: false,
}

export default PrevPlayerLabel;