import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import globalProps from "../styles.js";

import ButtonStandard from './ButtonStandard.js';

function GameButton({ text, onPress })
{
    return (
        <ButtonStandard 
            text = { text }
            isBold
            sizeText = { 1 }
            onPress = { onPress }
            style = { styles.btnGame }
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
            // backgroundColor: "#000",
            borderRadius: globalProps.borderRadiusStandard,
        },
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