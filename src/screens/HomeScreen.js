import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Button from '../components/Button'

const HomeScreen = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo} >CalisTimer</Text>
            <Button style={styles.btn} text='EMOM' onPress={() => props.navigation.navigate('EMOM')} />
            <Button style={styles.btn} text='AMRP' onPress={() => props.navigation.navigate('EMOM')} />
            <Button style={styles.btn} text='Isometria' onPress={() => props.navigation.navigate('EMOM')} />
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
    logo: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48,
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 111,
        marginTop: 111
    },
    btn: {
        padding: 10
    }
})

export default HomeScreen