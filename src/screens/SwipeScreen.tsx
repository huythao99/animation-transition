import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import SwipeComponent from '../components/SwipeComponent';

const Data = new Array(10)
  .fill(0)
  .map((_, index) => ({id: index, value: index}));

export default function SwipeScreen() {
  const [array, setArray] = React.useState([...Data]);

  const onDelete = (id: number) => {
    const newArray = [...array];
    const index = newArray.findIndex(item => item.id === id);
    if (index !== -1) {
      newArray.splice(index, 1);
      setArray(newArray);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {array.map(item => {
        return (
          <SwipeComponent
            onDelete={onDelete}
            key={item.id}
            value={item.value}
            id={item.id}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
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
