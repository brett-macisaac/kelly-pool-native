import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import pagePlayerNames from './pages/PlayerNames.js';
import pageGameParameters from './pages/GameParameters.js';
import pageGame from './pages/Game.js';
import pagePrevNames from './pages/PrevNames.js';

const Stack = createNativeStackNavigator();

export default function App() 
{
    console.log("Total Screen Height: " + Dimensions.get("window").height)

    return ( 
        <SafeAreaProvider>
            <>
                {/* Use light text instead of dark text in the status bar to provide more contrast with a dark background. */}
                <StatusBar style = "light" />
            </>

            <SafeAreaView style = { { flex: 1, backgroundColor: "#000" } }>
                <NavigationContainer
                    // onStateChange = { (state) => console.log('New state is', state) }
                >

                    <Stack.Navigator 
                        screenOptions = { { headerShown: false } }
                        initialRouteName = "pageGameParameters"
                    >
                        <Stack.Screen
                            name = "pageGameParameters"
                            component = { pageGameParameters }
                            options = { { title: 'Game Parameters' } }
                        />
                        <Stack.Screen 
                            name = "pagePrevNames" 
                            component = { pagePrevNames }
                        />
                        <Stack.Screen 
                            name = "pagePlayerNames" 
                            component = { pagePlayerNames }
                        />
                        <Stack.Screen 
                            name = "pageGame" 
                            component = { pageGame }
                        />
                    </Stack.Navigator>

                </NavigationContainer>
            </SafeAreaView>

        </SafeAreaProvider>
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
