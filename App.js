import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import pageHelloWorld from './pages/HelloWorld.js';
import pageGameParameters from './pages/GameParameters.js';

import { styles as gGlobalStyles, keyProperties as gGlobalProperties } from './styles.js';

const Stack = createNativeStackNavigator();

export default function App() 
{
    return ( 
        <SafeAreaView 
            style = { { ...styles.container } }
        >
                
            <>
                {/* Use light text instead of dark text in the status bar to provide more contrast with a dark background. */}
                <StatusBar style = "light" />
            </>

            <NavigationContainer>

                <Stack.Navigator 
                    screenOptions = { { headerShown: false } }
                >
                    <Stack.Screen
                        name = "pageGameParameters"
                        component = { pageGameParameters }
                        options = { { title: '' } }
                    />
                    <Stack.Screen 
                        name = "pageHelloWorld" 
                        component = { pageHelloWorld }
                    />
                </Stack.Navigator>

            </NavigationContainer>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#000",
            // alignItems: 'center',
            // justifyContent: 'center',
        },
    }
);
