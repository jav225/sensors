import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, View, Text } from 'react-native'
import { SensorManager } from 'NativeModules'


const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class Gyroscope extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0,
            z: 0
        }
    }
    componentDidMount() {
        SensorManager.startGyroscope(100)
        DeviceEventEmitter.addListener('Gyroscope', (data) => {
            this.setState({
                ...this.state,
                x: data.x,
                y: data.y,
                z: data.z,
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Gyroscope values:</Text>
                <Value name="x" value={this.state.x} />
                <Value name="y" value={this.state.y} />
                <Value name="z" value={this.state.z} />
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
        width: 50,
        fontSize: 20,
        fontWeight: 'bold'
    },
})
