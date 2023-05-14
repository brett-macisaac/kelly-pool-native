import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';

import globalProps, { utilsGlobalStyles } from '../styles';
import optionsHeaderButtons from '../components/options_header_buttons.js';

import ButtonStandard from '../components/ButtonStandard.js';
import PageContainer from '../components/PageContainer.js';

function Menu({ navigation }) 
{
    return ( 
        <PageContainer
            navigation = { navigation }
            optionsRightHeaderButtons = { [ optionsHeaderButtons.settings ] }
            style = {{ justifyContent: "center", alignItems: "center" }}
        >

            <ButtonStandard 
                text = "Play"
                sizeText = { 2 }
                isBold
                onPress = { () => { navigation.navigate("gameParameters"); } }
                style = {{ ...styles.btnMenu, paddingVertical: 10, marginBottom: utilsGlobalStyles.spacingVertN(1 ) }}
            />
            <ButtonStandard 
                text = "How to Play"
                sizeText = { 2 }
                isBold
                onPress = { () => { navigation.navigate("gameInfo"); } }
                style = {{ ...styles.btnMenu, paddingVertical: 10 }}
            />

        </PageContainer>
    );
}

const styles = StyleSheet.create(
    {
        btnMenu: 
        {
            width: Dimensions.get("screen").width * 0.75,
            borderRadius: globalProps.borderRadiusStandard,
            // borderWidth: 1
        }
    }
);

export default Menu;