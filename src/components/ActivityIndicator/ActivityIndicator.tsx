import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export enum IndicatorSize {
  SMALL = 'small',
  LARGE = 'large',
}

type ActivityLoaderProps = {
  size: IndicatorSize;
};

export const ActivityLoader = ({size}: ActivityLoaderProps) => {
  const styles = useStyles();
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={'#666'} />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
