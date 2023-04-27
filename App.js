import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import utils from './utils/utils.js';
import globalProps, { utilsGlobalStyles } from "./styles";
import ThemeContext from './contexts/ThemeContext';
import pages from './pages/pages';

const Stack = createNativeStackNavigator();

/* Ideas
* Keep track of how many times each player has won. Advanced feature, implement later.
*/

export default function App() 
{
    // Acquire global theme.
    const [ themeName, setThemeName ] = useState(globalProps.themeDefault);
    let theme = globalProps.themes[themeName];

    /*
    * Updates the themeName.

    * Parameters:
        > newThemeName: the name of the theme that will be set.
    */
    const updateTheme = (newThemeName) =>
    {
        if (!newThemeName)
        {
            console.log("No theme name provided!");
            return;
        }

        setThemeName(newThemeName);

        /*
        * Set the background colour of the root view. The root view is generally not visible, but can appear when 
        opening the keyboard. It's white by default, which might be jarring if the theme is black.
        */
        SystemUI.setBackgroundColorAsync(globalProps.themes[newThemeName].content);

        // Locally store the new theme's name.
        utils.SetInAsyncStorage("themeName", newThemeName);
    };

    /*
    * Set the theme to the one stored locally on the user's device; if there isn't a stored theme, the default is used.
    * This function is called only once at start-up to set the app's theme.
    */
    useEffect(
        () =>
        {
            // A function that retrieves the stored theme and then updates themeName.
            const getAndSetTheme = async function() 
            {
                const storedThemeName = await utils.GetFromAsyncStorage("themeName", globalProps.themeDefault);

                setThemeName(storedThemeName);

                SystemUI.setBackgroundColorAsync(globalProps.themes[storedThemeName].content);
            };

            getAndSetTheme();
        },
        []
    );


    return ( 
        <SafeAreaProvider>
            <>
                {/* Set colour of the status bar based on the current theme. */}
                <StatusBar style = { utilsGlobalStyles.isThemeDark(themeName) ? "light" : 'dark' }  />
            </>

            <SafeAreaView style = { { flex: 1, backgroundColor: theme.header } }>

                {/* 
                * This context gives each child component (incl. their descendants) access to the themeName variable.
                */}
                <ThemeContext.Provider value = {{ themeName, updateTheme }}>

                    <NavigationContainer
                        theme = {{
                            colors: { background: theme.content, },
                        }}
                    >

                        <Stack.Navigator 
                            screenOptions = {{ 
                                headerShown: false,
                                animation: 'none', // disable transition animations 
                            }}
                            initialRouteName = "menu"
                        >
                            <Stack.Screen
                                name = "menu"
                                component = { pages.menu }
                            />

                            <Stack.Screen
                                name = "settings"
                                component = { pages.settings }
                            />
                            <Stack.Screen
                                name = "settingsThemes"
                                component = { pages.settingsThemes }
                            />

                            <Stack.Screen 
                                name = "gameInfo" 
                                component = { pages.gameInfo }
                            />
                            <Stack.Screen
                                name = "gameParameters"
                                component = { pages.gameParameters }
                            />
                            <Stack.Screen 
                                name = "prevNames" 
                                component = { pages.prevNames }
                            />
                            <Stack.Screen 
                                name = "playerNames" 
                                component = { pages.playerNames }
                            />
                            <Stack.Screen 
                                name = "game" 
                                component = { pages.game }
                            />
                        </Stack.Navigator>

                    </NavigationContainer>

                </ThemeContext.Provider>

            </SafeAreaView>

        </SafeAreaProvider>
    );

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#000",
            // alignItems: 'center',
            // justifyContent: 'center',
        },
    }
);
