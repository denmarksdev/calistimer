import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Button from '../components/Button'
import Titulo from '../components/Titulo';

const HomeScreen = props => {
    return (
        <View style={styles.container}>
            <Titulo label=' CalisTimer' style={styles.titulo} />
            <Button style={styles.btn} text='EMOM' onPress={() => props.navigation.navigate('EMOM')} />
            <Button style={styles.btn} text='AMRAP' onPress={() => props.navigation.navigate('AMRAP')} />
            <Button style={styles.btn} text='Isometria' onPress={() => props.navigation.navigate('ISO')} />
            <Button style={styles.btn} text='Sobre' onPress={() => props.navigation.navigate('About')} />
        </View>
    )
}

HomeScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF4151',
        flex: 1,
    },
    titulo: {
        marginBottom: 111,
        marginTop: 111
    },
    btn: {
        padding: 10
    }
})

export default HomeScreen