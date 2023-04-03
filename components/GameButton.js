import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { keyProperties as gGlobalProperties } from "../styles.js";

import CustomButton from './CustomButton.js';

function GameButton({ text, onPress })
{
    return (
        <CustomButton 
            text = { text }
            onPress = { onPress }
            style = { styles.btnGame }
            styleText = { styles.textBtnGame }
        />
    );
}

const styles = StyleSheet.create(
    {
        btnGame:
        {
            width: "100%",
            maxWidth: 500,
            alignItems: "center",
            padding: 10,
            backgroundColor: "#000",
            borderRadius: gGlobalProperties.borderRadiusStandard,
            // marginBottom: gGlobalProperties.spacingStandard
        },
        textBtnGame: 
        {
            fontSize: Math.floor(gGlobalProperties.fontSizeStandard * 1.25),
            fontWeight: 600,
            color: "#FFF",
        }
    }
);

GameButton.propTypes =
{
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    // removeTopMargin: false
};

GameButton.defaultProps =
{
}

export default GameButton;