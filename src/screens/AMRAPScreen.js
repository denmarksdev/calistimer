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
import ProgressBar from '../components/ProgressBar';
import BackgroundProgress from '../components/BackgroundProgress';
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

const SECONDS = 1000;
class AMRAPScreen extends React.Component {

    state = {
        keyboardIsVisible: false,

        selectedAlerts: [0, 15],
        countdown: 0,
        time: '1',

        isRunning: false,
        countdownValue: 5,
        count: 0,
        repetitions: 0
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
            countdownValue: this.state.countdown === 1 ? 5 : 0,
            count: 0
        })

        const count = () => {
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
    }

    onStop = () => {
        this.setState({
            isRunning: false,
        })
        clearInterval(this.counterTimer)
        clearInterval(this.countTimer)
    }

    decrement = () => {
        if (this.state.repetitions > 0) {
            this.setState({ repetitions: this.state.repetitions - 1 })

        }
    }

    increment = () => {
        this.setState({ repetitions: this.state.repetitions + 1 })
    }

    render() {
        const {
            selectedAlerts,
            countdown,
            time,
            isRunning,
            countdownValue,
            count,
            repetitions
        } = this.state

        const percMinute = parseInt(((count % 60) / 60) * 100)
        const percTime = parseInt((count / 60) / parseInt(time) * 100)
        const timeToEnd = parseInt(time) * 60 - count
        const media = (repetitions > 0 ? count / repetitions : 0).toFixed(0)
        const estimated = Math.floor((media > 0 ? (parseInt(time) * 60) / media : 0))

        if (isRunning) {
            return (
                <BackgroundProgress percentage={percMinute} >
                    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
                        <View style={{ flex: 1 }} >
                            <Titulo
                                style={styles.title}
                                label='AMRAP'
                                subLabel='As Many Repetitions as Possible' />
                        </View>

                        {
                            (repetitions > 0) ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <Time time={media} type='text2' />
                                        <Text style={styles.subTitle} >por repetição</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.count} >{estimated}</Text>
                                        <Text style={styles.subTitle}>repetições</Text>
                                    </View>
                                </View>
                                : null
                        }

                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Time time={this.state.count} />
                            <ProgressBar percentage={percTime} />
                            <Time time={timeToEnd} type='text2' text=' restantes' />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                            <View>
                                {
                                    countdownValue > 0 && countdown === 1
                                        ? <Text style={styles.countdown} >{countdownValue} </Text>
                                        : <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly' }}>
                                            <TouchableOpacity onPress={this.decrement} >
                                                <Text style={styles.countdown}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.countdown} > {repetitions} </Text>
                                            <TouchableOpacity onPress={this.increment} >
                                                <Text style={styles.countdown} >+</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                            <TouchableOpacity onPress={this.onStop}>
                                <Image
                                    style={[styles.image, { alignSelf: 'center', marginBottom: 20 }]}
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
                        label='AMRAP'
                        subLabel='As Many Repetitions as Possible' />
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

AMRAPScreen.navigationOptions = {
    header: null
}

export default AMRAPScreen

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
    },
    count: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24,
        color: '#fff',
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 11,
        textAlign: 'center',
        color: '#fff'
    }
})