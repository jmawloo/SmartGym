import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { RootStackParamList } from '../navigation';
import { Base64 } from '../lib/base64';

type DeviceCardProps = {
  device: Device;
};



const DeviceCard = ({ device }: DeviceCardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // console.warn(device.id);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // is the device connected?
    device.isConnected().then(setIsConnected);
  }, [device]);

  return (
    <TouchableOpacity
      style={styles.container}
      // navigate to the Device Screen
      onPress={() => navigation.navigate('Device', { device })}>
      <Text style={styles.text}>{`Id : ${device.id}`}</Text>
      <Text style={styles.text}>{`Name : ${device.name}`}</Text>
      <Text style={styles.text}>{`Is connected : ${isConnected}`}</Text>
      <Text style={styles.text}>{`RSSI : ${device.rssi}`}</Text>
      {/* Decode the ble device manufacturer which is encoded with the base64 algorythme */}
      <Text style={styles.text}>{`Manufacturer : ${Base64.decode(
        device.manufacturerData,
      )}`}</Text>
      <Text style={styles.text}>{`ServiceData : ${JSON.stringify(device.serviceData)}`}</Text>
      <Text style={styles.text}>{`UUIDS : ${device.serviceUUIDs}`}</Text>
      <Text style={styles.text}>{`TxPowerLevel : ${device.txPowerLevel}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  text: {
    color: 'black',
  },
});

export { DeviceCard };
