import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'; // Supondo que você esteja usando o pacote 'react-native-elements'

const BottomMenu = () => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handlePlanosPress = () => {
    navigation.navigate('Planos');
  };

  const handleMenuPress = () => {
    // Lógica para abrir o menu lateral
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleHomePress}>
        <Icon name="home" type="font-awesome" color="#3C83B9" size={24} />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePlanosPress}>
        <Icon name="list" type="font-awesome" color="#3C83B9" size={24} />
        <Text style={styles.iconText}>Planos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleMenuPress}>
        <Icon name="menu" type="font-awesome" color="#3C83B9" size={24} />
        <Text style={styles.iconText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingBottom: 8,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#3C83B9',
  },
});

export default BottomMenu;
