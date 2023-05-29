import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

const onMoveToBackground = (callback: () => void) => {
  return DeviceEventEmitter.addListener('onMoveToBackground', callback);
};

const onMoveToApp = (callback: () => void) => {
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
