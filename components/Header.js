import { View, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";
import globalProps from '../styles';
import TextStandard from './TextStandard';
import buttonsHeader from "./buttons_header";

/*
* The custom header component that's used by the PageContainer component.

* Props:
    > navigation: the object that allows for navigation to pages in the app.
    > nameBtnLeft: the name of the left button, which refers directly to a component from buttonsHeader.
    > nameBtnRight: the name of the right button, which refers directly to a component from buttonsHeader.
*/
const Header = ({ navigation, nameBtnLeft, nameBtnRight }) => 
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    // The left and right buttons.
    const BtnLeft = buttonsHeader[nameBtnLeft];
    const BtnRight = buttonsHeader[nameBtnRight];
  
    return (
        <View 
            style = {{ 
                ...styles.container, backgroundColor: theme.header, borderBottomColor: theme.borders, zIndex: 1
            }}
        >

            <View style = { { ...styles.innerContainer, ...styles.leftContainer } }>
                { 
                    BtnLeft && (
                        <BtnLeft 
                            navigation = { navigation }
                        />
                    )
                }
            </View>

            <View style = { { ...styles.innerContainer, ...styles.middleContainer } }>
                <Image 
                    style = {{ 
                        height: 45, width: 45, borderRadius: 45 / 2, 
                        borderWidth: 1, borderColor: theme.borders
                     }} 
                     source = { require("../assets/logo192.png") } 
                />
            </View>

            <View style = { { ...styles.innerContainer, ...styles.rightContainer } }>
                { 
                    BtnRight && (
                        <BtnRight
                            navigation = { navigation } 
                        />
                    )
                }
            </View>

        </View>
    );
};

// An 'enum' for the available buttons.
Header.buttonNames =  
{
    none: "none", // i.e. no button.
    back: "back",
    menu: "menu",
    settings: "settings",
}

Header.propTypes =
{
    navigation: PropTypes.object.isRequired,
    nameBtnLeft: PropTypes.oneOf(Object.keys(Header.buttonNames)),
    nameBtnRight: PropTypes.oneOf(Object.keys(Header.buttonNames))
};

Header.defaultProps =
{
    nameBtnLeft: Header.buttonNames.none,
    nameBtnRight: Header.buttonNames.none
}

const styles = StyleSheet.create(
    {
        container: 
        {
            flexDirection: "row",
            alignItems: "center",
            height: globalProps.heightHeader,
            borderBottomWidth: 1,
        },
        innerContainer: 
        {
            width: "33%",
            flexGrow: 1,
        },
        leftContainer:
        {
            alignItems: "flex-start"
        },
        middleContainer:
        {
            alignItems: "center"
        },
        rightContainer:
        {
            alignItems: "flex-end"
        }
    }
);

export default Header;