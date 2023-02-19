import React, { useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DeviceCard } from '../components/DeviceCard';
import { BleManager, Device, DeviceId } from 'react-native-ble-plx';
import { theme } from '../theme';
import { Base64 } from '../lib/base64';

const manager = new BleManager();
const HC05_UUID = "00001101-0000-1000-8000-00805F9B34FB";

// Reducer to add only the devices which have not been added yet
// When the bleManager search for devices, each time it detect a ble device, it returns the ble device even if this one has already been returned
const reducer = (
  state: Device[],
  action: { type: 'ADD_DEVICE'; payload: Device } | { type: 'CLEAR' },
): Device[] => {
  switch (action.type) {
    case 'ADD_DEVICE':
      const { payload: device } = action;

      // check if the detected device is not already added to the list
      if (device && !state.find((dev) => dev.id === device.id)) {
        return [...state, device];
      }
      return state;
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

const HomeScreen = () => {
  // reducer to store and display detected ble devices
  const [scannedDevices, dispatch] = useReducer(reducer, []);

  // state to give the user a feedback about the manager scanning devices
  const [isLoading, setIsLoading] = useState(false);

  const scanDevices = () => {
    // display the Activityindicator
    setIsLoading(true);

    // scan devices
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(JSON.stringify(error));
      }

      // if a device is detected add the device to the list by dispatching the action into the reducer
      if (
        scannedDevice 
        // &&
        // (scannedDevice.name !== null ||
        //   scannedDevice.localName !== null 
        //   // ||(scannedDevice.rssi || 0) >= -50
        //   )
      ) {
        // console.warn(
        //   Base64.decode(scannedDevice.manufacturerData?.replace(/[=]/g, '')),
        // );
        dispatch({type: 'ADD_DEVICE', payload: scannedDevice});
      }
    });
    
    // stop scanning devices after 5 seconds
    setTimeout(async () => {
      manager.stopDeviceScan();
      // Check if device is valid
      // const devices: Device[] = await manager.devices(scannedDevices.map(d => d.id));
      console.warn("getting UUID");
      const devices: Device[] = await manager.devices([HC05_UUID]);
      // const connDevices: Device[] = await manager.connectedDevices(scannedDevices.map(d => d.serviceUUIDs ?? []).flat());
      const connDevices: Device[] = await manager.connectedDevices([HC05_UUID]);
      if (devices.length !== 0) {
        console.warn(JSON.stringify(devices));
      } else if (connDevices.length !== 0) {
        console.warn(JSON.stringify(connDevices));
      } else {
        console.warn("no usable devices found");
      }
      setIsLoading(false);
    }, 5000);
  };

  const ListHeaderComponent = () => (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Step One</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Button
          title="Clear devices"
          onPress={() => dispatch({ type: 'CLEAR' })}
        />
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color={'teal'} size={25} />
          </View>
        ) : (
          <Button title="Scan devices" onPress={scanDevices} />
        )}
      </View>
    </View>
  );

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={[...scannedDevices].sort(
          (da, db) =>
            ((da.txPowerLevel || 0) - (db.txPowerLevel || 0)) ||
            ((db.rssi || 0) - (da.rssi || 0)),
        )}
        renderItem={({ item }) => <DeviceCard device={item} />}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.red,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  content: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing * 2,
  },
  activityIndicatorContainer: { marginVertical: 6 },
});

export { HomeScreen };
