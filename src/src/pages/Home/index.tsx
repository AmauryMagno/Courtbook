import { convertTypeAcquisitionFromJson } from "typescript";
import {
  Text,
  Box,
} from "../../components/index";
import { StatusBar, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import {useEffect, useState} from "react";
import Slider from "../../components/slider";
import LastSchedule from "../../components/lastSchedule";
import { searchReservations, searchCourts } from '../../services/authService';
import { useUser } from '../../contexts/UserContext';

const {width} = Dimensions.get('window');

interface Reservation {
  id: number;
  image: string;
  date: string; // ou use Date se já vier como objeto Date
  time: string;
  status: string;
  idCourt: number;
  idUser: number;
  price: string;
}

interface Courts{
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  address: string;
  neighborhood: string;
  cityState: string;
}


const Home = () => {
  const [reservations, setReservations] = useState<Reservation | null>(null);
  const [courts, setCourts] = useState<Courts | null>(null);
  const { id } = useUser()

  useEffect(() => {
    const fetchAndSortReservations = async () => {
      try {
        const data = await searchReservations();
        const court = await searchCourts();
        if (data) {
          const userReservations = data.filter(reservation => reservation.idUser === id);

          const parseDate = (dateString) => {
            const months = {
              Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
              Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11
            };
            const [day, month, year] = dateString.split(" ");
            return new Date(year, months[month], day);
          };
          
          const sortedReservations = userReservations.sort((a, b) => parseDate(b.date) - parseDate(a.date));
          console.log(sortedReservations)
          setReservations(sortedReservations[0] || null);
        } else {
          console.error('Nenhuma reserva encontrada.'); // Ou exibir uma mensagem para o usuário
        }

        if (court) {
          const lastFiveReservations = court.slice(0,5)
          console.log(`Ultimas Reservas: ${lastFiveReservations}`)
          setCourts(lastFiveReservations || null);
        } else {
          console.error('Nenhum court encontrado.'); // Ou exibir uma mensagem para o usuário
        }
      } catch (error) {
        console.error('Erro ao buscar reservas ou court', error);
      }
    };

    fetchAndSortReservations();
  }, []);

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Box style={styles.container}>
        <Text style={styles.text}>
          Minhas Reservas
        </Text>
        {reservations ? (
          <LastSchedule
            date={reservations.date}
            time={reservations.time}
            status={reservations.status}
            image={reservations.image}
          />
        ) : (
          <Text style={styles.text}>Nenhuma reserva encontrada</Text>
        )}
        <Text style={styles.text}>
          Quadras
        </Text>
        {courts ? (
          <Slider itemList={courts}/>
        ) : (
          <Text style={styles.text}>Nenhuma reserva encontrada</Text>
        )}
        
      </Box>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    paddingTop: 20,
    flex:1,
    justifyContent:'space-around',
    alignItems: 'flex-start',
    gap:20,
  },
  text:{
    marginLeft: 15,
    color:'#004BEC',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  contentButton:{
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#bd6a6a',
    width: width,
  },
  button:{
    flexDirection: 'row'
  },
  scrollContainer: {
    paddingBottom: 5
  }
})