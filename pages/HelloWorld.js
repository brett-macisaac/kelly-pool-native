import { StyleSheet, Text, View, Button  } from 'react-native';

function HelloWorld({navigation}) 
{
    return ( 
        <View style={{ ...styles.container, backgroundColor: "#111111"}}>

            <Text style = { { color: "#FFFFFF", backgroundColor: "#333333" } }>Hello world!</Text>

            <Button
                title = "Game Parameters"
                onPress = { () => navigation.navigate('pageGameParameters', {}) }
            />

        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            alignSelf: "center",
            backgroundColor: '#fff',
            // alignItems: 'center',
            // justifyContent: 'center',
        },
    }
);

export default HelloWorld;
