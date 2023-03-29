import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function CustomButton({ text, onPress, style, styleText })
{
    return (
        <TouchableOpacity
            onPress = { onPress }
            style = { style }
            activeOpacity = {0.8}
        >
            <Text style = { styleText }>{ text }</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;