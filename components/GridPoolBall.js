import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import PoolBall from "./PoolBall.js";
import ButtonStandard from './ButtonStandard.js';

function GridPoolBall(props)
{
    const lMarginProportion = 35/100;
    let lWidthBall = props.width / (props.columns + props.columns * lMarginProportion - lMarginProportion);
    let lMarginBall = lWidthBall * lMarginProportion;

    // Reduce the margin slightly to eliminate the rows being a bit too wide due to floating-point precision.
    lMarginBall *= 0.999;

    const lNumRows = Math.floor(props.balls.length / props.columns) + (props.balls.length % props.columns > 0 ? 1 : 0);

    const lStyleContainer = { ...styles.gridPoolBall };

    if (lNumRows > 1)
        lStyleContainer.width = props.width;
    else
        lStyleContainer.alignSelf = "center"; // center horizontally in container.

    return (
        <View style = { lStyleContainer }>
            {
                props.balls.map(
                    (ball, aIndex) =>
                    {
                        // Flags which determine which margins are applied to the ball (order: top, right, bottom, left).
                        // The balls' margins should be between the balls, not between the grid and whatever is around it.
                        // i.e. the margins should only be internal.
                        const lMargins = Array(4).fill(false);

                        const lIsInLastColumn = (aIndex + 1) % props.columns === 0;
                        const lIsInLastRow = aIndex >= (lNumRows * props.columns) - props.columns;
                        // i >= (aNumRows * aNumColumns) - aNumColumns

                        /* Margin order: top | right | bottom | left */

                        if (!lIsInLastRow)
                            lMargins[2] = true;

                        if (!lIsInLastColumn)
                        {
                            lMargins[1] = true;
                        }

                        if (aIndex === props.balls.length - 1)
                            lMargins[1] = false;

                        return (
                            <ButtonStandard
                                key = { ball.number }
                                onPress = { () => { props.clickBall(ball.number); } }
                                doubleClick = { props.doubleClick }
                                activeOpacity = { 1 }
                                style = { { backgroundColor: 'transparent' } }
                            >
                                <PoolBall 
                                    number = { ball.number } 
                                    potted = { ball.in } 
                                    selected = { ball.selected }
                                    margins = { lMargins }
                                    marginSize = { lMarginBall }
                                    sizeBall = { lWidthBall }
                                />
                            </ButtonStandard>
                        );
                    }
                )
            }
        </View>
    );
}

GridPoolBall.propTypes =
{
    columns: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    balls: PropTypes.array.isRequired,
    clickBall: PropTypes.func.isRequired,
    doubleClick: PropTypes.bool
};

GridPoolBall.defaultProps = 
{
    doubleClick: false
}

const styles = StyleSheet.create(
    {
        gridPoolBall: {
            flexDirection: "row",
            flexWrap: "wrap",
        }
    }
);

export default GridPoolBall;