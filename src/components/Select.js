import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'


class Select extends React.Component {

    state = {
        selectedOption: ''
    }

    componentDidMount() {
        this.setState({ selectedOption: this.props.value })
    }

    setSelectedStyle = option => {
        return this.checkItem(option)
            ? styles.optionSelect
            : styles.option
    }

    onSelectedOption = opt => () => {

        let newSelectedOption = opt

        if (Array.isArray(this.state.selectedOption)) {
            const index = this.state.selectedOption.indexOf(opt)
            if (index >= 0) {
                newSelectedOption = [...this.state.selectedOption]
                newSelectedOption.splice(index, 1)
            } else {
                newSelectedOption = [...this.state.selectedOption,opt]
            }
        }

        this.setState({ selectedOption:newSelectedOption })
        this.props.onSelected(newSelectedOption)
    }

    getOptionValues = option => {
        let id = ''
        let label = ''

        if (typeof option === 'string') {
            id = option
            label = option
        } else if (typeof option === 'object') {
            id = option.id
            label = option.label
        }

        return { id, label }
    }
    checkItem = item => {
        const { selectedOption } = this.state
        if (Array.isArray(selectedOption)) {
            return selectedOption.indexOf(item) >= 0
        }
        return selectedOption === item

    }

    render() {
        const { options, label } = this.props
        return (
            <View>
                <Text style={styles.title} >{label}</Text>
                <View style={styles.options} >
                    {
                        options.map((option, index) => {
                            const { label, id } = this.getOptionValues(option)
                            return (
                                <TouchableOpacity key={index} onPress={this.onSelectedOption(id)} >
                                    <Text style={this.setSelectedStyle(id)} >{label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

Select.defaultProps = {
    value: undefined,
    label: '',
    options: [],
    onSelected: () => { }
}

export default Select

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 10
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

