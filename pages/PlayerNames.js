import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';

import globalProps, { utilsGlobalStyles } from "../styles.js";

import TextInputStandard from "../components/TextInputStandard";
import TextStandard from '../components/TextStandard.js';
import PageContainer from '../components/PageContainer.js';
import Header from '../components/Header.js';
import utils from '../utils/utils.js';
import consts from '../utils/constants.js';
import { PopUpOk } from '../components/PopUpStandard.js'

function PlayerNames({ navigation, route }) 
{
    const [names, setNames] = useState(

        route.params.prevPlayers 
            ? 
                Object.assign(new Array(route.params.numPlayers).fill(""), route.params.prevPlayers) 
            :
                Array(route.params.numPlayers).fill("")

    );

    const [optionsPopUpMsg, setOptionsPopUpMsg] = useState(undefined);

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
            setOptionsPopUpMsg(PopUpOk("Not enough names!", "You must give each player a name before you can start."));
            //Alert.alert("Not enough names!", "You must give each player a name before you can start.", undefined, { cancelable: true });
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
            "game", 
            { 
                numPlayers: route.params.numPlayers, 
                numBalls: route.params.numBalls,
                showCounts: route.params.showCounts,
                playerNames: JSON.parse(JSON.stringify(names)) 
            }
        );
    }

    return ( 
        <PageContainer
            navigation = { navigation }
            buttonNavBarText = "Start"
            buttonNavBarHandler = { handleStart }
            headerButtonLeft = { Header.buttonNames.back }
            headerButtonRight = { Header.buttonNames.settings }
            optionsPopUpMsg = { 
                optionsPopUpMsg ? { ...optionsPopUpMsg, removePopUp: () => setOptionsPopUpMsg(undefined) } : undefined 
            }
            style = {{ justifyContent: "center" }}
        >
            {
                names.map(
                    (name, index) =>
                    {
                        let marginTop = (index === 0) ? 0 : utilsGlobalStyles.spacingVertN();

                        return (
                            <View key = { index } style = {{ marginTop: marginTop }}>
                                <TextStandard 
                                    text = { `Player ${index + 1}` } 
                                    size = { 1 }
                                    isBold
                                    style = { styles.titlePlayer }  
                                />
                                <TextInputStandard 
                                    placeholder = "Name"
                                    text = { name } 
                                    onChangeText = { (newText) => handleTextInput(newText, index) }
                                    maxLength = { 12 }
                                    style = { styles.txtName }
                                />
                            </View>
                        );
                    }
                )
            }

        </PageContainer>
    );
}

const styles = StyleSheet.create(
    {
        txtName: 
        {
            // backgroundColor: "#000",
            alignItems: 'center',
            justifyContent: 'center',
            width: Math.floor(Dimensions.get("window").width * 0.5),
            maxWidth: 500,
            textAlign: 'center',
            padding: 5,
            // color: "#FFF"
        },
        titlePlayer: 
        {
            textAlign: "center",
            marginBottom: utilsGlobalStyles.spacingVertN(-2)
        }
    }
);

export default PlayerNames;
