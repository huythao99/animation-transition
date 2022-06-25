import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeIn, FlipInEasyX, ZoomOut} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const size = width / 2 - 20;
const particlesAmount = 150;
const particles = Array.from({length: particlesAmount}, (_, index) => index);

export default function VanishCardScreen() {
  const [count, setCount] = React.useState(0);

  const cards = Array.from({length: count}, (_, index) => index);

  const onPressIncre = () => {
    setCount(count + 1);
  };

  const onPressDes = () => {
    setCount(count - 1);
  };

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
              <Animated.View style={styles.cardView} entering={FlipInEasyX} />
              <Animated.View
                style={styles.particleContent}
                exiting={FadeIn.duration(0)}>
                {particles.map(particle => {
                  const ramdomTop = Math.random() * size - 10;
                  const ramdomLeft = Math.random() * size - 10;

                  return (
                    <Animated.View
                      style={[
                        styles.particle,
                        {top: ramdomTop, left: ramdomLeft},
                      ]}
                      key={particle}
                      exiting={ZoomOut.delay(particle)}
                    />
                  );
                })}
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
    width: '100%',
  },
  button: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    marginHorizontal: 16,
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
    marginTop: 20,
  },
  cardContainer: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardView: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    backgroundColor: '#007aff',
    borderRadius: 20,
    zIndex: 99,
  },
  particleContent: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0,
  },
  particle: {
    height: 30,
    width: 30,
    backgroundColor: '#007aff',
    opacity: 0.3,
    position: 'absolute',
  },
});
