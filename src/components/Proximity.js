import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, View, Text } from 'react-native'
import { SensorManager } from 'NativeModules'


const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class Proximity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNear: false,
            value: 0,
            maxRange: 0,
        }
    }
    componentDidMount() {
        SensorManager.startProximity(100)
        DeviceEventEmitter.addListener('Proximity', (data) => {
            this.setState({
                ...this.state,
                isNear: data.isNear,
                value: data.value,
                maxRange: data.maxRange,
            })
        })
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Proximity:</Text>
                <Value name="isNear" value={this.state.isNear} />
                <Value name="value" value={this.state.value} />
                <Value name="maxRange" value={this.state.maxRange} />
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
        width: 140,
        fontSize: 20
    },
    valueName: {
        width: 110,
        fontSize: 20,
        fontWeight: 'bold'
    },
})
