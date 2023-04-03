import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Alert } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles as gGlobalStyles, keyProperties as gGlobalProperties } from "../styles.js";
import consts from '../utils/constants.js';
import utils from '../utils/utils.js';

import GridPoolBall from '../components/GridPoolBall.js';
import CountLabel from '../components/CountLabel.js';
import FooterButton from '../components/FooterButton.js';
import Heading from '../components/Heading.js';
import CheckBox from '../components/CheckBox.js';

function GameParameters({ navigation }) 
{
    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const [showCounts, setShowCounts] = useState(true);

    const lInsets = useSafeAreaInsets();

    const selectNumPlayers = (aNum) =>
    {
        setNumPlayers(aNum);
    };

    const selectNumBalls = (aNum) =>
    {
        setNumBalls(aNum);
    };

    const toggleShowCounts = () =>
    {
        setShowCounts(
            (prev) =>
            {
                return !prev;
            }
        );
    }

    const handleNext = async () =>
    {
        if (numPlayers <= 0 || numBalls <= 0)
        {
            Alert.alert("No balls selected!", "You must select the number of balls per player to continue.", undefined, { cancelable: true });
            return;
        }

        const lPrevNames = await utils.GetFromAsyncStorage(consts.lclStrgKeyPrevNames);

        const lGoToPrevNamesPages = lPrevNames instanceof Array && lPrevNames.length > 0;

        /*
        * If previous names have been recorded, go to the page that allows the user to select them; otherwise, go
          directly to the names page.
        */
        if (lGoToPrevNamesPages)
        {
            console.log("Go to prev players page!");
            navigation.navigate("pagePrevNames", { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts });
        }
        else
        {
            console.log("Go to players page!");
            navigation.navigate("pagePlayerNames", { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts });
        }
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
    const lHeightScreen = Dimensions.get("screen").height;
    const lWidthScreen = Dimensions.get("screen").width;
    const lHeightTotalInsets = lInsets.top + lInsets.bottom;
    const lHeightContent = lHeightScreen - (lHeightTotalInsets + gGlobalProperties.heightFooter + gGlobalProperties.heightHeader);
    // console.log("Total Insets: " + lHeightTotalInsets);

    return ( 
        <View style = { { ...gGlobalStyles.pageContainer } }>

            <Heading text = "Game Parameters"/>
            {/* <View style = { { ...gGlobalStyles.header } }>
                <Text style = { { ...gGlobalStyles.headerText } }>Game Parameters</Text>
            </View> */}

            <ScrollView 
                vertical = {true}
                showsVerticalScrollIndicator = {false}
                style = { { height: lHeightContent, width: "100%" } } 
                contentContainerStyle = { { ...gGlobalStyles.content } }
            >

                <View style = { { ...gGlobalStyles.conGeneral, marginTop:gGlobalProperties.spacingStandard, alignItems: "center" } }>
                    {/* <Text style = { gGlobalStyles.title }>Number of Players</Text> */}
                    <CountLabel text = "Number of Players" count = { numPlayers } />
                    <GridPoolBall 
                        columns = { 4 }
                        clickBall = { selectNumPlayers }
                        balls = { 
                            Array.from({ length: 14 }, (el, index) => index + 2).map(
                                (aNum) =>
                                {
                                    return { number: aNum, in: false, selected: aNum === numPlayers };
                                }
                            ) 
                        }
                        width = { gGlobalProperties.widthGridPoolBall }
                    />
                </View>

                <View style = { { ...gGlobalStyles.conGeneral, marginTop: gGlobalProperties.spacingStandard, alignItems: "center" } }>
                    {/* <Text style = { gGlobalStyles.title }>Balls Per Player</Text> */}
                    <CountLabel text = "Number of Balls" count = { numBalls } />
                    <GridPoolBall 
                        columns = { 4 }
                        clickBall = { selectNumBalls }
                        balls = { 
                            Array.from({ length: maxNumBalls() }, (el, index) => index + 1).map(
                                (aNum) =>
                                {
                                    return { number: aNum, in: false, selected: aNum === numBalls };
                                }
                            ) 
                        }
                        width = { gGlobalProperties.widthGridPoolBall }
                    />
                </View>

                <View style = { { marginTop: gGlobalProperties.spacingStandard } }>
                    <CheckBox text = "Show Players' Ball Counts:" isChecked = { showCounts } onPress = { toggleShowCounts } />
                </View>
                

            </ScrollView>

            <View style = { { ...gGlobalStyles.footer } }>
                <FooterButton
                    text = "Next"
                    onPress = { handleNext }
                />
            </View>

        </View>
    );
}

export default GameParameters;