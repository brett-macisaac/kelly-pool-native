import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

// import "./style_pool_ball.css";

// import gColoursBalls from '../../../../utils/colours_pool_balls.js';

gColoursBalls = 
[
    { primary: "#101010", secondary: "#101010" }, // Colours for when the ball has been potted (maybe just grey).

    { primary: "#e2e202", secondary: "#e2e202" }, // 1; solid; yellow.
    { primary: "#0000ff", secondary: "#0000ff" }, // 2; solid; light blue.
    { primary: "#dd1111", secondary: "#dd1111" }, // 3; solid; light red.
    { primary: "#6d056d", secondary: "#6d056d" }, // 4; solid; purple.
    { primary: "#ffae00", secondary: "#ffae00" }, // 5; solid; orange.
    { primary: "#025302", secondary: "#025302" }, // 6; solid; green.
    { primary: "#8b0000", secondary: "#8b0000" }, // 7; solid; dark red.

    { primary: "#000000", secondary: "#000000" }, // 8; solid; black.

    { primary: "#e2e201", secondary: "#ffffff" }, // 9; stripes; yellow.
    { primary: "#0000ff", secondary: "#ffffff" }, // 10; stripes; light blue.
    { primary: "#dd1111", secondary: "#ffffff" }, // 11; stripes; light red.
    { primary: "#6d056d", secondary: "#ffffff" }, // 12; stripes; purple.
    { primary: "#ffae00", secondary: "#ffffff" }, // 13; stripes; orange.
    { primary: "#025302", secondary: "#ffffff" }, // 14; stripes; green.
    { primary: "#8b0000", secondary: "#ffffff" }, // 15; stripes; dark red.
];

const gColourTertiary = "#ffffff";
const gColourTertiaryPotted = "#606060";
const gColourTertiarySelected = "#7c6a04";
const gColourFont = "#000000";
const gColourFontSelected = "#ffffff";

function PoolBall(props)
{
    let lColourPrimary = props.potted ? gColoursBalls[0].primary : gColoursBalls[props.number].primary;
    let lColourSecondary = props.potted ? gColoursBalls[0].secondary : gColoursBalls[props.number].secondary;
    let lColorTertiary = props.potted ? gColourTertiaryPotted : gColourTertiary;

    if (props.selected)
        lColorTertiary = gColourTertiarySelected;
    
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