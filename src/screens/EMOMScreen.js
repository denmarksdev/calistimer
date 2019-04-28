import React from 'react'
import {
    View,
    Image,
    Text,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
} from 'react-native'

import Select from '../components/Select'
import { alertas, simNao } from '../data/EMOMData';
import Titulo from '../components/Titulo';


class EMOMScreen extends React.Component {

    state = {
        keyboardIsVisible: false
    }

    componentDidMount() {
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({ keyboardIsVisible: true })
        })
        this.kbHide = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ keyboardIsVisible: false })
        })
    }

    componentWillUnmount() {
        this.kbShow.remove()
        this.kbHide.remove()
    }

    render() {

        const keyboardStyle = this.state.keyboardIsVisible
            ? { backgroundColor: 'orange' }
            : ''

        return (
            <KeyboardAvoidingView style={styles.container} >
                <ScrollView style={styles.container}>
                    <Titulo
                        style={styles.title}
                        label='EMOM'
                        subLabel='Every Minute on the minute' />
                    <Image style={styles.image} source={require('../../assets/images/settings.png')} />
                    <Select
                        value={0}
                        label='Alertas'
                        options={alertas} />
                    <Select
                        value={1}
                        label='Contagem Regressiva'
                        options={simNao} />
                    <Text style={styles.subTitle} >Quantos minutos:</Text>
                    <TextInput style={[styles.input, keyboardStyle]}
                        keyboardType='numeric'
                        value='15' />
                    <Text style={styles.subTitle} >minutos</Text>
                    <View style={styles.containerButton}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/images/BtnPlay.png')} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

EMOMScreen.navigationOptions = {
    header: null
}

export default EMOMScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF4151',
        flex: 1,
    },
    title: {
        marginTop: 60,
        marginBottom: 12
    },
    subTitle: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24,
    },
    input: {
        textAlign: 'center',
        color: '#000',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 48,
    },
    image: {
        marginTop: 10,
        alignSelf: 'center'
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})