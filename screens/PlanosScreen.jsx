import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const PlanosScreen = ({ navigation }) => {
  const handlePress = async (plan) => {
    const planoData = {
      'Plano 1': { name: 'Plano 1', price: 0.05 },
      'Plano 2': { name: 'Plano 2', price: 95.00 },
      'Plano 3': { name: 'Plano 3', price: 195.00 }
    };

    const selectedPlan = planoData[plan];

    if (selectedPlan) {
      console.log('Navigating to MethodPayment with:', selectedPlan);
      navigation.navigate('MethodPayment', { plan: selectedPlan });
    } else {
      console.log('Plan not found:', plan);
    }
  };

  const redirectToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mainview}>
      <Text onPress={redirectToHome} style={styles.close}>x</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Escolha um Plano</Text>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Plano 1')}>
          <View style={styles.planContent}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Plano 1</Text>
              <Text style={styles.description}>Exame clínico da Íris</Text>
              <Text style={styles.price}>R$ 29,90</Text>
            </View>
            <Image source={require('./../assets/images/plan1.jpg')} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Plano 2')}>
          <View style={styles.planContent}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Plano 2</Text>
              <Text style={styles.description}>Exame clínico da Íris + receita de fórmulas manipuladas para o tratamento</Text>
              <Text style={styles.price}>R$ 95,00</Text>
            </View>
            <Image source={require('./../assets/images/plan1.jpg')} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Plano 3')}>
          <View style={styles.planContent}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Plano 3</Text>
              <Text style={styles.description}>Exame clínico da Íris + Exame da Íris comportamental + Tratamento completo com envio dos produtos</Text>
              <Text style={styles.price}>R$ 195,00</Text>
            </View>
            <Image source={require('./../assets/images/plan3.jpg')} style={styles.image} />
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

export default PlanosScreen;