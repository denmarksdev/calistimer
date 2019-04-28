import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import Select from '../components/Select'
import { alertas, simNao } from '../data/EMOMData';
import Titulo from '../components/Titulo';

const EMOMScreen = props => {

    return (
        <View style={styles.container}>
            <Titulo
                style={styles.title}
                label='EMOM'
                subLabel='Every Minute on the minute' />
            <Select
                value={0}
                label='Alertas'
                options={alertas} />
            <Select
                value={1}
                label='Contagem Regressiva'
                options={simNao} />
        </View>
    )
}

EMOMScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF4151',
        flex: 1,
    },
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    option: {
        fontSize: 20,
        fontFamily: 'Ubuntu-Regular',
        padding: 10
    },
    optionSelect: {
        fontSize: 20,
        fontFamily: 'Ubuntu-Regular',
        color: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.6)',
        padding: 10
    },
})

export default EMOMScreen