import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from "react";

import TextStandard from './TextStandard';
import ThemeContext from "../contexts/ThemeContext.js";
import globalProps, { utilsGlobalStyles } from '../styles';

/*
* A customisable button component which by default implements the app's global theme.

* Props:
    > themeName: the name of the theme. This should correspond to a theme from globalThemes (defined in styles_global).
    > onPress: the function that is called when the button is pressed.
    > height: the component's height
    > width: the component's width.
    > isSelected: whether the component is selected (this should be done using the onPress prop).
*/
function ButtonTheme({ themeName, onPress, height, width, isSelected })
{
    let theme = globalProps.themes[themeName];

    if (!theme)
        theme = globalProps.themes[globalProps.themeDefault];

    return (
        <TouchableOpacity
            onPress = { onPress }
            style = {{ 
                backgroundColor: theme.buttonContent,
                borderColor: theme.selected,
                height: height,
                width: width,
                borderWidth: isSelected ? 3 : 0,
                ...styles.container,
            }}
            activeOpacity = { 0.8 } // Changes the component's opacity when pressed.
        >

            <View 
                style = {{ 
                    ...styles.headerOrNavBar, ...styles.header, backgroundColor: theme.header, 
                    borderColor: theme.borders  
                }}
            >
            </View>

            <View style = {{ ...styles.content, backgroundColor: theme.content }}>
            </View>

            <View 
                style = {{ 
                    ...styles.headerOrNavBar, ...styles.navBar, backgroundColor: theme.navBar, 
                    borderColor: theme.borders 
                }}
            >
            </View>

        </TouchableOpacity>
    );
}

ButtonTheme.propTypes =
{
    themeName: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
};

ButtonTheme.defaultProps =
{
    height: 100,
    width: 45,
}

const styles = StyleSheet.create(
    {
        container:
        {
            flexDirection: "column",
            borderRadius: globalProps.borderRadiusStandard,
            overflow: "hidden",
            // alignItems: "center",
            // justifyContent: "center"
        },
        content: 
        {
            flexGrow: 70
        },
        headerOrNavBar:
        {
            flexGrow: 15
        },
        header:
        {
            borderBottomWidth: 1
        },
        navBar:
        {
            borderTopWidth: 1
        }   
    }
);

export default ButtonTheme;