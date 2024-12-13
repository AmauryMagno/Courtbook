import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { searchCourts, updateReservation } from "../../services/authService";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [court, setCourt] = useState({});

  const handleStatusChange = () => {
    const updatedReservation = {
      ...item,
      status: "Cancelado"
    }
    updateReservation(updatedReservation, item.id).then(() => {
      navigation.navigate('Reservas')
    })
  };

  useEffect(() => {
    searchCourts().then((data) => {
      if (data) {
        setCourt(data.find((court) => court.id === item.idCourt));
      }
    });
  }, [])

  const getStatusStyles = () => {
    switch (item.status) {
      case "Concluído":
        return {
          backgroundColor: "#e6f7e6",
          borderColor: "#dcdcdc",
        };
      case "Cancelado":
        return {
          backgroundColor: "#fce8e8",
          borderColor: "#dcdcdc",
        };
      case "Agendado":
        return {
          backgroundColor: "#e6f7ff",
          borderColor: "#dcdcdc",
        };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Data:</Text>
          <View style={[styles.dateContainer, getStatusStyles()]}>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.column, styles.leftColumn]}>
              <Text style={[styles.value, styles.boldText]}>
                {court?.name}
              </Text>
              <Text style={styles.value}>{court?.address}</Text>
              <Text style={styles.value}>{court?.neighborhood}</Text>
              <Text style={styles.value}>{court?.cityState}</Text>
              <View style={[styles.timeContainer, getStatusStyles()]}>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <View style={[styles.column, styles.rightColumn]}>
              <Text style={[styles.value, styles.boldText]}>{court?.price}</Text>
            </View>
          </View>
          {item.status === "Agendado" ? (
            <TouchableOpacity
              style={[styles.statusContainer, styles.statusContainerActive]}
              onPress={handleStatusChange}
            >
              <Text style={[styles.status, styles.statusActiveText]}>
                CANCELAR
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.statusContainer,
                styles.statusContainerInactive,
                getStatusStyles(),
              ]}
            >
              <Text style={[styles.status, styles.statusInactive]}>
                {item.status}
              </Text>
            </View>
          )}
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 18,
    color: "black",
  },
  content: {
    marginTop: 80,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 380,
    height: 280,
    borderRadius: 8,
  },
  textContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  column: {
    flex: 1,
  },
  leftColumn: {
    alignItems: "flex-start",
  },
  rightColumn: {
    alignItems: "flex-end",
  },
  label: {
    fontSize: 20,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    marginBottom: 8,
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateContainer: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  date: {
    fontSize: 18,
  },
  timeContainer: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  time: {
    fontSize: 18,
  },
  statusContainer: {
    marginTop: 45,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
  },
  statusContainerActive: {
    backgroundColor: "#FF0000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainerInactive: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  status: {
    fontSize: 18,
    textAlign: "center",
  },
  statusActiveText: {
    color: "#fff",
  },
  statusInactive: {
    color: "#000",
  },
});

export default Details;