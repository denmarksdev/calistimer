import React from 'react'
import { View, Animated } from 'react-native'

class ProgressBar extends React.Component {

    constructor(props) {
        super(props)
        this.width = new Animated.Value(0)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.percentage != this.props.percentage) {
            Animated.timing(this.width, {
                toValue: this.props.percentage,
                duration: 500
            }).start()
        }
    }
    

    render() {
        const { color, height } = this.props
        const w =  this.width.interpolate({
            inputRange:[0,100],
            outputRange:['0%','100%' ]
        })

        return (
            <View>
                <Animated.View style={{ width: w , backgroundColor: color, height: height }}>
                </Animated.View>
            </View>
        )

    }
}

ProgressBar.defaultProps = {
    height: 3,
    percentage: '1',
    color: '#fff'
}

export default ProgressBar