import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native'


const AboutScreen = props => {
    const openUrl = url => ()=> {
        Linking.openURL(url)

    }

    return (
        <View style={styles.container} >
            <Text style={styles.logo} >Sobre</Text>
            <Text style={styles.subTitle} >
                Este aplicativo foi construído durante as aulas de
                devReactJS nos módulos de react-native
            </Text>
            <Text style={styles.myName} >Por Denis Marques</Text>
            <TouchableOpacity onPress={openUrl('https://www.devpleno.com/') }>
                <Image source={require('../../assets/images/LogoDev.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}>
                <Image
                    style={[styles.image, { alignSelf: 'center' }]}
                    source={require('../../assets/images/btnBack.png')} />
            </TouchableOpacity>
        </View>
    )
}

AboutScreen.navigationOptions = {
    header: null
}

export default AboutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF4151',
    },
    logo: {
        fontSize: 48,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'Ubuntu-Bold',
        color: '#fff'
    },
    subTitle: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'Ubuntu-Normal',
        color: '#fff'
    },
    myName :{
        fontSize:20,
        color:'orange',
        fontFamily: 'Ubuntu-Bold',
    }
});

