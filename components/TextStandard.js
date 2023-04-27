
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";
import globalProps, { utilsGlobalStyles } from '../styles';

/*
* A component that returns a simple React Native Text element that adheres to the app's global theme and styling, as 
  defined in the file 'styles_global.js'.

* Props:
    > text: The text to be rendered.
    > size: the size of the text. IMPORTANT: this is not fontSize, but rather the 'rank' of the fontSize (see 
      styles_global.js for more info).
    > isBold: whether the text is bold.
    > style: any additional styling to apply to the Text element. Note that fontWeight and fontSize
      attributes will be overridden by the global styles.
    > c: a boolean that, when true, indicates that linebreaks should be removed before rendering the 
      text.
        
*/
function TextStandard({ text, size, isBold, isMonospace, style, removeLineBreaks })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    if (removeLineBreaks)
    {
        text = text.replace(/\r?\n|\r/g, '');
    }

    return (
        <Text 
            style = {{ 
                color: theme.font,
                ...style, 
                fontWeight: isBold ? globalProps.fontWeightBold : 'normal', 
                fontSize: utilsGlobalStyles.fontSizeN(size),
                fontFamily: isMonospace ? globalProps.fontFamilyMono : ""
            }} 
        >
            { text }
        </Text>
    );
}

TextStandard.propTypes =
{
    text: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]).isRequired,
    size: PropTypes.number,
    isBold: PropTypes.bool,
    style: PropTypes.object,
    removeLineBreaks: PropTypes.bool
};

TextStandard.defaultProps =
{
    size: 0,
    isBold: false,
    style: {},
    removeLineBreaks: false
}

export default TextStandard;