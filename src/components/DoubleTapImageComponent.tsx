import * as React from 'react';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
  uri: string;
  width: number;
  height: number;
}

export default function DoubleTapImageComponent(props: Props) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const doubleTap = () => {
    scale.value = withSequence(
      withTiming(1, {duration: 500}),
      withTiming(0, {duration: 3000}),
    );
    opacity.value = withSequence(
      withTiming(1, {duration: 500}),
      withTiming(0, {duration: 1500}),
    );
  };

  const stylesAnim = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler
        onActivated={doubleTap}
        numberOfTaps={2}
        maxDurationMs={250}>
        <Animated.View>
          <AnimatedImage
            style={[
              styles.image,
              {width, height: (width / props.width) * props.height},
            ]}
            source={{
              uri: props.uri,
            }}
          />
          <Animated.View style={[styles.heart, stylesAnim]}>
            <FontAwesome5 name="heart" solid={true} color={'red'} size={56} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
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
  heart: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
