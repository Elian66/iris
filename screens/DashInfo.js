import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from './theme';

const DashInfo = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 8,
  },
});

export default memo(DashInfo);
