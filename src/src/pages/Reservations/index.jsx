import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { searchReservations } from '../../services/authService';
import { useUser } from '../../contexts/UserContext';


const getStatusStyle = (status) => {
  switch (status) {
    case 'Agendado':
      return { backgroundColor: '#0000FF' }; // Azul
    case 'Cancelado':
      return { backgroundColor: '#FF0000' }; // Vermelho
    case 'Concluído':
      return { backgroundColor: '#008000' }; // Verde
    default:
      return { backgroundColor: '#333' }; // Cor padrão
  }
};

const Reservations = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const [reservations, setReservations] = useState([]);
  const { id } = useUser()

  useEffect(() => {
    searchReservations().then((data) => {
      if (data) {
        const arrayReservations = data.filter((reservation) => reservation.idUser === id);
        arrayReservations.reverse()
        setReservations(arrayReservations)
      }
    });
  }, [isFocused])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.date, getStatusStyle(item.status)]}>{item.date}</Text>
        <TouchableOpacity style={[styles.button, getStatusStyle(item.status)]}>
          <Text style={styles.buttonText}>{item.time}</Text>
        </TouchableOpacity >
        <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginTop: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0000FF',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  status: {
    fontSize: 20,
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    color: '#fff',
  },
});

export default Reservations;