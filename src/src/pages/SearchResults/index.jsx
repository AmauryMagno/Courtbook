import { useEffect, useState } from "react";
import { Text, Box } from "../../components/index";
import { View, Image, FlatList, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { searchCourts } from "../../services/authService";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SearchResults = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { data } = route.params;
    const [filteredCourts, setFilteredCourts] = useState([]);

    useEffect(() => {
        searchCourts().then((res) => {
            setFilteredCourts(res.filter((court) => court.category === data.category));
        });
    }, []);

    const render = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("BookingScreen", { court: item })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.additionalInfo}>{item.address}</Text>
                <Text style={styles.additionalInfo}>{item.neighborhood}</Text>
                <Text style={styles.additionalInfo}>{item.cityState}</Text>
                <Text style={styles.price}>Valor/Hora: {item.price}</Text>
                <TouchableOpacity
                    style={styles.reservarButtom}
                    onPress={() => navigation.navigate("BookingScreen", { court: item })}
                >
                    <Text style={styles.reservarButtomText}>Reservar</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle={"dark-content"} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Quadras encontradas</Text>
                <FlatList
                    data={filteredCourts}
                    renderItem={render}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f2f2',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        alignSelf: "flex-start",
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 18,
        color: "black",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#0000FF",
        textAlign: "center",
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 16,
        width: "100%",
        alignItems: "center"
    },
    card: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        marginBottom: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        width: "100%",
        alignSelf: "center",
        padding: 16
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        aspectRatio: 4 / 3,
        borderRadius: 8,
        backgroundColor: "#ddd"
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: "flex-start",
        marginLeft: 5
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
        textAlign: "center",
        width: "100%"
    },
    additionalInfo: {
        fontSize: 17,
        color: "#888",
        textAlign: "left",
        width: "100%"
    },
    price: {
        fontSize: 14,
        color: "#555",
        marginTop: 8,
        fontWeight: "700",
        textAlign: "left",
        alignSelf: "flex-start",
    },
    reservarButtom: {
        backgroundColor: '#228be6',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        width: "80%",
        alignSelf: "center"
    },
    reservarButtomText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default SearchResults;
