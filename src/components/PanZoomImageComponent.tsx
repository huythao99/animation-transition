import * as React from 'react';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
  uri: string;
  width: number;
  height: number;
}

export default function PanZoomImageComponent(props: Props) {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1, {duration: 500});
    });

  const styleImage = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -((width / props.width) * height) / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: ((width / props.width) * height) / 2},
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <AnimatedImage
          style={[
            styles.image,
            styleImage,
            {width, height: (width / props.width) * props.height},
          ]}
          source={{
            uri: props.uri,
          }}
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  image: {
    resizeMode: 'cover',
  },
});
