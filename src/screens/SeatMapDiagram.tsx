import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const width = 380;
const height = 800;
const SEAT_SIZE_WIDTH = 15;
const SEAT_SIZE_HEIGHT = 20;
const MIN_X = 422.5;
const MIN_Y = 475;
const X = [
  442.5, 457.5, 472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 442.5, 457.5, 472.5,
  487.5, 502.5, 517.5, 532.5, 547.5, 442.5, 457.5, 472.5, 487.5, 502.5, 517.5,
  532.5, 547.5, 442.5, 457.5, 472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 442.5,
  457.5, 472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 442.5, 457.5, 472.5, 487.5,
  502.5, 517.5, 532.5, 547.5, 442.5, 457.5, 472.5, 487.5, 502.5, 517.5, 532.5,
  547.5, 442.5, 457.5, 472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 442.5, 457.5,
  472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 782.5, 797.5, 812.5, 827.5, 842.5,
  857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5,
  782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5,
  827.5, 842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5,
  872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 782.5,
  797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5,
  842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5,
  887.5, 442.5, 457.5, 472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 442.5, 457.5,
  472.5, 487.5, 502.5, 517.5, 532.5, 547.5, 442.5, 457.5, 472.5, 487.5, 502.5,
  517.5, 532.5, 547.5, 442.5, 457.5, 472.5, 487.5, 502.5, 517.5, 532.5, 547.5,
  487.5, 502.5, 517.5, 532.5, 547.5, 517.5, 532.5, 547.5, 612.5, 627.5, 642.5,
  657.5, 672.5, 687.5, 702.5, 717.5, 612.5, 627.5, 642.5, 657.5, 672.5, 687.5,
  702.5, 717.5, 612.5, 627.5, 642.5, 657.5, 672.5, 687.5, 702.5, 717.5, 612.5,
  627.5, 642.5, 657.5, 672.5, 687.5, 702.5, 717.5, 612.5, 627.5, 642.5, 657.5,
  672.5, 687.5, 702.5, 717.5, 612.5, 627.5, 642.5, 657.5, 672.5, 687.5, 702.5,
  717.5, 612.5, 627.5, 642.5, 657.5, 672.5, 687.5, 702.5, 717.5, 612.5, 627.5,
  642.5, 657.5, 672.5, 687.5, 702.5, 717.5, 612.5, 627.5, 642.5, 657.5, 672.5,
  687.5, 702.5, 717.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5,
  782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5,
  827.5, 842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5,
  872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 782.5,
  797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5,
  842.5, 857.5, 872.5, 887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5,
  887.5, 782.5, 797.5, 812.5, 827.5, 842.5, 857.5, 872.5, 887.5, 952.5, 967.5,
  982.5, 997.5, 1012.5, 1027.5, 1042.5, 1057.5, 952.5, 967.5, 982.5, 997.5,
  1012.5, 1027.5, 1042.5, 1057.5, 952.5, 967.5, 982.5, 997.5, 1012.5, 1027.5,
  1042.5, 1057.5, 952.5, 967.5, 982.5, 997.5, 1012.5, 1027.5, 1042.5, 1057.5,
  952.5, 967.5, 982.5, 997.5, 1012.5, 952.5, 967.5, 982.5,
];

const Y = [
  475, 475, 475, 475, 475, 475, 475, 475, 505, 505, 505, 505, 505, 505, 505,
  505, 535, 535, 535, 535, 535, 535, 535, 535, 565, 565, 565, 565, 565, 565,
  565, 565, 595, 595, 595, 595, 595, 595, 595, 595, 625, 625, 625, 625, 625,
  625, 625, 625, 655, 655, 655, 655, 655, 655, 655, 655, 685, 685, 685, 685,
  685, 685, 685, 685, 715, 715, 715, 715, 715, 715, 715, 715, 475, 475, 475,
  475, 475, 475, 475, 475, 505, 505, 505, 505, 505, 505, 505, 505, 535, 535,
  535, 535, 535, 535, 535, 535, 565, 565, 565, 565, 565, 565, 565, 565, 595,
  595, 595, 595, 595, 595, 595, 595, 625, 625, 625, 625, 625, 625, 625, 625,
  655, 655, 655, 655, 655, 655, 655, 655, 685, 685, 685, 685, 685, 685, 685,
  685, 715, 715, 715, 715, 715, 715, 715, 715, 1105, 1105, 1105, 1105, 1105,
  1105, 1105, 1105, 1135, 1135, 1135, 1135, 1135, 1135, 1135, 1135, 1165, 1165,
  1165, 1165, 1165, 1165, 1165, 1165, 1195, 1195, 1195, 1195, 1195, 1195, 1195,
  1195, 1225, 1225, 1225, 1225, 1225, 1255, 1255, 1255, 1105, 1105, 1105, 1105,
  1105, 1105, 1105, 1105, 1135, 1135, 1135, 1135, 1135, 1135, 1135, 1135, 1165,
  1165, 1165, 1165, 1165, 1165, 1165, 1165, 1195, 1195, 1195, 1195, 1195, 1195,
  1195, 1195, 1225, 1225, 1225, 1225, 1225, 1225, 1225, 1225, 1255, 1255, 1255,
  1255, 1255, 1255, 1255, 1255, 1285, 1285, 1285, 1285, 1285, 1285, 1285, 1285,
  1315, 1315, 1315, 1315, 1315, 1315, 1315, 1315, 1345, 1345, 1345, 1345, 1345,
  1345, 1345, 1345, 1105, 1105, 1105, 1105, 1105, 1105, 1105, 1105, 1135, 1135,
  1135, 1135, 1135, 1135, 1135, 1135, 1165, 1165, 1165, 1165, 1165, 1165, 1165,
  1165, 1195, 1195, 1195, 1195, 1195, 1195, 1195, 1195, 1225, 1225, 1225, 1225,
  1225, 1225, 1225, 1225, 1255, 1255, 1255, 1255, 1255, 1255, 1255, 1255, 1285,
  1285, 1285, 1285, 1285, 1285, 1285, 1285, 1315, 1315, 1315, 1315, 1315, 1315,
  1315, 1315, 1345, 1345, 1345, 1345, 1345, 1345, 1345, 1345, 1105, 1105, 1105,
  1105, 1105, 1105, 1105, 1105, 1135, 1135, 1135, 1135, 1135, 1135, 1135, 1135,
  1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1195, 1195, 1195, 1195, 1195,
  1195, 1195, 1195, 1225, 1225, 1225, 1225, 1225, 1255, 1255, 1255,
];

const SEAT_DATA = X.map((x, index) => {
  return {
    x,
    y: Y[index],
    table: `${index + 1}`,
    id: `${index}`,
  };
});

const userX = 442.5;
const userY = 475;

export default function SeatMapDiagram() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX + savedTranslateX.value;
      translateY.value = event.translationY + savedTranslateY.value;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pinch = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = event.scale * savedScale.value;
    })
    .onEnd(() => {
      scale.value = scale.value;
      savedScale.value = scale.value;
    });

  const seatStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.stageContainer}>
        <Text style={styles.stage}>Stage</Text>
      </View>
      <View
        style={styles.body}
        onLayout={event => console.log(event.nativeEvent.layout)}>
        <GestureDetector gesture={Gesture.Simultaneous(pinch, pan)}>
          <Animated.View style={styles.seatControl}>
            <Animated.View style={[styles.seatContainer, seatStyle]}>
              {SEAT_DATA.map(seat => {
                return (
                  <View
                    key={seat.id}
                    style={[
                      styles.seat,
                      {
                        transform: [
                          {
                            translateX: seat.x - MIN_X,
                          },
                          {
                            translateY: seat.y - MIN_Y,
                          },
                        ],
                      },
                    ]}>
                    <Text style={styles.seatContent}>{seat.table}</Text>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  console.log('run');
                }}
                style={[
                  styles.seat,
                  {
                    transform: [
                      {translateX: userX - MIN_X},
                      {translateY: userY - MIN_Y},
                    ],
                  },
                  styles.seatUser,
                ]}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  stage: {
    fontSize: 16,
  },
  body: {
    marginHorizontal: 16,
    flexGrow: 1,
  },
  seatContainer: {
    width: SEAT_SIZE_WIDTH * 45,
    height: SEAT_SIZE_HEIGHT * 40,
  },
  seatControl: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9,
    overflow: 'hidden',
  },
  seat: {
    width: SEAT_SIZE_WIDTH,
    height: SEAT_SIZE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    position: 'absolute',
  },
  seatContent: {
    fontSize: 8,
  },
  seatUser: {
    backgroundColor: 'red',
    zIndex: 999,
  },
});
