import React from 'react';
import { View, StyleSheet } from 'react-native';
import PoseDetection from './PoseDetection';

export default function App() {
  return (
    <View style={styles.container}>
      <PoseDetection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
