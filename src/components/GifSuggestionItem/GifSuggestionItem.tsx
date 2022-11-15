import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

// Added only necessary types from the object as of now.
export interface GifSuggestionOption {
  id: string;
  images: {
    downsized: {
      url: string;
    };
    preview_gif: {
      url: string;
    };
  };
}

interface LocationSuggestionItemProps {
  gifSuggestion: GifSuggestionOption;
}

export const GifSuggestionItem = (props: LocationSuggestionItemProps) => {
  const {gifSuggestion} = props;
  const styles = useStyles();
  return (
    <View style={styles.gifSuggestionItemContainer}>
      <Image
        source={{uri: gifSuggestion.images.preview_gif.url}}
        style={styles.gifImage}
        defaultSource={require('../../assets/loading.gif')}
      />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    gifSuggestionItemContainer: {
      flex: 1 / 2,
      margin: 5,
      backgroundColor: '#ddd',
      height: 130,
    },
    gifImage: {
      width: '100%',
      height: 130,
    },
  });
};
