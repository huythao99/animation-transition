import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export default function SensorScreen() {
  const animatedSensor = useAnimatedSensor(SensorType.GRAVITY, {interval: 10}); // <- initialization
  console.log(animatedSensor);
  const style = useAnimatedStyle(() => {
    // const yaw = Math.abs(animatedSensor.sensor.value.yaw);
    // const pitch = Math.abs(animatedSensor.sensor.value.pitch);
    return {
      // height: withTiming(yaw * 200 + 20, {duration: 100}), // <- usage
      // width: withTiming(pitch * 200 + 20, {duration: 100}), // <- usage
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.item, style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    // width: 120,
    // height: 120,
    backgroundColor: '#AD6262',
    borderRadius: 4,
  },
});
