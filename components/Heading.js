import { StyleSheet, View, Text } from 'react-native';

import { keyProperties as gGlobalProperties } from "../styles.js";

function Heading({ text })
{
    return (
        <View style = { styles.header }>
            <Text style = { styles.textHeader  }>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        header:
        {
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: gGlobalProperties.heightHeader,
            paddingLeft: Math.floor(gGlobalProperties.fontSizeStandard * 1.5),
            backgroundColor: "#000"
        },
        textHeader: 
        {
            fontSize: Math.floor(gGlobalProperties.fontSizeStandard * 1.5),
            fontWeight: 600,
            color: "#FFF"
        }
    }
);

export default Heading;