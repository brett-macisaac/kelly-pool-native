import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles as gGlobalStyles, keyProperties as gGlobalProperties } from "../styles.js";

import Heading from '../components/Heading.js';
import FooterButton from '../components/FooterButton.js';
import utils from '../utils/utils.js';
import consts from '../utils/constants.js';

function PlayerNames({ navigation, route }) 
{
    const [names, setNames] = useState(

        route.params.prevPlayers 
            ? 
                Object.assign(new Array(route.params.numPlayers).fill(""), route.params.prevPlayers) 
            :
                Array(route.params.numPlayers).fill("")

    );

    const lInsets = useSafeAreaInsets();

    // Calculate the height of the content.
    const lHeightScreen = Dimensions.get("screen").height;
    const lHeightTotalInsets = lInsets.top + lInsets.bottom;
    const lHeightContent = lHeightScreen - (lHeightTotalInsets + gGlobalProperties.heightFooter + gGlobalProperties.heightHeader);

    const handleTextInput = (aNewText, aIndex) =>
    {
        setNames(
            (prev) =>
            {
                return prev.map(
                    (name, index) =>
                    {
                        if (index === aIndex)
                        {
                            return aNewText;
                        }
                        else
                        {
                            return name;
                        }
                    }
                );
            }
        );

    };

    const handleStart = async () => 
    {
        const lAreNamesSet = names.every((name) => name !== "");

        if (!lAreNamesSet)
        {
            Alert.alert("Not enough names!", "You must give each player a name before you can start.", undefined, { cancelable: true });
            return;
        }

        let lPrevNames = await utils.GetFromAsyncStorage(consts.lclStrgKeyPrevNames);

        console.log("1");

        // If player names haven't been stored before, create an empty array in internal storage.
        if (!(lPrevNames instanceof Array))
        {
            console.log("2");
            await utils.SetInAsyncStorage(consts.lclStrgKeyPrevNames, []);
            console.log("3");

            lPrevNames = [];
        }

        // Store any new names in the array.
        for (const name of names)
        {
            // Skip any pre-recorded names.
            if (lPrevNames.includes(name))
                continue;

            lPrevNames.push(name);
        }

        // Store the updated names in internal storage.
        utils.SetInAsyncStorage(consts.lclStrgKeyPrevNames, lPrevNames);

        utils.RandomiseArray(names);

        navigation.navigate(
            "pageGame", 
            { 
                numPlayers: route.params.numPlayers, 
                numBalls: route.params.numBalls,
                showCounts: route.params.showCounts,
                playerNames: JSON.parse(JSON.stringify(names)) 
            }
        );
    }

    return ( 
        <View 
            style = { { ...gGlobalStyles.pageContainer } }
        >
            <Heading text = "Player Names"/>

            <ScrollView 
                vertical = {true} 
                style = { { height: lHeightContent, width: "100%" } } 
                contentContainerStyle = { { ...gGlobalStyles.content } }
                // nestedScrollEnabled = {true}
                showsVerticalScrollIndicator = {false}
            >
                {
                    names.map(
                        (name, index) =>
                        {
                            return (
                                <View key = { index } style = { { marginTop: gGlobalProperties.spacingStandard } }>
                                    <Text style = { gGlobalStyles.title }>Player { index + 1 }</Text>
                                    <TextInput 
                                        placeholder = "Name"
                                        placeholderTextColor = "#DDD"
                                        value = { name } 
                                        onChangeText = { (newText) => handleTextInput(newText, index) }
                                        maxLength = { 12 }
                                        style = { styles.txtName }
                                    />
                                </View>
                            );
                        }
                    )
                }


            </ScrollView>

            <View style = { { ...gGlobalStyles.footer } }>
                <FooterButton
                    text = "Start"
                    onPress = { handleStart }
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        txtName: {
            backgroundColor: "#000",
            alignItems: 'center',
            justifyContent: 'center',
            width: Math.floor(Dimensions.get("window").width * 0.5),
            maxWidth: 500,
            fontSize: gGlobalProperties.fontSizeStandard,
            textAlign: 'center',
            backgroundColor: "#000",
            borderRadius: gGlobalProperties.borderRadiusStandard,
            padding: 5,
            color: "#FFF"
        }
    }
);

export default PlayerNames;
