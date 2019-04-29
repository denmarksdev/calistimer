import React from 'react';
import { View, Animated } from 'react-native'

class BackgroundProgress extends React.Component {

    constructor(props) {
        super(props)
        this.height = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.percentage != this.props.percentage) {
            Animated.timing(this.height, {
                toValue: this.props.percentage > 100 ? 100 : this.props.percentage,
                duration: 500
            }).start()
        }
    }

    render() {
        const { children } = this.props
        const h = this.height.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })
        const h2 = this.height.interpolate({
            inputRange: [0, 100],
            outputRange: ['100%', '0%']
        })


        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Animated.View style={{ height: h2, backgroundColor: '#FF4151' }}></Animated.View>
                    <Animated.View style={{ height: h, backgroundColor: '#6B0F36' }}></Animated.View>
                </View>
                <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
                    {children}
                </View>
            </View>
        )
    }
}

BackgroundProgress.defaultProps = {
    percentage: '0'
}

export default BackgroundProgress

