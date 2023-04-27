import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from "react";

import TextStandard from './TextStandard';
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
function ButtonStandard({ icon, text, sizeText, isBold, onPress, style, styleText })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return (
        <TouchableOpacity
            onPress = { onPress }
            style = {{ 
                backgroundColor: theme.buttonContent,
                borderColor: theme.borders,
                ...styles.button, 
                ...style 
            }}
            activeOpacity = { 0.8 } // Changes the component's opacity when pressed.
        >
            {/* The button's icon. If present, the icon is placed above text. */}
            { icon }

            {/* The button's text. */}
            {
                text && (
                    <TextStandard 
                        text = { text } 
                        size = { sizeText } 
                        isBold = { isBold } 
                        style = {{ 
                            color: theme.fontButtonContent, ...styleText, textAlign: "center" 
                        }}
                    />
                )
            }
        </TouchableOpacity>
    );
}

ButtonStandard.propTypes =
{
    icon: PropTypes.node,
    text: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    sizeText: PropTypes.number,
    isBold: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.object,
    styleText: PropTypes.object,
};

ButtonStandard.defaultProps =
{
    text: "",
    sizeText: 0,
    isBold: false,
    style: {},
    styleText: {}
}

const styles = StyleSheet.create(
    {
        button:
        {
            alignItems: "center",
            justifyContent: "center"
        }
    }
);

export default ButtonStandard;