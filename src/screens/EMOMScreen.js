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
    TouchableOpacity
} from 'react-native'

import Select from '../components/Select'
import { alertas, simNao } from '../data/EMOMData';
import Titulo from '../components/Titulo';
import Time from '../components/Time';
import ProgressBar from './../components/ProgressBar';
import BackgroundProgress from './../components/BackgroundProgress';
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

const SECONDS = 1000;
class EMOMScreen extends React.Component {

    state = {
        keyboardIsVisible: false,

        selectedAlerts: [0, 15],
        countdown: 0,
        time: '1',

        isRunning: false,
        countdownValue: 5,
        count: 0
    }

    componentDidMount() {

        Sound.setCategory('Playback', true)
        this.alert = new Sound(alert)


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

    shouldAlert = () => {
        const resto = this.state.count % 60
        if (this.state.selectedAlerts.indexOf(resto) >= 0) {
            this.alert.play()
        }
        if (this.state.countdown === 1) {
            if (resto >= 55 && resto < 60) {
                this.alert.play()
            }
        }
    }

    onPlay = () => {

        this.setState({
            isRunning: true,
            countdownValue: this.state.countdown === 1 ? 5 :0,
            count:0
        })

        const count = () => {
            this.shouldAlert()
            this.setState({ count: this.state.count + 1 }, () => {
                if (this.state.count === (parseInt(this.state.time) * 60)) {
                    clearInterval(this.countTimer)
                }
            })
        }

        // check countdown
        if (this.state.countdown === 1) {
            this.alert.play()
            this.counterTimer = setInterval(() => {
                this.alert.play()
                const { countdownValue } = this.state
                if (countdownValue === 0) {
                    clearInterval(this.counterTimer)
                    this.setState({ countdownValue: 0 })
                    this.countTimer = setInterval(count, SECONDS);
                } else {
                    this.setState({ countdownValue: this.state.countdownValue - 1 })
                }

            }, SECONDS)
        } else {
            this.countTimer = setInterval(count, SECONDS)
        }
        // start count
        // check countdown end
    }

    onStop = () => {
        this.setState({
            isRunning:false,
        })
        clearInterval(this.counterTimer)
        clearInterval(this.countTimer)
    }

    render() {
        const {
            selectedAlerts,
            countdown,
            time,
            isRunning,
            countdownValue,
            count
        } = this.state

        const percMinute = parseInt(((count % 60) / 60) * 100)
        const percTime = parseInt((count / 60) / parseInt(time) * 100)
        const timeToEnd = parseInt(time) * 60 - count

        if (isRunning) {
            return (
                <BackgroundProgress percentage={percMinute} >
                    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
                        <View style={{ flex: 1 }} >
                            <Titulo
                                style={styles.title}
                                label='EMOM'
                                subLabel='Every Minute on the minute' />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Time time={this.state.count} />
                            <ProgressBar percentage={percTime} />
                            <Time time={timeToEnd} type='text2' text=' restantes' />
                        </View>
                        <View style={{ flex: 1, justifyContent:'flex-end' }} >
                            {
                                countdownValue > 0 && countdown === 1
                                    ? <Text style={styles.countdown} >{countdownValue} </Text>
                                    : null
                            }
                            <TouchableOpacity onPress={this.onStop}>
                                <Image
                                    style={[styles.image, {alignSelf:'center', marginBottom:20} ] }
                                    source={require('../../assets/images/btnStop.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </BackgroundProgress>
            )
        }

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
                        value={selectedAlerts}
                        label='Alertas'
                        options={alertas}
                        onSelected={selectedAlerts => this.setState({ selectedAlerts })} />
                    <Select
                        value={countdown}
                        label='Contagem Regressiva'
                        options={simNao}
                        onSelected={countdown => this.setState({ countdown })} />
                    <Text style={styles.subTitle} >Quantos minutos:</Text>
                    <TextInput style={[styles.input, keyboardStyle]}
                        keyboardType='numeric'
                        value={time}
                        onChangeText={time => this.setState({ time })} />
                    <Text style={styles.subTitle} >minutos</Text>
                    <View style={[styles.containerButton] }>
                        <TouchableOpacity onPress={this.onPlay}>
                            <Image
                                style={styles.image}
                                source={require('../../assets/images/BtnPlay.png')} />
                        </TouchableOpacity>
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
    countdown: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 144,
        textAlign: 'center',
        color: '#fff',
    }
})