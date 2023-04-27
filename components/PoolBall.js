import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';

import globalProps from "../styles.js";

import ThemeContext from "../contexts/ThemeContext.js";
import gColoursBalls from '../utils/colours_pool_balls.js';


const gColourTertiary = "#ffffff";
const gColourTertiaryPotted = "#606060";
const gColourFont = "#000000";
const gColourFontSelected = "#ffffff";

function PoolBall(props)
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    let lColourPrimary = props.potted ? gColoursBalls[0].primary : gColoursBalls[props.number].primary;
    let lColourSecondary = props.potted ? gColoursBalls[0].secondary : gColoursBalls[props.number].secondary;
    let lColorTertiary = props.potted ? gColourTertiaryPotted : gColourTertiary;

    if (props.selected)
        lColorTertiary = theme.selected;
    
    const lColourFont = props.selected ? gColourFontSelected : gColourFont;

    const lStyleBall = { 
        backgroundColor: lColourSecondary,
        width: props.sizeBall,
        height: props.sizeBall,
        borderRadius: props.sizeBall / 2,
        paddingVertical:props.sizeBall * 1 / 6,
        paddingHorizontal: 0,
        marginTop: props.marginSize,
        marginRight: props.marginSize,
        marginBottom: props.marginSize,
        marginLeft: props.marginSize
    };

    if (!props.margins[0])
        lStyleBall.marginTop = 0;

    if (!props.margins[1])
        lStyleBall.marginRight = 0;

    if (!props.margins[2])
        lStyleBall.marginBottom = 0;

    if (!props.margins[3])
        lStyleBall.marginLeft = 0;

    const lStyleStripe = {
        backgroundColor: lColourPrimary,
        width: props.sizeBall,
        height: props.sizeBall * 2 / 3,
        paddingVertical: props.sizeBall * 1 / 12,
        paddingHorizontal: 0
    };

    const lStyleNumber = {
        backgroundColor: lColorTertiary,
        width: props.sizeBall * 1 / 2,
        height: props.sizeBall * 1 / 2,
        borderRadius: props.sizeBall * 1 / 4,
    };

    const lFontSize = props.sizeBall * 27 / 100;

    return (
        <View style = { { ...styles.poolBall, ...lStyleBall } }>
            <View style = { { ...styles.poolBallStripe, ...lStyleStripe, } }>
                <View style = { { ...styles.poolBallNumberCircle, ...lStyleNumber } } >
                    <Text style = { { ...styles.poolBallNumber, color: lColourFont, fontSize: lFontSize } }>{ props.number }</Text>
                </View>
            </View>
        </View>
    );
}

PoolBall.propTypes =
{
    number: PropTypes.number.isRequired,
    potted: PropTypes.bool.isRequired,
    margins: PropTypes.array.isRequired,
    selected: PropTypes.bool,
    sizeBall: PropTypes.number
};

PoolBall.defaultProps =
{
    number: 11,
    potted: false,
    margins: Array(4).fill(false),
    selected: false,
    marginSize: PropTypes.number,
    sizeBall: PropTypes.number
}

const styles = StyleSheet.create(
    {
        poolBall: 
        {
            // borderRadius: "50%",
            overflow: "hidden",
        },
        poolBallStripe: 
        {
            // display: "flex",
            alignItems: "center",
            justifyContent: "center"

            // width: "100%"
        },
        poolBallNumberCircle: 
        {
            /* Centre the text */
            // display: "flex",
            alignItems: "center",
            justifyContent: "center",

            // borderRadius: "50%",

            margin: "auto",

            textAlign: "center",

            backgroundColor: "white",
            color: "black",

            fontWeight: "bold",

            // fontFamily: "Verdana",
        },
        poolBallNumber:
        {
            fontWeight: "bold"
        }

    }
);

export default PoolBall;