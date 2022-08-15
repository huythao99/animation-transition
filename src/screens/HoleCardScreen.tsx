import * as React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  FlipInEasyX,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export default function HoldCardScreen() {
  const [count, setCount] = React.useState(0);

  const cards = Array.from({length: count}, (_, index) => index);

  const onPressIncre = () => {
    setCount(count + 1);
  };

  const onPressDes = () => {
    setCount(count - 1);
  };

  function cardExiting() {
    'worklet';
    const animations = {
      transform: [
        {
          translateY: withSequence(
            withTiming(-10),
            withTiming(250, {duration: 600}),
          ),
        },
        {
          rotateZ: withSequence(
            withTiming('5deg'),
            withTiming('0deg', {duration: 600}),
          ),
        },
      ],
    };
    const initialValues = {
      transform: [{translateY: 0}, {rotateZ: '0deg'}],
    };
    return {
      initialValues,
      animations,
    };
  }

  function holeExiting() {
    'worklet';
    const animations = {
      transform: [
        {
          scale: withSequence(
            withTiming(1, {duration: 400}),
            withTiming(1, {duration: 600}),
            withTiming(0, {duration: 400}),
          ),
        },
      ],
    };
    const initialValues = {
      transform: [{scale: 0}],
    };
    return {
      initialValues,
      animations,
    };
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPressIncre}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressDes}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {cards.map(item => {
          return (
            <View key={item} style={[styles.cardContainer]}>
              <View style={styles.cardHidder}>
                <Animated.View
                  style={styles.card}
                  entering={FlipInEasyX}
                  exiting={cardExiting}
                />
              </View>
              <Animated.View style={styles.holdContainer} exiting={holeExiting}>
                <View style={styles.holdBorder}>
                  <View style={styles.hold} />
                </View>
              </Animated.View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    width: width,
    justifyContent: 'space-around',
  },
  button: {
    width: width / 2 - 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#007aff',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardContainer: {
    width: width / 2,
    alignItems: 'center',
  },
  cardHidder: {
    aligItems: 'center',
    padding: 0,
    paddingBottom: 60,
    paddingTop: 20,
    marginBottom: -35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    zIndex: 999,
  },
  card: {
    height: width / 2 - 25,
    width: width / 2 - 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    borderRadius: 20,
  },
  holdContainer: {
    transform: [
      {
        scale: 0,
      },
    ],
  },
  holdBorder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'gray',
    transform: [{scaleX: 4}],
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hold: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#000000',
    marginTop: 5,
  },
});
