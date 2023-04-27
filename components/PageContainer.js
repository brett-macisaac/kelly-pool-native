import { View, ScrollView, Keyboard, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';

import globalProps, { utilsGlobalStyles } from "../styles.js";
import ThemeContext from "../contexts/ThemeContext.js";
import Header from './Header.js';
import NavBar from './NavBar.js';

/* 
* This is the parent component of every page, meaning that it should wrap every page of the application.
* Expected Behaviour: if the supplied children elements do not fill the entire vertical space between the header and 
  footer, the container is expected to take 100% of this space. This is ideal because one may want to center the content
  vertically, such as on a log-in screen, where the input fields are typically centered.
* Note: padding is applied both vertically and horizontally by default, but this can be overridden by the style prop.

* Props:
    > children: any children components.
    > navigation: the navigation object.
    > headerButtonLeft: the name of the button to be displayed on the left portion of the header. This should correspond
      to a value of Header.buttonNames.
    > headerButtonRight: the name of the button to be displayed on the right portion of the header. This should 
      correspond to a value of Header.buttonNames.
    > style: an optional styling object for the container of the content.
*/
function PageContainer({ children, navigation, buttonNavBarText, buttonNavBarHandler, headerButtonLeft,
                         headerButtonRight, style })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    // Whether the (onscreen) keyboard is displayed.
    const [ isKeyboardActive, setIsKeyboardActive ] = useState(false);

    /*
    * Setup the event listeners that are responsible for setting isKeyboardActive.
    */
    useEffect(
        () => 
        {
            const showSubscription = Keyboard.addListener(
                'keyboardDidShow', 
                () => 
                {
                    setIsKeyboardActive(true);
                }
            );

            const hideSubscription = Keyboard.addListener(
                'keyboardDidHide', 
                () => 
                {
                    setIsKeyboardActive(false);
                }
            );

            return () => 
            {
                showSubscription.remove();
                hideSubscription.remove();
            };
        }, 
        []
    );

    return ( 
        <View style = {{ flex: 1, backgroundColor: theme.content }}>

            <Header 
                navigation = { navigation }
                nameBtnLeft = { headerButtonLeft }
                nameBtnRight = { headerButtonRight }
            />

            <ScrollView 
                vertical = {true}
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{ ...styles.content, ...style, flexGrow: 1 }}
            > 
                { children }
            </ScrollView>

            {
                ((buttonNavBarText && buttonNavBarHandler) && !isKeyboardActive) && (
                    <NavBar
                        text = { buttonNavBarText }
                        onPress = { buttonNavBarHandler }
                    />
                )
            }

        </View>
    );
}

PageContainer.propTypes =
{
    children: PropTypes.node,
    navigation: PropTypes.object.isRequired,
    buttonNavBarText: PropTypes.string,
    buttonNavBarHandler: PropTypes.func,
    headerButtonLeft: PropTypes.string,
    headerButtonRight: PropTypes.string,
    style: PropTypes.object,
};

PageContainer.defaultProps =
{
    showHeader: true,
    showNavBar: true,
    buttonNavBarText: "",
    buttonNavBarHandler: undefined,
    headerButtonLeft: "none",
    headerButtonRight: "none",
    style: {}
}

const styles = StyleSheet.create(
    {
        content: 
        {
            alignItems: 'center',
            paddingVertical: utilsGlobalStyles.spacingVertN(),
        }
    }
)


export default PageContainer;