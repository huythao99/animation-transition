import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Animated} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootParamsList} from './src/interface';
import HoldCardScreen from './src/screens/HoleCardScreen';
import HomeScreen from './src/screens/HomeScreen';
import PanZoomImageScreen from './src/screens/PanZoomImageScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import VanishCardScreen from './src/screens/VanishCardScreen';

const Stack = createStackNavigator<RootParamsList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="HoldCardScreen"
            component={HoldCardScreen}
            options={{
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {
                    duration: 500,
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: 500,
                  },
                },
              },
              cardStyleInterpolator: ({current}) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        rotateY: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            '-90deg', // Focused, but offscreen in the beginning
                            '0deg', // Fully focused
                          ],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                    opacity: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                };
              },
              headerStyleInterpolator: ({current, next}) => {
                const opacity = Animated.add(
                  current.progress,
                  next ? next.progress : 0,
                ).interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, 1, 0],
                });

                return {
                  leftButtonStyle: {opacity},
                  rightButtonStyle: {opacity},
                  titleStyle: {opacity},
                  backgroundStyle: {opacity},
                };
              },
            }}
          />
          <Stack.Screen
            name="VanishCardScreen"
            component={VanishCardScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'vertical',
              transitionSpec: {
                open: {
                  animation: 'spring',
                  config: {
                    stiffness: 1000,
                    damping: 500,
                    mass: 3,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: 500,
                  },
                },
              },
              cardStyleInterpolator: ({current, layouts: {screen}}) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateY: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            screen.height, // Focused, but offscreen in the beginning
                            0, // Fully focused
                          ],
                          extrapolate: 'clamp',
                        }),
                      },
                      {
                        scale: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                    opacity: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                };
              },
              headerStyleInterpolator: ({current, next}) => {
                const opacity = Animated.add(
                  current.progress,
                  next ? next.progress : 0,
                ).interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, 1, 0],
                });

                return {
                  leftButtonStyle: {opacity},
                  rightButtonStyle: {opacity},
                  titleStyle: {opacity},
                  backgroundStyle: {opacity},
                };
              },
            }}
          />
          <Stack.Screen
            name="PanZoomImageScreen"
            component={PanZoomImageScreen}
            options={{
              headerShown: false,
              transitionSpec: {
                open: {
                  animation: 'spring',
                  config: {
                    stiffness: 1000,
                    damping: 500,
                    mass: 3,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: 500,
                  },
                },
              },
              cardStyleInterpolator: ({current, next}) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        rotateZ: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            '0deg', // Focused, but offscreen in the beginning
                            '360deg', // Fully focused
                          ],
                          extrapolate: 'clamp',
                        }),
                      },
                      {
                        scale: next
                          ? next.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0],
                              extrapolate: 'clamp',
                            })
                          : current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1],
                              extrapolate: 'clamp',
                            }),
                      },
                    ],
                    opacity: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                };
              },
              headerStyleInterpolator: ({current, next}) => {
                const opacity = Animated.add(
                  current.progress,
                  next ? next.progress : 0,
                ).interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, 1, 0],
                });

                return {
                  leftButtonStyle: {opacity},
                  rightButtonStyle: {opacity},
                  titleStyle: {opacity},
                  backgroundStyle: {opacity},
                };
              },
            }}
          />
          <Stack.Screen
            name="SwipeScreen"
            component={SwipeScreen}
            options={{
              headerShown: false,
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {
                    duration: 500,
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: 500,
                  },
                },
              },
              cardStyleInterpolator: ({current, next}) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        rotateY: next
                          ? next.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '180deg'],
                            })
                          : current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['180deg', '0deg'],
                            }),
                      },
                    ],
                    opacity: next
                      ? next.progress.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [1, 1, 0],
                        })
                      : current.progress.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0, 0, 1],
                        }),
                  },
                  overlayStyle: {
                    opacity: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                };
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
