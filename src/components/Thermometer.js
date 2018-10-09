import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, View, Text } from 'react-native'
import { SensorManager } from 'NativeModules'


const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class Thermometer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            temp: 0
        }
    }
    componentDidMount() {
        SensorManager.startThermometer(1000)
        DeviceEventEmitter.addListener('Thermometer', (data) => {
            this.setState({
                ...this.state,
                temp: data.temp
            })
        })
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Thermometer:</Text>
                <Value name="temp" value={this.state.temp} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headline: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    valueContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    valueValue: {
        width: 200,
        fontSize: 20
    },
    valueName: {
        width: 60,
        fontSize: 20,
        fontWeight: 'bold'
    },
})
