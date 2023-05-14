import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';

import globalProps, { styles as globalStyles, utilsGlobalStyles } from "../styles.js";
import consts from '../utils/constants.js';
import utils from '../utils/utils.js';

import GridPoolBall from '../components/GridPoolBall.js';
import CountLabel from '../components/CountLabel.js';
import CheckBox from '../components/CheckBox.js';
import PageContainer from '../components/PageContainer.js';
import Container from '../components/Container.js';
import optionsHeaderButtons from '../components/options_header_buttons.js';

function GameParameters({ navigation }) 
{
    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const [showCounts, setShowCounts] = useState(true);

    const [optionsPopUpMsg, setOptionsPopUpMsg] = useState(undefined);

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
            setOptionsPopUpMsg(
                {
                    title: "No balls selected!",
                    message: "You must select the number of balls per player to continue.",
                    buttons: [
                        { text: "OK" }
                    ]
                }
            );
            //Alert.alert("No balls selected!", "You must select the number of balls per player to continue.", undefined, { cancelable: true });
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
            navigation.navigate("prevNames", { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts });
        }
        else
        {
            navigation.navigate("playerNames", { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts });
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

    return ( 
        <PageContainer
            navigation = { navigation }
            buttonNavBarText = "Next"
            buttonNavBarHandler = { handleNext }
            optionsLeftHeaderButtons = { [ optionsHeaderButtons.back ] }
            optionsRightHeaderButtons = { [ optionsHeaderButtons.settings ] }
            optionsPopUpMsg = { optionsPopUpMsg }
        >

            <Container style = {{ ...styles.containerBalls }}>
                <CountLabel text = "Number of Players" count = { numPlayers } size = { 1 } />
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
                    width = { globalProps.widthGridPoolBall }
                />
            </Container>

            <Container style = {{ ...styles.containerBalls, marginTop: utilsGlobalStyles.spacingVertN(1) }}>
                <CountLabel text = "Number of Balls" count = { numBalls } size = { 1 } />
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
                    width = { globalProps.widthGridPoolBall }
                />
            </Container>

            <View style = { { marginTop: utilsGlobalStyles.spacingVertN(1) } }>
                <CheckBox 
                    text = "Show Players' Ball Counts:" 
                    isChecked = { showCounts } 
                    onPress = { toggleShowCounts } 
                    // style = {{ width: globalStyles.conGeneral.width }} 
                />
            </View>

        </PageContainer>
    );
}

const styles = StyleSheet.create(
    {
        containerBalls: 
        {
            alignItems: "center"
        },
    }
);

export default GameParameters;