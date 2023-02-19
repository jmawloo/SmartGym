/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// @ts-nocheck
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import RNBluetoothClassic, {
  BluetoothEventType,
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

// import {RootNavigator} from './src/navigation';
const App = () => {
  const [HCDevice, setHCDevice] = useState<BluetoothDevice>();

  const checkDevices = async () => {
    try {
      const paired = (await RNBluetoothClassic.getBondedDevices()).filter(
        device => device.name.startsWith('HC'),
      );
      if (paired.length !== 1) {
        throw new Error('Paired HC05 not found');
      } else {
        // Attempt device connection.
        const device = paired[0];
        if (!(await device.connect())) {
          throw new Error("Couldn't connect to HC05 device!");
        }
        if (await device.isConnected()) setHCDevice(device);
        console.warn("Pair success");
      }
    } catch (err) {
      // Error if Bluetooth is not enabled
      // Or there are any issues requesting paired devices
      console.error(err);
    }
  };

  const sendData = async (data: string) => {
    return await HCDevice.write(data, 'ascii');
  };
  useEffect(() => {
    return () => {
      HCDevice && HCDevice.disconnect();
    };
  }, [HCDevice]);
  // return <RootNavigator />;
  return (
    <View>
      <Text>Hello world</Text>
      <Button
        title={HCDevice ? 'connected' : 'Click to query paired devices'}
        onPress={checkDevices}
      />
      <Button title="Send 0" onPress={() => sendData('0')} />
      <Button title="Send 1" onPress={() => sendData('1')} />
    </View>
  );
};

export default App;
