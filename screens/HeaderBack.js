import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from './theme';
import { Icon } from 'react-native-magnus';

const HeaderBack = ({ navigation, children }) => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Icon name="chevron-left" fontFamily="MaterialIcons" fontSize={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{children}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
      fontSize: 26,
      color: theme.colors.secondary,
      fontWeight: 'bold',
      paddingVertical: 14,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    iconContainer: {
      marginRight: 8,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    }
  });
  
  export default HeaderBack;