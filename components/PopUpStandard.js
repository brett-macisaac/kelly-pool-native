import { View, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from "react";

import TextStandard from './TextStandard';
import ButtonStandard from './ButtonStandard';
import ThemeContext from "../contexts/ThemeContext.js";
import globalProps, { utilsGlobalStyles } from '../styles';

/*
* A customisable button component which by default implements the app's global theme.

* Props:
    > icon: a component such as a vector image from a library like MaterialCommunityIcons. For more icons, see the
            following link: https://oblador.github.io/react-native-vector-icons/.
    > text: the text that is displayed on the button.
    > sizeText: the size of the text. IMPORTANT: this is not fontSize, but rather the 'rank' of the fontSize (see 
                styles_global.js for more info).
    > isBold: whether the text is bold.
    > onPress: the function that is called when the button is pressed.
    > style: the style of the component's container.
    > styleText: the style of the text within the container. The TextStandard component is used here, so refer to that
                 component's code for information regarding how styling is applied.
*/
function PopUpStandard({ title, message, buttons, removePopUp })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <Modal
            visible = { true }
            transparent
            onRequestClose = { removePopUp }
        >

            <TouchableOpacity
                onPress = { removePopUp }
                style = {{ 
                    backgroundColor: theme.header + "99",
                    ...styles.container,
                }}
                activeOpacity = { 1 }
            >

                <TouchableOpacity
                    style = {{
                        backgroundColor: theme.content,
                        borderColor: theme.borders,
                        ...styles.alertBox
                    }}
                    activeOpacity = { 1.0 }
                >
                    {/* Title */}
                    <TextStandard text = { title } size = { 1 } isBold />

                    {/* Message */}
                    <TextStandard text = { message } />

                    {/* Buttons */}
                    {
                        buttons.map(
                            (button, index) =>
                            {
                                return (
                                    <ButtonStandard 
                                        text = { button.text } 
                                        sizeText = { 1 }
                                        isBold
                                        onPress = { 
                                            () => 
                                            { 
                                                removePopUp();

                                                if (button.onPress) 
                                                    button.onPress(); 
                                            }
                                        }
                                        style = { styles.button }
                                        key = { index }
                                    />
                                )
                            }
                        )
                    }
                </TouchableOpacity>
                
            </TouchableOpacity>

        </Modal>
    );
}

PopUpStandard.propTypes =
{
    title: PropTypes.string,
    message: PropTypes.string,
    buttons: PropTypes.arrayOf(
        PropTypes.shape(
            {
                text: PropTypes.string.isRequired,
                onPress: PropTypes.func
            }
        )
    ),
    removePopUp: PropTypes.func.isRequired
};

PopUpStandard.defaultProps =
{
    title: "",
    message: "",
}

const styles = StyleSheet.create(
    {
        container:
        {
            alignItems: "center",
            justifyContent: "center", 
            flex: 1,
            paddingHorizontal: utilsGlobalStyles.spacingVertN(-1),
        },
        alertBox: 
        {
            width: Dimensions.get("screen").width * 0.8,
            borderWidth: 1,
            rowGap: utilsGlobalStyles.spacingVertN(-1),
            padding: utilsGlobalStyles.fontSizeN(),
            borderRadius: globalProps.borderRadiusStandard
        },
        button:
        {
            paddingVertical: utilsGlobalStyles.fontSizeN() / 2,
            borderRadius: globalProps.borderRadiusStandard
        }
    }
);

function PopUpOk(title, message, onPress)
{
    return {
        title: title,
        message: message,
        buttons: [
            { text: "OK", onPress: onPress }
        ]
    }
}

export { PopUpStandard as default, PopUpOk };