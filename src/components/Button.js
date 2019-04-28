import React from 'react'
import {
    TouchableOpacity,
    Text
} from 'react-native'

const Button = ({ text, onPress, style, styleText }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style} >
            <Text style={[styles.button, styleText]} >{text}</Text>
        </TouchableOpacity>
    )
}

Button.defaultProps = {
    text: '',
    onPress: () => { }
}

export default Button

const styles = {
    button: {
        color: '#ffffff',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    }
}