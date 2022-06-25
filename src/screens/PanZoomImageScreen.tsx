import * as React from 'react';
import {Image, ScrollView} from 'react-native';

import PanZoomImageComponent from '../components/PanZoomImageComponent';

interface ImageProps {
  uri: string;
  width: number;
  height: number;
  id: number;
}

const IMGS = [
  'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2524164/pexels-photo-2524164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/1835008/pexels-photo-1835008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
];

export default function PanZoomImageScreen() {
  const [images, setImages] = React.useState<ImageProps[]>([]);

  const getImageSize = () => {
    const newImages: ImageProps[] = [];
    IMGS.forEach((image, index) => {
      Image.getSize(image, (width: number, height: number) => {
        newImages.push({
          uri: image,
          width,
          height,
          id: index,
        });
        if (index === IMGS.length - 1) {
          setImages(newImages.sort((a, b) => a.id - b.id));
        }
      });
    });
  };

  React.useEffect(() => {
    getImageSize();
  }, []);

  return (
    <ScrollView horizontal={true} pagingEnabled={true}>
      {images.map((item, index) => {
        return (
          <PanZoomImageComponent
            uri={item.uri}
            width={item.width}
            height={item.height}
            key={index.toString()}
          />
        );
      })}
    </ScrollView>
  );
}
