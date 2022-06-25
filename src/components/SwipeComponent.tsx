import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Layout,
  LightSpeedInLeft,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  id: number;
  value: number;
  onDelete: (id: number) => void;
}

export default function SwipeComponent(props: Props) {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onChange(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > -130 && translateX.value < 230) {
        translateX.value = withTiming(0, {duration: 300});
      } else {
        runOnJS(props.onDelete)(props.id);
      }
    });

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, styleAnimation]}
        // entering={LightSpeedInLeft.duration(1400)}
        layout={Layout.springify()}>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{props.value}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 12,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '90%',
    borderRadius: 4,
    shadowColor: '#AEAEAE',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 3,
    elevation: 0.5,
  },
  content: {
    fontSize: 16,
  },
});
