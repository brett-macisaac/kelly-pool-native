import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";
import TextStandard from './TextStandard.js';
import gColoursBalls from '../utils/colours_pool_balls.js';
import globalProps, { utilsGlobalStyles } from "../styles.js";
import utils from '../utils/utils.js';

const fontSize = Math.floor(utilsGlobalStyles.fontSizeN(1));

function PlayerLabel({ name, ballCount, place, isSelected, showCount, onClick, emboldenName })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    const lStyleBallCount = { backgroundColor: gColoursBalls[ballCount].primary };

    if (!showCount)
        lStyleBallCount["opacity"] = 0;
   
    return (
        <TouchableOpacity 
            style = { 
                isSelected ? { ...styles.conOuter, backgroundColor: theme.selected } : 
                             { ...styles.conOuter, backgroundColor: theme.header } 
            }
            onPress = { onClick }
            activeOpacity = { 1.0 }
        >
            {
                place > 0 && (
                    <View style = { { ...styles.conCount, backgroundColor: gColoursBalls[place].primary } }>
                        <View style = { { ...styles.conCircle } }>
                            <TextStandard text = { `${place}${utils.OrdinalSuffix(place)}` } size = { -1 } isBold style = {{ color: "#000" }} />
                        </View>
                    </View>
                )
            }

            <View style = { { ...styles.conName, marginLeft: place > 0 ? 0 : fontSize } }>
                <TextStandard text = { name } isBold = { emboldenName } size = { 1 } />
            </View>

            <View style = {{ ...styles.conCount, ...lStyleBallCount }}>
                <View style = { styles.conCircle }>
                    <TextStandard text = { ballCount } size = { 1 } isBold style = {{ color: "#000" }} />
                </View>
            </View>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        conOuter:
        {
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "space-between",
            borderRadius: fontSize * 0.5,
            overflow: "hidden"
        },

        conName:
        {
            alignSelf: "center", // Overrides 'alignItems' property of parent.
            marginLeft: fontSize,
        },

        conCount:
        {
            alignItems: "center",
            justifyContent: "center",
            width: 3 * fontSize,
            paddingVertical: 0.35 * fontSize,
        },
        conCircle:
        {
            alignItems: "center",
            justifyContent: "center",
            width: 1.75 * fontSize,
            height: 1.75 * fontSize,
            borderRadius: (1.75 * fontSize) / 2,
            backgroundColor: "#FFF"
        },

        conPlace:
        {
            width: 3.25 * fontSize
        },
        conCirclePlace:
        {
            width: 2.3 * fontSize,
            height: 2.3 * fontSize,
            borderRadius: (2.3 * fontSize) / 2
        }

    }
);

PlayerLabel.propTypes =
{
    name: PropTypes.string.isRequired,
    ballCount: PropTypes.number.isRequired,
    place: PropTypes.number,
    isSelected: PropTypes.bool,
    showCount: PropTypes.bool,
    onClick: PropTypes.func,
    emboldenName: PropTypes.bool,
};

PlayerLabel.defaultProps =
{
    place: -1,
    isSelected: false,
    showCount: true,
    onClick: undefined,
    emboldenName: false
}

export default PlayerLabel;