import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {GifSearch} from '../../components';

const HomePage = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GifSearch />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomePage;
