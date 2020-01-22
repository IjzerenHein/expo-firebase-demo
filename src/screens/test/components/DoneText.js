import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DoneText({ done, numFailed, results }) {
  return (
    <View testID="test_suite_results" style={styles.container}>
      {!done && (
        <Text testID="test_suite_loading_results" style={styles.doneMessage}>
          Running Tests...
        </Text>
      )}
      {done && (
        <React.Fragment>
          <Text testID="test_suite_text_results" style={styles.doneMessage}>
            Complete: {numFailed}
            {numFailed === 1 ? ' test' : ' tests'} failed.
          </Text>
          <Text style={styles.finalResults} pointerEvents="none" testID="test_suite_final_results">
            {results}
          </Text>
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  finalResults: {
    // Hide text for Detox to read
    position: 'absolute',
    opacity: 0,
  },
  doneMessage: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
