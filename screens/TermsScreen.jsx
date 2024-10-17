import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Checkbox, Image} from 'react-native-magnus';

const TermsScreen = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);

  const redirectToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/contract.png')}
            h={200}
            w={200}
          />
        </View>
        <Text style={styles.title}>Termos de Serviço</Text>
        <Text style={styles.description}>
          Antes de iniciar a avaliação, leia os Termos de Serviço e lembre-se
          que:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Esta avaliação não é um diagnóstico.
          </Text>
          <Text style={styles.listItem}>
            • É apenas para sua informação e não uma opinião médica qualificada.
          </Text>
          <Text style={styles.listItem}>
            • Esta avaliação não é para emergências. Ligue para o seu número de
            emergência local imediatamente quando houver uma emergência de
            saúde.
          </Text>
          <Text style={styles.listItem}>
            • Seus dados estão seguros. As informações que você fornecer não
            serão compartilhadas ou usadas para identificá-lo.
          </Text>
        </View>
        <Checkbox
          mt={10}
          mb={10}
          onChange={value => setAccepted(!accepted)}
          suffix={<Text>Eu li e aceito os Termos de Serviço.</Text>}
        />
        <Button block disabled={!accepted} onPress={redirectToHome}>
          Eu concordo com minhas informações
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1, // Permite que o ScrollView cresça
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default TermsScreen;
