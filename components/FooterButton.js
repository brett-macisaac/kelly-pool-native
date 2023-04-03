import { StyleSheet } from 'react-native';

import { keyProperties as gGlobalProperties } from "../styles.js";

import CustomButton from './CustomButton.js';

function FooterButton({ text, onPress })
{
    return (
        <CustomButton 
            text = { text }
            onPress = { onPress }
            style = { styles.btnFooter }
            styleText = { styles.textBtnFooter }
        />
    );
}

const styles = StyleSheet.create(
    {
        btnFooter:
        {
            width: "90%",
            maxWidth: 500,
            alignItems: "center",
            padding: 10,
            backgroundColor: gGlobalProperties.colourPage,
            borderRadius: gGlobalProperties.borderRadiusStandard
        },
        textBtnFooter: 
        {
            fontSize: Math.floor(gGlobalProperties.fontSizeStandard * 1.25),
            fontWeight: 600,
            color: "#FFF",
        }
    }
);

export default FooterButton;