import React from 'react'
import {
    Text,
    StyleSheet
} from 'react-native'

const Timer = ({time, text, type}) => {
    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)
    const format = num => {
        if(num <10){
            return '0' + num
        }
        return num
    }
    const text1 = type ? styles.text2 : styles.text

    return (
        <Text style={text1} >
        {minutes}:{ format(seconds)} {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text : {
        fontFamily:'Ubuntu-Bold',
        fontSize:96,
        color:'#fff',
        textAlign:'center',
    },
    text2: {
        fontFamily:'Ubuntu-Regular',
        fontSize: 24,
        color:'#fff',
        textAlign:'center'
    }
})

Timer.defaultProps = {
    time:0,
    text:''
}

export default Timer
