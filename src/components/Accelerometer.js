import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, View, Text } from 'react-native'
import { SensorManager } from 'NativeModules'


const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class Accelerometer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            isOn: false,
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('Accelerometer', (data) => {
            this.setState({
                ...this.state,
                x: data.x,
                y: data.y,
                z: data.z,
            })
        })
    }
    toggleSwitch() {
        this.setState({
            ...this.state,
            isOn: !isOn,
        })
        if (isOn) {
            SensorManager.startAccelerometer(100)
        } else {
            SensorManager.stopAccelerometer()
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headlineContainer}>
                    <Text style={styles.headline}>Accelerometer values:</Text>
                    <Switch
                        value={this.state.isOn}
                        onValueChange={this.toggleSwitch} />
                </View>
                {
                    this.state.isOn ?
                        (
                            <View>
                                <Value name="x" value={this.state.x} />
                                <Value name="y" value={this.state.y} />
                                <Value name="z" value={this.state.z} />
                            </View>
                        ) : (
                            <View></View>
                        )
                }

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
    headlineContainer: {
        flexDirection: 'row',
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
