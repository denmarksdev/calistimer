import React, { Fragment } from 'react'
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
import { Objetivos } from '../data/IsometriaData';
import Titulo from '../components/Titulo';
import Time from '../components/Time';
import BackgroundProgress from '../components/BackgroundProgress';
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

const SECONDS = 1000;
class IsomtriaScreen extends React.Component {

    state = {
        keyboardIsVisible: false,

        objetivo: 0,
        countdown: 0,
        time: '1',

        isRunning: false,
        countdownValue: 5,
        count: 0,
        isPaused: false,
        seconds: 1000
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
        const { count, time } = this.state
        if (count >= parseInt(time) - 5 && count <= parseInt(time)) {
            this.alert.play()
        }
    }

    play() {
        const time = this.state.objetivo === 0
            ? '0'
            : this.state.time

        this.setState({
            isRunning: true,
            countdownValue: 5,
            count: 0,
            isPaused: false,
            time
        })

        const count = () => {
            if (this.state.isPaused) return
            this.shouldAlert()
            this.setState({ count: this.state.count + 1 })
        }
        this.alert.play()
        this.counterTimer = setInterval(() => {
            if (this.state.isPaused) return
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
    }

    onPlay = () => {
        this.setState({ seconds: 1000 }, () => this.play())

    }

    onStop = () => {
        this.setState({
            isPaused: !this.state.isPaused
        })
    }

    onRefresh = () => {
        if (!this.state.isPaused) return
        clearInterval(this.counterTimer)
        clearInterval(this.countTimer)
        this.onPlay()
    }

    onBack = () => {
        if (!this.state.isPaused || !this.state.isRunning) return
        clearInterval(this.counterTimer)
        clearInterval(this.countTimer)
        this.setState({ isRunning: false, seconds: parseFloat({ ...SECONDS }) })
    }

    onTest = () => {
        this.setState({ seconds: 100 }, () => this.play())
    }

    render() {
        const {
            objetivo,
            time,
            isRunning,
            countdownValue,
            count
        } = this.state

        const percMinute = time === '0' ? 0 : parseInt(((count) / parseInt(time)) * 100)
        const timeToEnd = parseInt(time) >= count
            ? parseInt(time) - count
            : 0

        const opacity = !this.state.isPaused ? 0.6 : 1

        if (isRunning) {
            return (
                <BackgroundProgress percentage={percMinute} >
                    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
                        <View style={{ flex: 1 }} >
                            <Titulo
                                style={styles.title}
                                label='Isometria' />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Time time={this.state.count} />
                            {
                                objetivo === 1
                                    ? <Time time={timeToEnd} type='text2' text=' restantes' />
                                    : null
                            }

                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40 }}>
                            {
                                countdownValue > 0 &&
                                <Text style={styles.countdown} >{countdownValue} </Text>
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                                <TouchableOpacity onPress={this.onBack}>
                                    <Image
                                        style={[styles.image, { alignSelf: 'center', marginBottom: 20, opacity }]}
                                        source={require('../../assets/images/btnBack.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onStop}>
                                    <Image
                                        style={[styles.image, { alignSelf: 'center', marginBottom: 20 }]}
                                        source={this.state.isPaused
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
                        label='Isometria' />
                    <Image style={styles.image} source={require('../../assets/images/settings.png')} />
                    <Select
                        value={objetivo}
                        label='Objetivos'
                        options={Objetivos}
                        onSelected={objetivo => this.setState({ objetivo })} />
                    {
                        this.state.objetivo !== 0 ?
                            <Fragment>
                                <Text style={styles.subTitle} >Quantos segundos:</Text>
                                <TextInput style={[styles.input, keyboardStyle]}
                                    keyboardType='numeric'
                                    value={time}
                                    onChangeText={time => this.setState({ time })} />
                            </Fragment>
                            : null
                    }
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

IsomtriaScreen.navigationOptions = {
    header: null
}

export default IsomtriaScreen

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