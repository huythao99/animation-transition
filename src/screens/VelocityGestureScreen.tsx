import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

const {width, height} = Dimensions.get('window');

export default function VelocityGestureScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = event.translationX + savedTranslateX.value;
      translateY.value = event.translationY + savedTranslateY.value;
    })
    .onEnd(event => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, width - 120],
      });
      // const destX = snapPoint(translateX.value, event.velocityX, [
      //   -width + 120,
      //   0,
      //   width - 120,
      // ]);
      // translateX.value = withSpring(destX, {velocity: event.velocityX});
      // translateX.value = withSpring(Math.max(width - 120, event.velocityX));
      // const destY = snapPoint(translateY.value, event.velocityY, [
      //   -height + 120,
      //   0,
      //   height - 120,
      // ]);
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, height - 120],
      });
      // translateY.value = withSpring(destY, {velocity: event.velocityY});
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.item, style]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 120,
    height: 120,
    backgroundColor: '#AD6262',
    borderRadius: 4,
  },
});
