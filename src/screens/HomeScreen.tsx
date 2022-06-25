import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RootParamsList} from '../interface';

type Props = NativeStackScreenProps<RootParamsList, 'HoldCardScreen'>;

export default function HomeScreen({navigation}: Props) {
  const onPressHoldCard = () => {
    navigation.navigate('HoldCardScreen');
  };

  const onPressVanishCard = () => {
    navigation.navigate('VanishCardScreen');
  };

  const onPressPanZoom = () => {
    navigation.navigate('PanZoomImageScreen');
  };

  const onPressSwipeSCreen = () => {
    navigation.navigate('SwipeScreen');
  };

  return (
    <ScrollView>
      <TouchableOpacity style={styles.button} onPress={onPressHoldCard}>
        <Text style={styles.text}>Hole Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressVanishCard}>
        <Text style={styles.text}>Vanish Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressPanZoom}>
        <Text style={styles.text}>Pan Zoom</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressSwipeSCreen}>
        <Text style={styles.text}>Swipe Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    marginVertical: 18,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007aff',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
