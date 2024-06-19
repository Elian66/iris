import React, { useRef } from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Div, Icon } from 'react-native-magnus';

const articles = [
  {
    id: '1',
    title: 'Entendendo a íris do olho',
    image: require('../assets/images/article1.jpg'),
    pdf: 'https://drive.google.com/file/d/1iJoTTAiS3lzQCUVAXKY9GAUKQ4JwR0aC/view?usp=drive_link',
  },
  {
    id: '2',
    title: 'Como surgiu a iridologia',
    image: require('../assets/images/article2.jpg'),
    pdf: 'https://drive.google.com/file/d/1SoUJRfs9TshjE-Df6jVKI5LWIT6-xBpo/view?usp=drive_link',
  },
  {
    id: '3',
    title: 'A iridologia clínica',
    image: require('../assets/images/article3.jpg'),
    pdf: 'https://drive.google.com/file/d/1i7U8UcoBmEJGJeD92yc9XZ4FUipQjpCB/view?usp=drive_link',
  },
  {
    id: '4',
    title: 'A iridologia comportamental',
    image: require('../assets/images/article4.jpg'),
    pdf: 'https://drive.google.com/file/d/1Tt0Ei3z9nhcjfL4NhRp9w2iQrizv9_Kp/view?usp=drive_link',
  }
];

export default function ArtigosScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Pdf', { pdf: item.pdf })} style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );

  return (
    <Div flex={1} style={styles.container}>
      <Text style={styles.header}>Artigos</Text>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navigationItem}>
          <Icon name='home' fontFamily="FontAwesome" fontSize='xl' color='gray800' />
          <Text>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Artigos')} style={styles.navigationItem}>
          <Icon name='book' fontFamily="FontAwesome" fontSize='xl' color='gray800' />
          <Text>Artigos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Resultados')} style={styles.navigationItem}>
          <Icon name='list' fontFamily="FontAwesome" fontSize='xl' color='gray800' />
          <Text>Resultados</Text>
        </TouchableOpacity>
      </View>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 15,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    flexShrink: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navigationItem: {
    alignItems: 'center',
  },
});
