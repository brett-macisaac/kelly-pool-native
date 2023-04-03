import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles as gGlobalStyles, keyProperties as gGlobalProperties } from "../styles.js";
import utils from '../utils/utils.js';
import consts from '../utils/constants.js';

import Heading from '../components/Heading.js';
import FooterButton from '../components/FooterButton.js';
import PrevPlayerLabel from '../components/PrevPlayerLabel.js';

function PrevNames({ navigation, route }) 
{
    const [selectedNames, setSelectedNames] = useState([]);

    const [prevNames, setPrevNames] = useState([]);

    const lInsets = useSafeAreaInsets();

    // Calculate the height of the content.
    const lHeightScreen = Dimensions.get("screen").height;
    const lHeightTotalInsets = lInsets.top + lInsets.bottom;
    const lHeightContent = lHeightScreen - (lHeightTotalInsets + gGlobalProperties.heightFooter + gGlobalProperties.heightHeader);

    const handleChange = (aName) =>
    {
        setSelectedNames(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                if (lDeepCopy.includes(aName))
                {
                    return lDeepCopy.filter((name) => name !== aName);
                }
                else
                {
                    if (lDeepCopy.length < route.params.numPlayers)
                    {
                        lDeepCopy.push(aName);
                    }

                    return lDeepCopy;
                }
            }
        );
    }

    const handleRemove = (aName) =>
    {
        setPrevNames(
            (prev) =>
            {
                let lDeepCopy = JSON.parse(JSON.stringify(prev));

                // If the name is selected, remove it from selectedNames.
                if (selectedNames.includes(aName))
                {
                    setSelectedNames(
                        (prev) =>
                        {
                            const lDeepCopy = JSON.parse(JSON.stringify(prev));

                            return lDeepCopy.filter((name) => name !== aName);
                        }
                    );
                }

                // Remove the name.
                lDeepCopy = lDeepCopy.filter((name) => name !== aName);

                // Update the names in the device's internal storage.
                utils.SetInAsyncStorage(consts.lclStrgKeyPrevNames, lDeepCopy);

                return lDeepCopy;
            }
        );
    }

    const handlePress = () =>
    {
        if (selectedNames.length === route.params.numPlayers)
        {
            utils.RandomiseArray(selectedNames);

            navigation.navigate(
                "pageGame", 
                {
                    playerNames: selectedNames,
                    numBalls: route.params.numBalls, 
                    showCounts: route.params.showCounts 
                }
            );
        }
        else
        {
            navigation.navigate(
                "pagePlayerNames", 
                { 
                    prevPlayers: selectedNames, 
                    numPlayers: route.params.numPlayers, 
                    numBalls: route.params.numBalls, 
                    showCounts: route.params.showCounts 
                }
            );
        }

    }

    useEffect(
        () =>
        {
            const getAndSetPrevNames = async function() 
            {
                const lPrevNames = await utils.GetFromAsyncStorage(consts.lclStrgKeyPrevNames, [])

                setPrevNames(lPrevNames);
            };

            getAndSetPrevNames();
        },
        []
    );

    let lLengthLongestName = 0;

    for (const prevName of prevNames)
    {
        if (prevName.length > lLengthLongestName)
        {
            lLengthLongestName = prevName.length;
        }
    }

    return ( 
        <View 
            style = { { ...gGlobalStyles.pageContainer } }
        >
            <Heading text = "Returning Players"/>

            <ScrollView 
                vertical = {true} 
                showsVerticalScrollIndicator = {false}
                style = { { height: lHeightContent, width: "100%" } } 
                contentContainerStyle = { { ...gGlobalStyles.content } }
            >
                <Text style = { { width: "90%", fontSize: gGlobalProperties.fontSizeStandard } }></Text>

                {
                    prevNames.map(
                        (name, index) =>
                        {
                            return (
                                <View key = { index } style = { { width: "90%", marginTop: gGlobalProperties.spacingStandard } }>
                                    <PrevPlayerLabel 
                                        name = { name.padEnd(lLengthLongestName, ' ') }
                                        isSelected = { selectedNames.includes(name) }
                                        onSelect = { () => handleChange(name) }
                                        onRemove = { () => handleRemove(name) }
                                    />
                                </View>
                            );
                        }
                    )
                }


            </ScrollView>

            <View style = { { ...gGlobalStyles.footer } }>
                <FooterButton
                    text = "Next"
                    onPress = { handlePress }
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

export default PrevNames;
