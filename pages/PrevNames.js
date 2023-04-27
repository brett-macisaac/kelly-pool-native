import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, Alert } from 'react-native';

import globalProps, { utilsGlobalStyles } from "../styles.js";
import utils from '../utils/utils.js';
import consts from '../utils/constants.js';

import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer.js';
import PrevPlayerLabel from '../components/PrevPlayerLabel.js';

function PrevNames({ navigation, route }) 
{
    const [selectedNames, setSelectedNames] = useState([]);

    const [prevNames, setPrevNames] = useState([]);

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
                "game", 
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
                "playerNames", 
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
        <PageContainer
            navigation = { navigation }
            buttonNavBarText = { selectedNames.length === route.params.numPlayers ? "Start" : "Next" }
            buttonNavBarHandler = { handlePress }
            headerButtonLeft = { Header.buttonNames.back }
            headerButtonRight = { Header.buttonNames.settings }
            style = {{ justifyContent: "center" }}
        >
            {
                prevNames.map(
                    (name, index) =>
                    {
                        let marginTop = (index === 0) ? 0 : utilsGlobalStyles.spacingVertN();

                        return (
                            <View key = { index } style = { { width: "90%", marginTop: marginTop } }>
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

        </PageContainer>
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
            fontSize: globalProps.fontSizeStandard,
            textAlign: 'center',
            backgroundColor: "#000",
            borderRadius: globalProps.borderRadiusStandard,
            padding: 5,
            color: "#FFF"
        }
    }
);

export default PrevNames;
