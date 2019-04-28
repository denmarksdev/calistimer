import React from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

const Titulo = ({ label, subLabel , style }) => {
    return (
        <View style={ [styles.container, style] }>
            <Text style={styles.title}>
                {label}
            </Text>
            <Text style={styles.subTitle}>
                {subLabel}
            </Text>
        </View>
    )
}

Titulo.defaultProps = {
    label: '',
    subLabel: ''
}

export default Titulo

const styles = StyleSheet.create({
    container:{
        display:'flex'
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48,
    },
    subTitle: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 14,
    },
})

