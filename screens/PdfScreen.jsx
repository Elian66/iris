import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PdfScreen({ route }) {
  const { pdf } = route.params;
  console.log(`path: ${pdf}`);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdf }}
        style={styles.webview}
        onLoadStart={() => console.log('WebView started loading')}
        onLoadEnd={() => console.log('WebView finished loading')}
        onError={(error) => console.error('WebView error:', error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
