import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Dimensions  } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles as gGlobalStyles, keyProperties as gGlobalProperties, keyProperties } from "../styles.js";

import GridPoolBall from '../components/GridPoolBall.js';
import CustomButton from '../components/CustomButton.js';
import consts from '../utils/constants.js';

function GameParameters({ navigation }) 
{
    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const lInsets = useSafeAreaInsets();

    const selectNumPlayers = (aNum) =>
    {
        setNumPlayers(aNum);
    };

    const selectNumBalls = (aNum) =>
    {
        setNumBalls(aNum);
    };

    // const toggleShowCounts = () =>
    // {
    //     setShowCounts(
    //         (prev) =>
    //         {
    //             return !prev;
    //         }
    //     );
    // }

    const handleNext = () =>
    {
        if (numPlayers <= 0 || numBalls <= 0)
            return;

        // If previous names have been recorded, go to the page that allows the user to select them; otherwise, go
        // directly to the names page.
        console.log("Go to next page");
        // if (localStorage.hasOwnProperty(consts.lclStrgKeyPrevNames))
        // {
        //     navigate("/prev-names", { state: { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts } });
        // }
        // else
        // {
        //     navigate("/names", { state: { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts } });
        // }
    };

    const maxNumBalls = () =>
    {
        return Math.floor(consts.numPoolBalls / numPlayers);
    }

    useEffect(
        () =>
        {
            const lMaxBallsPerPlayer = maxNumBalls();

            console.log("Max balls per player: " + lMaxBallsPerPlayer);
            console.log("Balls per player: " + numBalls);

            if (lMaxBallsPerPlayer < numBalls || lMaxBallsPerPlayer === 1)
            {
                setNumBalls(lMaxBallsPerPlayer);
            }
        },
        [numPlayers]
    );

    // Calculate the height of the content.
    const lHeightScreen = Dimensions.get("window").height;
    const lHeightTotalInsets = lInsets.top + lInsets.bottom;
    const lHeightContent = lHeightScreen - (lHeightTotalInsets + keyProperties.heightFooter + keyProperties.heightHeader);

    return ( 
        <View style = { { ...gGlobalStyles.pageContainer } }>

            <View style = { { ...gGlobalStyles.header } }>
                <Text style = { { ...gGlobalStyles.headerText } }>Game Parameters</Text>
            </View>

            <ScrollView vertical = {true} style = { { height: lHeightContent, width: "100%" } } contentContainerStyle = { { ...gGlobalStyles.content } }>

                <Text style = { gGlobalStyles.title }>Number of Players</Text>
                <GridPoolBall 
                    columns = { 4 }
                    clickBall = { selectNumPlayers }
                    balls = { 
                        Array.from({ length: 14 }, (el, index) => index + 2).map(
                            (aNum) =>
                            {
                                return { number: aNum, in: aNum === numPlayers, selected: aNum === numPlayers };
                            }
                        ) 
                    }
                    width = { gGlobalProperties.maxWidthGrid }     
                />

                <Text style = { gGlobalStyles.title }>Balls Per Player</Text>
                <GridPoolBall 
                    columns = { 4 }
                    clickBall = { selectNumBalls }
                    balls = { 
                        Array.from({ length: maxNumBalls() }, (el, index) => index + 1).map(
                            (aNum) =>
                            {
                                return { number: aNum, in: aNum === numBalls, selected: aNum === numBalls };
                            }
                        ) 
                    }
                    width = { gGlobalProperties.maxWidthGrid }
                />

            </ScrollView>

            <View style = { { ...gGlobalStyles.footer } }>
                <CustomButton
                    text = "Next"
                    onPress = { handleNext }
                    style = { { ...gGlobalStyles.btnBig, ...gGlobalStyles.btnFooter } }
                    styleText = { {...gGlobalStyles.btnBigText, ...gGlobalStyles.btnFooterText} }
                />
            </View>

        </View>
    );
}

export default GameParameters;