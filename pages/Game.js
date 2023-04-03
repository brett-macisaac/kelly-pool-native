import React, { useState, useEffect } from 'react';
import { View, ScrollView,Dimensions, StyleSheet, Alert } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles as gGlobalStyles, keyProperties as gGlobalProperties } from "../styles.js";
import consts from '../utils/constants.js';
import utils from '../utils/utils.js';

import Heading from '../components/Heading.js';
import CountLabel from '../components/CountLabel.js';
import PlayerLabel from '../components/PlayerLabel.js';
import GridPoolBall from '../components/GridPoolBall.js';
import GameButton from '../components/GameButton.js';

function Game({ navigation, route }) 
{
    const lInsets = useSafeAreaInsets();

    const [players, setPlayers] = useState(
        
        route.params.playerNames.map(

            (aName) =>
            {
                return {
                    name: aName,
                    balls: Array(route.params.numBalls).fill({ number: 0, in: false }),
                    nthPlace: -1
                }
            }

        )

    );

    const [balls, setBalls] = useState(

        Array.from({ length: consts.numPoolBalls }, (element, index) => index + 1).map(
            (aNumber) =>
            {
                return { number: aNumber, in: false, selected: false };
            }
        )

    );

    const [indexSelected, setIndexSelected] = useState(-1);

    const NumPlayersIn = () =>
    {
        return players.filter(
            (player) =>
            {
                const lAtLeastOneBallIn = player.balls.filter(ball => !ball.in).length > 0;
    
                return lAtLeastOneBallIn;
            }
        ).length;
    }

    const EliminatePlayer = (aIndex) =>
    {
        Alert.alert("Player Eliminated", `${players[aIndex].name} has been eliminated`, undefined, { cancelable: true });

        if (aIndex === indexSelected)
        {
            // Toggle the highlight on their balls.
            highlightPlayersBalls(indexSelected);
            setIndexSelected(-1);
        }
    }

    const ReturnPlayer = (aPlayers, aIndex) =>
    {
        // Adjust the nthPlace variable of other players (i.e. any players who have a lower place).
        for (let i = 0; i < aPlayers.length; ++i)
        {
            if (i === aIndex)
                continue;
            
            if (aPlayers[i].nthPlace <= 0) // If the aPlayers[i] hasn't yet placed.
            {
                continue;
            }
            else // If the aPlayers[i] has placed.
            {
                // If the aPlayers[i] placed but has balls left.
                const lHasBalls = aPlayers[i].balls.filter(ball => !ball.in).length > 0;

                if (lHasBalls)
                {
                    aPlayers[i].nthPlace = -1;
                }
                else if (aPlayers[i].nthPlace < aPlayers[aIndex].nthPlace)
                {
                    aPlayers[i].nthPlace += 1;
                }
                else
                {
                    console.log(`${aPlayers[i].nthPlace} < ${aPlayers[aIndex].nthPlace}`)
                }
            }
        }

        if (aPlayers[aIndex].nthPlace !== 1)
            aPlayers[aIndex].nthPlace = -1;
    }

    const RandomisePlayers = () =>
    {
        // Randomise the players.
        setPlayers(

            (prev) =>
            {
                // A list of the players' names.
                const lNames = prev.map(player => player.name);

                // Randomise the names.
                utils.RandomiseArray(lNames);
                
                // A (deep) copy of the players' array.
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                let lIndexNames = 0;

                // Assign the randomised names to the players' objects.
                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].name = lNames[lIndexNames++];
                }

                // Reset the players' 'balls' arrays.
                // Players can now add and remove balls mid-game, meaning that their arrays might not be the correct
                // size at the end of a game.
                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].balls = Array(route.params.numBalls).fill({ value: 0, in: false });
                }

                return lDeepCopy;
            }
        );
    };

    const RandomiseBalls = () =>
    {
        setBalls(

            (prev) =>
            {
                // A (deep) copy of the balls.
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].in = false;
                    lDeepCopy[i].selected = false;
                }

                return lDeepCopy;
            }

        );

        setPlayers(

            (prev) =>
            {
                const lBalls = Array.from({ length: consts.numPoolBalls }, (element, index) => index + 1);
                utils.RandomiseArray(lBalls);
        
                let lIndexBalls = 0;

                // A (deep) copy of the players' array.
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    for (let j = 0; j < lDeepCopy[i].balls.length; ++j)
                    {
                        lDeepCopy[i].balls[j].number = lBalls[lIndexBalls++];
                        lDeepCopy[i].balls[j].in = false;
                        lDeepCopy[i].nthPlace = -1;
                    }
                }

                return lDeepCopy;
            }

        );
    };

    // Initial randomisation of balls.
    useEffect(
        () =>
        {
            RandomiseBalls();
        },
        []
    );

    const clickBall = (aBallNumber) =>
    {
        setPlayers(

            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                let lBallFound = false;

                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    for (let j = 0; j < lDeepCopy[i].balls.length; ++j)
                    {
                        if (lDeepCopy[i].balls[j].number !== aBallNumber)
                            continue;

                        // If the ball has been potted (i.e. wasn't in but now is).
                        const lBallPotted = !lDeepCopy[i].balls[j].in;

                        lDeepCopy[i].balls[j].in = !(lDeepCopy[i].balls[j].in);

                        let lNumBalls = lDeepCopy[i].balls.filter(ball => !ball.in).length;

                        if (lNumBalls === 0)
                        {
                            const lNumPlayers = NumPlayersIn();

                            lDeepCopy[i].nthPlace = lNumPlayers;
                            EliminatePlayer(i);

                            // If the player who just lost placed 2nd, that means there's only one player left.
                            if (lNumPlayers === 2)
                            {
                                // Set the place of the only remaining player to 1.
                                for (const player of lDeepCopy)
                                {
                                    // if (player.balls.filter(el => !el.in).length === 0)
                                    //     continue;
                                    if (player.nthPlace > 0)
                                        continue;

                                    player.nthPlace = 1;
                                    break;
                                }
                            }
                        }
                        else if (route.params.showCounts && lBallPotted)
                        {
                            Alert.alert("Lost Ball", `${lDeepCopy[i].name} has lost a ball`, undefined, { cancelable: true });
                        }

                        // If the player returned to the game by 'resurrecting' one of their potted balls.
                        if (!lBallPotted && lNumBalls === 1)
                        {
                            ReturnPlayer(lDeepCopy, i);
                        }

                        lBallFound = true;

                        break;
                    }

                    if (lBallFound)
                        break;
                }

                return lDeepCopy;
            }

        );

        setBalls(

            (prev) => 
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                lDeepCopy[aBallNumber - 1].in = !(lDeepCopy[aBallNumber - 1].in);

                return lDeepCopy;
            }

        );

    };

    const highlightPlayersBalls = (aIndex) =>
    {
        aIndex === indexSelected ? setIndexSelected(-1) : setIndexSelected(aIndex);

        setBalls(

            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                // An array of the balls that were deselected. These balls are unavailable for selection.
                const lBallNumsDeselected = [];

                // Deselect any currently selected balls and record them in lBallNumsDeselected.
                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    if (lDeepCopy[i].selected)
                    {
                        lBallNumsDeselected.push(lDeepCopy[i].number);
                    }

                    lDeepCopy[i].selected = false;
                }

                // console.log("Deselected Balls:");
                // console.log(lBallNumsDeselected);

                const lPlayer = players[aIndex];

                for (let i = 0; i < lPlayer.balls.length; ++i)
                {
                    const lNumBall = lPlayer.balls[i].number;

                    if (lBallNumsDeselected.includes(lNumBall))
                        continue;

                    lDeepCopy[lNumBall - 1].selected = true;
                }

                return lDeepCopy;
            }

        );
    };

    /* Returns an array of the balls that are unassigned and not yet potted. */
    const availableBalls = () =>
    {
        return balls.filter(
            (ball) =>
            {
                // If the ball is already potted, don't include this ball (irrespetive of whether it's assigned).
                if (ball.in)
                    return false;

                let lIsBallAssigned = false;

                for (const player of players)
                {
                    for (const b of player.balls)
                    {
                        if (b.number === ball.number)
                        {
                            lIsBallAssigned = true;
                            break;
                        }
                    }

                    if (lIsBallAssigned)
                        break;
                }

                return !lIsBallAssigned;
            }
        );
    }

    const handleAddBall = () =>
    {
        // If there's balls remaining that have yet to be assigned to a player, pick a random one and assign it to the 
        // selected player.

        // Balls that haven't been potted and are not assigned to a player.
        const lBallsAvailable = availableBalls();

        // console.log("Available balls: ");
        // console.log(lBallsAvailable);

        if (lBallsAvailable.length === 0)
            return;

        // A random ball from lBallsAvailable.
        const lBallRandom = lBallsAvailable[utils.GetRandom(0, lBallsAvailable.length - 1)];

        setPlayers(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                const lNumBalls = lDeepCopy[indexSelected].balls.filter(ball => !ball.in).length;

                if (lNumBalls === 0)
                    ReturnPlayer(lDeepCopy, indexSelected);

                lDeepCopy[indexSelected].balls.push({ number: lBallRandom.number, in: false })

                return lDeepCopy;
            }
        );

        setBalls(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                return lDeepCopy.map(
                    (ball) =>
                    {
                        if (ball.number === lBallRandom.number)
                            ball.selected = true;

                        return ball;
                    }
                );
            }
        );

    }

    const handleRemoveBall = () =>
    {
        let lBallRemoved = 0;

        setPlayers(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                // The selected player's balls.
                let lBalls = lDeepCopy[indexSelected].balls;

                // The indexes of the player's balls that haven't been potted.
                let lIndexesUnpotted = [];

                // Populate lIndexesUnpotted.
                lBalls.forEach(
                    (ball, index) => 
                    { 
                        if (!ball.in)
                        {
                            lIndexesUnpotted.push(index);
                        }
                    }
                );

                // A random value of lIndexesUnpotted.
                let lIndexRandom = lIndexesUnpotted[utils.GetRandom(0, lIndexesUnpotted.length - 1)];

                // Record the ball that will be removed.
                lBallRemoved = lBalls[lIndexRandom].number;

                // Remove the ball at the random index.
                lDeepCopy[indexSelected].balls = lBalls.filter((ball, index) => index !== lIndexRandom);

                // Eliminate the player if they have no unpotted balls left.
                if (lDeepCopy[indexSelected].balls.length === 0 || 
                    lDeepCopy[indexSelected].balls.filter(ball => !ball.in).length === 0)
                {
                    const lNumPlayers = NumPlayersIn();

                    lDeepCopy[indexSelected].nthPlace = lNumPlayers;
                    
                    EliminatePlayer(indexSelected);

                    // If the player who just lost placed 2nd, that means there's only one player left.
                    if (lNumPlayers === 2)
                    {
                        // Set the place of the only remaining player to 1.
                        for (const player of lDeepCopy)
                        {
                            // if (player.balls.filter(el => !el.in).length === 0)
                            //     continue;
                            if (player.nthPlace > 0)
                                continue;

                            player.nthPlace = 1;
                            break;
                        }
                    }
                }

                // Unselect the ball.
                setBalls(
                    (prev) =>
                    {
                        const lDeepCopy = JSON.parse(JSON.stringify(prev));
        
                        return lDeepCopy.map(
                            (ball) =>
                            {
                                if (ball.number === lBallRemoved)
                                    ball.selected = false;
        
                                return ball;
                            }
                        );
                    }
                );

                return lDeepCopy;
            }
        );

    }

    const handleReplay = () =>
    {
        // Balls and the players' order should be randomised.

        // Given that players have the option to add/remove balls, their 'balls' arrays should be reset.

        RandomisePlayers();

        RandomiseBalls();
    }

    const handleQuit = () =>
    {
        navigation.navigate("pageGameParameters");
    }

    const lNumPlayersIn = NumPlayersIn();

    // The number of players' balls that are not yet potted.
    let lCountPlayersBalls = 0;

    // The length of the longest name (can be used to make all the names the same length).
    let lLengthLongestName = 0;
    for (const player of players)
    {
        if (player.name.length > lLengthLongestName)
        {
            lLengthLongestName = player.name.length;
        }
    }

    // Calculate the height of the content.
    const lHeightScreen = Dimensions.get("screen").height;
    const lWidthScreen = Dimensions.get("screen").width;
    const lHeightTotalInsets = lInsets.top + lInsets.bottom;
    const lHeightContent = lHeightScreen - (lHeightTotalInsets + gGlobalProperties.heightHeader);

    return ( 
        <View style = { { ...gGlobalStyles.pageContainer } }>

            <Heading text = "Game"/>

            <ScrollView 
                vertical = {true} 
                style = { { height: lHeightContent, width: "100%" } } 
                contentContainerStyle = { { ...gGlobalStyles.content } }
                showsVerticalScrollIndicator = {false}
            >

                <View style = { { ...gGlobalStyles.conGeneral, marginTop: gGlobalProperties.spacingStandard  } }>

                    <CountLabel text = "Players" count = { lNumPlayersIn } />

                    {
                        players.map(
                            (player, index) => 
                            {
                                let lNumBalls = player.balls.filter(el => !el.in).length;

                                lCountPlayersBalls += lNumBalls;

                                const lStyleCon = { };

                                if (index !== players.length - 1)
                                    lStyleCon.marginBottom = gGlobalProperties.spacingStandard;

                                return (
                                    <View style = { lStyleCon } key = { index }>
                                        <PlayerLabel 
                                            name = { player.name.padEnd(lLengthLongestName) }
                                            ballCount = { lNumBalls }
                                            isSelected = { index === indexSelected }
                                            showCount = { route.params.showCounts } // !!! Change this later once the 'hide count' feature is implemented.
                                            onClick = { () => highlightPlayersBalls(index) }
                                            place = { player.nthPlace }
                                        />
                                    </View>
                                );
                            }
                        )
                    }

                    {
                        (route.params.showCounts && lNumPlayersIn > 1) && (
                            <View>
                                <View style = { { backgroundColor: "#ccc", height: 5, marginVertical: gGlobalProperties.spacingStandard } } ></View>
                                <PlayerLabel name = "Total" ballCount = { lCountPlayersBalls } emboldenName = { true } />
                            </View>
                        )
                    }

                </View>
                
                {/* Replay and Quit buttons. */}
                {
                    lNumPlayersIn <= 1 && (
                        <View style = { { ...gGlobalStyles.conGeneral, marginTop: 1.5 * gGlobalProperties.spacingStandard } }>

                            <View style = { { width: "100%", marginBottom: gGlobalProperties.spacingStandard } }>
                                <GameButton text = "Replay" onPress = { handleReplay } />
                            </View>

                            <GameButton text = "Return to Menu" onPress = { handleQuit } />

                        </View>
                    )
                }

                <View style = { { ...gGlobalStyles.conGeneral, marginTop: 1.5 * gGlobalProperties.spacingStandard, alignItems: "center" } } >

                    <CountLabel text = "Balls" count = { balls.filter((ball) => !ball.in).length } />

                    <GridPoolBall 
                        columns = { 3 }
                        clickBall = { clickBall }
                        balls = { balls }
                        width = { gGlobalProperties.widthGridPoolBall }
                    />

                    {
                        (indexSelected >= 0 && (availableBalls()).length > 0) && (
                            <View style = { { width: "100%", marginTop: gGlobalProperties.spacingStandard } }>
                                <GameButton text = "Add Ball" onPress = { handleAddBall } />
                            </View>
                        )
                    }

                    {
                        ((indexSelected >= 0) && players[indexSelected].balls.filter(ball => !ball.in).length > 0) && (
                            <View style = { { width: "100%", marginTop: gGlobalProperties.spacingStandard } }>
                                <GameButton text = "Remove Ball" onPress = { handleRemoveBall } />
                            </View>
                        )
                    }

                </View>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create(
    {
    }
);

export default Game;
