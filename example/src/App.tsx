import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import RNActivityState from 'rn-activity-state';

export default function App() {
  const [appState, setAppState] = React.useState<string>('In app');

  React.useEffect(() => {
    const onMoveToBackgroundListener = RNActivityState.onMoveToBackground(
      () => {
        setAppState('In background');
      }
    );
    const onMoveToAppListener = RNActivityState.onMoveToApp(() => {
      setAppState('In app');
    });

    return () => {
      onMoveToBackgroundListener.remove();
      onMoveToAppListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{appState}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
