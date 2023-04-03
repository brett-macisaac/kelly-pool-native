import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// import gColoursBalls from '../utils/colours_pool_balls.js';
import { keyProperties as gGlobalProperties } from "../styles.js";
// import utils from '../utils/utils.js';

import CheckBox from './CheckBox.js';

function PrevPlayerLabel({ name, isSelected, onSelect, onRemove })
{   
    return (
        <View 
            style = { styles.conOuter }
            activeOpacity = { 1.0 }
        >
            <CheckBox text = { name } isChecked = { isSelected } onPress = { onSelect } />

            <TouchableOpacity style = { styles.btnRemove } onPress = { onRemove } activeOpacity = { 1.0 }>
                <Text style = { styles.textBtnRemove }>—</Text>
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
            // width: "100%",
            // marginBottom: 30,
            backgroundColor: "#000",
            borderRadius: gGlobalProperties.fontSizeStandard * 0.5,
            overflow: "hidden"
        },

        conName:
        {
            alignSelf: "center", // Overrides 'alignItems' property of parent.
            marginLeft: gGlobalProperties.fontSizeStandard,
        },
        textConName:
        {
            fontSize: gGlobalProperties.fontSizeStandard,
            color: "#FFF",
        },

        btnRemove:
        {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#b30202",
            width: 3 * gGlobalProperties.fontSizeStandard,
            paddingVertical: 0.35 * gGlobalProperties.fontSizeStandard,
        },
        textBtnRemove:
        {
            fontSize: 2 * gGlobalProperties.fontSizeStandard,
            color: "#FFF",
            fontWeight: 600
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