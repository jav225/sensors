import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, View, Text } from 'react-native'
import { SensorManager } from 'NativeModules'


const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class LightSensor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            light: 0
        }
    }
    componentDidMount() {
        SensorManager.startLightSensor(100)
        DeviceEventEmitter.addListener('LightSensor', (data) => {
            this.setState({
                ...this.state,
                light: data.light
            })
        })
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>LightSensor:</Text>
                <Value name="light" value={this.state.light} />
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
        width: 190,
        fontSize: 20
    },
    valueName: {
        width: 60,
        fontSize: 20,
        fontWeight: 'bold'
    },
})
