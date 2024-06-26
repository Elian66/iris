import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { handleIntegrationMPPix, handleIntegrationMP } from './../MPIntegration';

const MethodPayment = ({ route, navigation }) => {
  const { plan } = route.params;
  const handlePress = async (method) => {
    if (method == 'Pix') {
      const response = await handleIntegrationMPPix(plan);
      if (!response.url) {
        return console.log("Ocorreu um erro ao integrar com o Mercado Pago");
      }
      navigation.navigate('Payment', { url: response.url , planName: plan, id: response.id, type: method });
    } else if (method == 'Cartão') {
      const url = await handleIntegrationMP(plan);
      if (!url) {
        return console.log("Ocorreu um erro ao integrar com o Mercado Pago");
      }
      navigation.navigate('Payment', { url: response.url, planName: plan, id: response.id, type: method });
    }
  };

  const redirectToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mainview}>
      <Text onPress={redirectToHome} style={styles.close}>x</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Escolha um Método de pagamento</Text>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Pix')}>
          <View style={styles.planContent}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Pix</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Cartão')}>
          <View style={styles.planContent}>
            <View style={styles.textContent}>
              <Text style={styles.price}>Cartão de Crédito</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    paddingVertical: 16,
    paddingStart: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  close: {
    fontSize: 32,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    backgroundColor: '#3C83B9',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: 64,
    height: 120,
    marginRight: 10,
    borderRadius: 24,
  },
});

export default MethodPayment