import { Ionicons } from '@expo/vector-icons';

/*
* These are the button components available to be placed in the Header component.
*/
const optionsHeaderButtons = 
{
    
    back:
    {
        icon: (size, colour) =>
        {
            return (
                <Ionicons 
                    name = "chevron-back-sharp" color = { colour } 
                    size = { size } 
                />
            )
        },
        onPress: (navigation) =>
        {
            navigation.goBack();
        }
    },

    settings:
    {
        icon: (size, colour) =>
        {
            return (
                <Ionicons 
                    name = "settings" color = { colour } 
                    size = { size } 
                />
            )
        },
        onPress: (navigation) =>
        {
            navigation.navigate("settings");
        }
    },

};

export default optionsHeaderButtons;