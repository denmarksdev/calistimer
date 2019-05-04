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
import KeepAwake from 'react-native-keep-awake';

const alert = require('../../assets/sounds/alert.wav')

const DEFAULT_SECONDS = 1000;
class EMOMScreen extends React.Component {

    state = {
        keyboardIsVisible: false,

        selectedAlerts: [0, 15],
        countdown: 0,
        time: '1',

        isRunning: false,
        countdownValue: 5,
        count: 0,
        paused: false,
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
        this.setState({seconds:DEFAULT_SECONDS}, ()=> this.play())
    }

    play = () => {
        this.setState({
            isRunning: true,
            countdownValue: this.state.countdown === 1 ? 5 : 0,
            count: 0,
            stoped: false,
        })


        if (this.state.paused) return

        const count = () => {
            if (this.state.paused) return
            this.shouldAlert()
            this.setState({ count: this.state.count + 1 }, () => {
                if (this.state.count === (parseInt(this.state.time) * 60)) {
                    clearInterval(this.countTimer)
                }
            })
        }

        if (this.state.countdown === 1) {
            this.alert.play()
            this.counterTimer = setInterval(() => {
                if (this.state.paused) return
                this.alert.play()
                const { countdownValue } = this.state
                if (countdownValue === 0) {
                    clearInterval(this.counterTimer)
                    this.setState({ countdownValue: 0 })
                    this.countTimer = setInterval(count, this.state.seconds);
                } else {
                    this.setState({ countdownValue: this.state.countdownValue - 1 })
                }

            }, this.state.seconds)
        } else {
            this.countTimer = setInterval(count, this.state.seconds)
        }
    }

    onStop = () => {
        this.setState({
            paused: !this.state.paused
        })
    }

    onRefresh = () => {
        if (!this.state.paused) return
        this.setState({ isRunning: false, count: 0, paused: false })
        this.play()
    }

    onBack = () => {
        if (!this.state.paused || !this.state.isRunning) return
        clearInterval(this.counterTimer)
        clearInterval(this.countTimer)
        this.setState({ isRunning: false, count: 0, paused: false , seconds: DEFAULT_SECONDS})
    }

    onTest = () => {
        this.setState({ seconds: 100 }, () => this.play())
    }

    render() {
        const {
            selectedAlerts,
            countdown,
            time,
            isRunning,
            count,
            countdownValue
        } = this.state

        const percMinute = parseInt(((count % 60) / 60) * 100)
        const percTime = parseInt((count / 60) / parseInt(time) * 100)
        const timeToEnd = parseInt(time) * 60 - count
        const opacity = !this.state.paused ? 0.6 : 1

        if (isRunning) {
            return (
                <BackgroundProgress percentage={percMinute} >
                    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
                       <KeepAwake />
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
                        {
                            countdownValue > 0 
                            ? <Text style={styles.countdown} >{countdownValue} </Text>
                            :null
                        }
                        <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                                <TouchableOpacity onPress={this.onBack}>
                                    <Image
                                        style={[styles.image, { alignSelf: 'center', marginBottom: 20, opacity }]}
                                        source={require('../../assets/images/btnBack.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onStop}>
                                    <Image
                                        style={[styles.image, { alignSelf: 'center', marginBottom: 20 }]}
                                        source={this.state.paused
                                            ? require('../../assets/images/BtnPlay.png')
                                            : require('../../assets/images/btnStop.png')
                                        } />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onRefresh}>
                                    <Image
                                        style={[styles.image, { alignSelf: 'center', marginBottom: 20, opacity }]}
                                        source={require('../../assets/images/btnRefresh.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BackgroundProgress >
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
                    
                    <View style={[styles.containerButton]}>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image
                                style={[styles.image, { alignSelf: 'center' }]}
                                source={require('../../assets/images/btnBack.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPlay}>
                            <Image
                                style={styles.image}
                                source={require('../../assets/images/BtnPlay.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onTest}>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'Ubuntu-Normal' }} >Testar</Text>
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
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    countdown: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 144,
        textAlign: 'center',
        color: '#fff',
    }
})