import React from 'react';
import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';

const Details = ({route: { params }}) => {
  return (
    <WebView
      style={styles.container}
      source={{ uri: `https://www.reddit.com/${params.url}` }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default Details;