import { View, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";
import globalProps from '../styles';
import TextStandard from './TextStandard';
import buttonsHeader from "./options_header_buttons";
import HeaderButton from "./HeaderButton.js";

/*
headerLeft: 
{
    icon: (size, colour) =>
    {
        return <Ionicons name = "home" color = { colour }  size = { size } />
    },
    onPress: (setOptionsPopUpMsg) => 

}
*/

/*
* The custom header component that's used by the PageContainer component.

* Props:
    > navigation: the object that allows for navigation to pages in the app.
    > nameBtnLeft: the name of the left button, which refers directly to a component from buttonsHeader.
    > nameBtnRight: the name of the right button, which refers directly to a component from buttonsHeader.
    > optionsLeftButtons: an array of options for each of the header buttons placed on the left. Each element is an 
      object that has three properties: icon, onPress, and left. The icon is a function that takes a parameter list of 
      (size, colour) and returns a vector icon (such as from Ionicons) that uses the size and colour arguments for its 
      corresponding props. The onPress prop is a function that's called when the icon is clicked.
    > optionsRightButtons: same as optionsLeftButtons but for the buttons on the right.
*/
const Header = ({ navigation, optionsLeftButtons, optionsRightButtons, setOptionsPopUpMsg }) => 
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];
  
    return (
        <View 
            style = {{ 
                ...styles.container, backgroundColor: theme.header, borderBottomColor: theme.borders, zIndex: 1
            }}
        >

            <View style = { { ...styles.sideContainer, ...styles.leftContainer } }>
                {
                    optionsLeftButtons && optionsLeftButtons.map(
                        (options, index) =>
                        {
                            return (
                                <HeaderButton 
                                    key = { index }
                                    icon = { options.icon }
                                    onPress = { 
                                        () => { options.onPress(navigation, setOptionsPopUpMsg) } 
                                    }
                                />
                            )
                        }
                    )
                }
            </View>

            <View>
                <Image 
                    style = {{ 
                        height: 45, width: 45, borderRadius: 45 / 2, 
                        borderWidth: 1, borderColor: theme.borders
                     }} 
                     source = { require("../assets/logo192.png") } 
                />
            </View>

            <View style = { { ...styles.sideContainer, ...styles.rightContainer } }>
            {
                optionsRightButtons && optionsRightButtons.map(
                    (options, index) =>
                    {
                        return (
                            <HeaderButton 
                                key = { index }
                                icon = { options.icon }
                                onPress = { 
                                    () => { options.onPress(navigation, setOptionsPopUpMsg) } 
                                }
                            />
                        )
                    }
                )
            }
            </View>

        </View>
    );
};

Header.propTypes =
{
    navigation: PropTypes.object.isRequired,
    optionsLeftButtons: PropTypes.arrayOf(
        PropTypes.shape(
            {
                icon: PropTypes.func.isRequired,
                onPress: PropTypes.func.isRequired
            }
        )
    ),
    optionsRightButtons: PropTypes.arrayOf(
        PropTypes.shape(
            {
                icon: PropTypes.func.isRequired,
                onPress: PropTypes.func.isRequired
            }
        )
    ),
    setOptionsPopUpMsg: PropTypes.func
};

Header.defaultProps =
{
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
        sideContainer: 
        {
            width: 1,
            flexGrow: 1,
            flexDirection: "row"
        },
        leftContainer:
        {
            justifyContent: "flex-start",
        },
        rightContainer:
        {
            justifyContent: "flex-end",
        }
    }
);

export default Header;