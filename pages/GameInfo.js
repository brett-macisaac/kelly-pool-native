import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';

import globalProps, { utilsGlobalStyles } from '../styles';
import consts from '../utils/constants.js';
import utils from '../utils/utils.js';

import Container from '../components/Container';
import TextStandard from '../components/TextStandard';
import PageContainer from '../components/PageContainer.js';
import Header from '../components/Header.js';
import ThemeContext from '../contexts/ThemeContext';

function GameInfo({ navigation }) 
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    return ( 
        <PageContainer
            navigation = { navigation }
            headerButtonLeft = { Header.buttonNames.back }
            headerButtonRight = { Header.buttonNames.settings }
            style = {{ paddingHorizontal: 15 }}
        >

            <Container style = {{ marginBottom: utilsGlobalStyles.spacingVertN(1) }}>

                <TextStandard 
                    text = "What You Need"
                    size = { 2 }
                    isBold
                    style = {{ textAlign: "center", marginBottom: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = "- A pool or snooker table."
                />
                <TextStandard 
                    text = "- A set of pool balls (numbered 1 to 15)."
                />
                <TextStandard 
                    text = "- At least one pool cue."
                />

            </Container>

            <Container style = {{ marginBottom: utilsGlobalStyles.spacingVertN(1) }}>
                <TextStandard 
                    text = "Number of Players"
                    size = { 2 }
                    isBold
                    style = {{ textAlign: "center", marginBottom: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = "Between 2 and 15."
                />
            </Container>

            <Container style = {{ marginBottom: utilsGlobalStyles.spacingVertN(1) }}>
                <TextStandard 
                    text = "What is Kelly Pool?"
                    size = { 2 }
                    isBold
                    style = {{ textAlign: "center", marginBottom: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`Kelly pool is a 'free-for-all' game played on a pool table between 2 or more players.`
                    }
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`It's ideal for situations where more than two players want to play. With a standard game of pool, people can spend long 
periods of time simply watching others play; with Kelly Pool, everyone gets to join in simultaneously.`
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />
            </Container>

            <Container style = {{ marginBottom: utilsGlobalStyles.spacingVertN(1) }}>
                <TextStandard 
                    text = "How to Play"
                    size = { 2 }
                    isBold
                    style = {{ textAlign: "center", marginBottom: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`The steps below describe how to play Kelly Pool.`
                    }
                    removeLineBreaks
                />

                <TextStandard 
                    text = "Step 1"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`Determine the number of balls each player will be assigned. Each player must have the same number of balls at 
the start.`
                    }
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`The number of balls per player is selected in the menu, in addition to the number of players.`
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />

                <TextStandard 
                    text = "Step 2"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`Assign each player the number of balls determined in step 1. Each player should be the only one who knows what balls 
they've been assigned.`
                    }
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`The app automatically assigns balls randomly to players. During the game, if you click on your name, this will 
highlight both your name and your balls; click on your name again to hide your balls. Be sure not to 'accidentally' look 
at other player's balls!`
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />

                <TextStandard 
                    text = "Step 3"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`Determine the order in which players take their turns.`
                    }
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`The app automatically orders players randomly.`
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />

                <TextStandard 
                    text = "Step 4"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`Set up the pool balls with the triangle as you would for an ordinary game of pool.`
                    }
                    removeLineBreaks
                />

                <TextStandard 
                    text = "Step 5"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`The first player begins by 'breaking', as with a standard pool game. Each player has their turn in the order displayed 
on the screen. A player's turn ends when they have a shot that fails to pot a ball. When a ball is potted, click the 
corresponding ball on the screen. Once a player loses all of their balls, they are out of the game. The winner is the 
last remaining player.`
                    }
                    removeLineBreaks
                />

            </Container>

            <Container>
                <TextStandard 
                    text = "Optional Rules"
                    size = { 2 }
                    isBold
                    style = {{ textAlign: "center", marginBottom: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`This is a list of optional rules that can be added to a game of Kelly Pool.`
                    }
                    removeLineBreaks
                />

                <TextStandard 
                    text = "1. Hidden Ball Counts"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`In a standard Kelly Pool game, when a player's ball is lost, they inform the other players. By default, the app 
displays whose ball was lost and the number of balls each player has remaining. In the menu you can disable this 
feature, which means that when a ball is potted it's not known whom it belongs to. This can heighten the game's 
suspense.`
                    }
                    removeLineBreaks
                />

                <TextStandard 
                    text = "2. Penalties for Violations"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`If a player's name is clicked (selected), you will notice that two buttons appear below the balls: 'Add Ball' and 
'Remove Ball'. Unsurprisingly, these buttons respectively add and remove balls from the selected player.`
                    }
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`This allows you to create penalties such as the removal of one ball from a player should they fail to hit a ball, hit 
a ball off the table, miss the white ball completely on their swing, etc. `
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />

                <TextStandard 
                    text = "3. Rewards for Potting Balls"
                    size = { 1 }
                    isBold
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                />
                <TextStandard 
                    text = {
`Again making use of the buttons described above, another rule could be to give one ball to a player (by using the 
'Add Ball' button) if they pot another player's ball.`
                    }
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`This rule makes the game more dependent on skill, as one would be able to gain a significant advantage by playing 
better. `
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`This rule also opens up an interesting strategy: if one of your balls is close to a pocket, rather than missing it on 
purpose, or pretending to ignore it (both of which reveal the ball to be yours), you can simply pot it and gain a new 
ball, the identity of which no other player will know.`
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />
                <TextStandard 
                    text = {
`It's worth noting that only unassigned balls can be added, meaning that if all the remaining balls belong to players, 
players can no longer gain balls. `
                    }
                    style = {{ marginTop: utilsGlobalStyles.spacingVertN(-3) }}
                    removeLineBreaks
                />
            </Container>

        </PageContainer>
    );
}

export default GameInfo;