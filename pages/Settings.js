import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Alert, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import globalProps, { utilsGlobalStyles } from '../styles';
import consts from '../utils/constants.js';
import utils from '../utils/utils.js';
import { useContext } from "react";
import optionsHeaderButtons from '../components/options_header_buttons.js';

import ThemeContext from "../contexts/ThemeContext.js";
import ButtonStandard from '../components/ButtonStandard.js';
import ButtonNextPage from '../components/ButtonNextPage';
import TextStandard from '../components/TextStandard.js';
import PageContainer from '../components/PageContainer.js';

function Settings({ navigation }) 
{
    // The name of the current theme and the function that handles updating it.
    const { themeName, updateTheme } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];


    return ( 
        <PageContainer
            navigation = { navigation }
            optionsLeftHeaderButtons = { [ optionsHeaderButtons.back ] }
            style = {{ paddingHorizontal: 15, paddingVertical: globalProps.spacingVertBase, alignItems: "center" }}
        >

            <ButtonNextPage 
                text = "Themes" 
                sizeText = { 1 }
                isBold
                icon = { 
                    <MaterialCommunityIcons 
                        name = "theme-light-dark" color = { theme.fontButtonContent } 
                        size = { globalProps.sizeIconHeaderFooter } 
                    /> 
                }
                onPress = { () => navigation.navigate("settingsThemes") }
                style = {{ marginBottom: utilsGlobalStyles.spacingVertN() }}
            />
            <ButtonNextPage 
                text = "Help" 
                sizeText = { 1 }
                isBold
                icon = { 
                    <MaterialCommunityIcons 
                        name = "help" color = { theme.fontButtonContent } 
                        size = { globalProps.sizeIconHeaderFooter } 
                    /> 
                }
                onPress = { () => navigation.navigate("gameInfo") }
            />

        </PageContainer>
    );
}

const styles = StyleSheet.create(
    {
        conButtonTheme:
        {
            alignItems: "center",
            // justifyContent: "center"
        }
    }
);

export default Settings;