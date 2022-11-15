import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const NoSearchResult = () => {
  return (
    <View
      style={[styles.listContainer, styles.emptySearchState]}
      testID={'empty-suggestion'}
      accessibilityLabel={'empty-suggestion'}>
      <Text>Hello from no search results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    top: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  emptySearchState: {
    padding: 24,
    paddingBottom: 54,
  },
  title: {
    marginBottom: 16,
  },
  bulletText: {
    lineHeight: 24,
  },
});
