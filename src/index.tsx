import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeModules,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-activity-state' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const RnActivityState = NativeModules.RnActivityState
  ? NativeModules.RnActivityState
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const onMoveToBackground = (callback: () => void) => {
  RnActivityState;
  return DeviceEventEmitter.addListener('onMoveToBackground', callback);
};

const onMoveToApp = (callback: () => void) => {
  RnActivityState;
  return DeviceEventEmitter.addListener('onMoveToApp', callback);
};

interface RNActivityStateInterface {
  onMoveToBackground(callback: () => void): EmitterSubscription;
  onMoveToApp(callback: () => void): EmitterSubscription;
}

const RNActivityState: RNActivityStateInterface = {
  onMoveToBackground,
  onMoveToApp,
};

export default RNActivityState;
