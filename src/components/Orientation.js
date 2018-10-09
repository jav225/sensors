import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, View, Text } from 'react-native'
import { SensorManager } from 'NativeModules'


const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class Orientation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            azimuth: 0,
            pitch: 0,
            roll: 0
        }
    }
    componentDidMount() {
        SensorManager.startOrientation(100)
        DeviceEventEmitter.addListener('Orientation', (data) => {
            this.setState({
                ...this.state,
                azimuth: data.azimuth,
                pitch: data.pitch,
                roll: data.roll,
            })
        })
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Orientation values:</Text>
                <Value name="Azimuth (z-axis)" value={this.state.azimuth} />
                <Value name="Pitch (x-axis)" value={this.state.pitch} />
                <Value name="Roll (y-axis)" value={this.state.roll} />
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
        width: 50,
        fontSize: 20
    },
    valueName: {
        width: 200,
        fontSize: 20,
        fontWeight: 'bold'
    },
})
