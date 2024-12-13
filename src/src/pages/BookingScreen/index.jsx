import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../../contexts/UserContext';
import { createReservation } from '../../services/authService';

const { height: windowHeight } = Dimensions.get('window');

const timeSlots = ['17:00', '18:00', '19:00', '20:00'];
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const years = ['2024', '2025'];

const getDaysInMonth = (month, year) => {
  const monthIndex = months.indexOf(month);
  return new Date(parseInt(year), monthIndex + 1, 0).getDate();
};

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { court } = route.params;
  const { id: userId } = useUser();

  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const [selectedDay, setSelectedDay] = useState('01');
  const [selectedMonth, setSelectedMonth] = useState('Dez');
  const [selectedYear, setSelectedYear] = useState('2024');

  const availableDays = Array.from(
    { length: getDaysInMonth(selectedMonth, selectedYear) },
    (_, i) => String(i + 1).padStart(2, '0')
  );

  React.useEffect(() => {
    const maxDays = getDaysInMonth(selectedMonth, selectedYear);
    if (parseInt(selectedDay) > maxDays) {
      setSelectedDay(String(maxDays).padStart(2, '0'));
    }
  }, [selectedMonth, selectedYear]);

  const renderPicker = (items, selectedValue, onSelect, onClose) => {
    const actualItems = items === days ? availableDays : items;
    return (
      <View style={styles.pickerModal}>
        <ScrollView style={styles.pickerScroll}>
          {actualItems.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.pickerItem,
                selectedValue === item && styles.selectedPickerItem
              ]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={[
                styles.pickerItemText,
                selectedValue === item && styles.selectedPickerItemText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const handleReservation = async () => {
    if (!userId) {
      Alert.alert('Erro', 'Você precisa estar logado para fazer uma reserva.');
      return;
    }

    const reservationData = {
      id: Date.now(),
      image: court.image,
      date: `${selectedDay} ${selectedMonth} ${selectedYear}`,
      time: selectedTime,
      status: "Agendado",
      idCourt: court.id,
      idUser: userId,
      price: court.price
    };

    try {
      const response = await createReservation(reservationData);

      if (response) {
        Alert.alert(
          'Sucesso',
          'Reserva realizada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Reservas')
            }
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível realizar a reserva. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar a reserva. Tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: court.image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Data:</Text>
        <View style={styles.datePickerRow}>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowDayPicker(!showDayPicker)}
            >
              <Text>{selectedDay}</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
            {showDayPicker && renderPicker(
              days,
              selectedDay,
              setSelectedDay,
              () => setShowDayPicker(false)
            )}
          </View>

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowMonthPicker(!showMonthPicker)}
            >
              <Text>{selectedMonth}</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
            {showMonthPicker && renderPicker(
              months,
              selectedMonth,
              setSelectedMonth,
              () => setShowMonthPicker(false)
            )}
          </View>

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowYearPicker(!showYearPicker)}
            >
              <Text>{selectedYear}</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
            {showYearPicker && renderPicker(
              years,
              selectedYear,
              setSelectedYear,
              () => setShowYearPicker(false)
            )}
          </View>
        </View>

        <View style={styles.courtInfo}>
          <View style={styles.courtHeader}>
            <Text style={styles.courtName}>{court.name}</Text>
            <Text style={styles.price}>{court.price}</Text>
          </View>
          <Text style={styles.categoryText}>Categoria: {court.category}</Text>
          <Text style={styles.address}>{court.address}</Text>
          <Text style={styles.address}>{court.neighborhood}</Text>
          <Text style={styles.address}>{court.cityState}</Text>
        </View>

        <View style={styles.timeSlots}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTimeSlot,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.reserveButtonContainer}>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={handleReservation}
        >
          <Text style={styles.reserveButtonText}>RESERVAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 44,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  imageSlider: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    left: 24,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 24,
    padding: 12,
    transform: [{ translateY: -24 }],
  },
  rightArrow: {
    left: undefined,
    right: 24,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dee2e6',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#228be6',
    width: 24,
  },
  content: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  datePickerRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  pickerContainer: {
    flex: 1,
    position: 'relative',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerModal: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 8,
    maxHeight: 250,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  pickerScroll: {
    maxHeight: 250,
  },
  pickerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  selectedPickerItem: {
    backgroundColor: '#e7f5ff',
  },
  pickerItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#495057',
  },
  selectedPickerItemText: {
    color: '#228be6',
    fontWeight: '600',
  },
  courtInfo: {
    marginBottom: 32,
  },
  courtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courtName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#228be6',
  },
  address: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 6,
    lineHeight: 22,
  },
  timeSlots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedTimeSlot: {
    backgroundColor: '#228be6',
    borderColor: '#1971c2',
  },
  timeText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: '600',
  },
  reserveButtonContainer: {
    paddingHorizontal: 16,
    marginTop: windowHeight * 0.03,
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: '#228be6',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BookingScreen;