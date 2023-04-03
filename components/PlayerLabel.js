import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import gColoursBalls from '../utils/colours_pool_balls.js';
import { keyProperties as gGlobalProperties } from "../styles.js";
import utils from '../utils/utils.js';

const gFontSize = Math.floor(gGlobalProperties.fontSizeStandard * 1.25);

function PlayerLabel({ name, ballCount, place, isSelected, showCount, onClick, emboldenName })
{
    const lStyleBallCount = { backgroundColor: gColoursBalls[ballCount].primary };

    if (!showCount)
        lStyleBallCount["opacity"] = 0;
   
    return (
        <TouchableOpacity 
            style = { isSelected ? { ...styles.conOuter, ...styles.conOuterSelected } : styles.conOuter }
            onPress = { onClick }
            activeOpacity = { 1.0 }
        >
            {
                place > 0 && (
                    <View style = { { ...styles.conCount, ...styles.conPlace, backgroundColor: gColoursBalls[place].primary } }>
                        <View style = { { ...styles.conCircle, ...styles.conCirclePlace } }>
                            <Text style = { { ...styles.textConCircle, ...styles.textConCirclePlace }  }>
                                { place }{ utils.OrdinalSuffix(place) }
                            </Text>
                        </View>
                    </View>
                )
            }

            <View style = { styles.conName }>
                <Text style = { { ...styles.textConName, fontWeight: emboldenName ? 600 : "normal" }  }>{ name }</Text>
            </View>

            <View style = { { ...styles.conCount, ...lStyleBallCount } }>
                <View style = { styles.conCircle }>
                    <Text style = { styles.textConCircle  }>{ ballCount }</Text>
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
            // width: "100%",
            // marginBottom: 30,
            backgroundColor: "#000",
            borderRadius: gFontSize * 0.5,
            overflow: "hidden"
        },
        conOuterSelected:
        {
            backgroundColor: gGlobalProperties.colourSelected
        },

        conName:
        {
            alignSelf: "center", // Overrides 'alignItems' property of parent.
            marginLeft: gFontSize,
        },
        textConName:
        {
            fontFamily: gGlobalProperties.fontFamilyMono,
            fontSize: gFontSize,
            color: "#FFF",
        },

        conCount:
        {
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#FFF",
            width: 3 * gFontSize,
            paddingVertical: 0.35 * gFontSize,
        },
        conCircle:
        {
            alignItems: "center",
            justifyContent: "center",
            width: 1.75 * gFontSize,
            height: 1.75 * gFontSize,
            borderRadius: (1.75 * gFontSize) / 2,
            backgroundColor: "#FFF"
        },
        textConCircle:
        {
            fontSize: gFontSize,
            color: "#000",
            fontWeight: 600
        },

        conPlace:
        {
            width: 3.25 * gFontSize
        },
        conCirclePlace:
        {
            width: 2.3 * gFontSize,
            height: 2.3 * gFontSize,
            borderRadius: (2.3 * gFontSize) / 2
        },
        textConCirclePlace:
        {
            fontSize: 0.8 * gFontSize
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