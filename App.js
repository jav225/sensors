import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Accelerometer from './src/components/Accelerometer'
import Gyroscope from './src/components/Gyroscope'
import Magnetometer from './src/components/Magnetometer'
import Orientation from './src/components/Orientation'
import StepCounter from './src/components/StepCounter'
import Thermometer from './src/components/Thermometer'
import LightSensor from './src/components/LightSensor'
import Proximity from './src/components/Proximity'

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headline}>Sensores: </Text>
        <Accelerometer />
        <Gyroscope />
        <Magnetometer />
        <Orientation />
        <StepCounter />
        <Thermometer />
        <LightSensor />
        <Proximity />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 30,
    margin: 10,
  },
})
