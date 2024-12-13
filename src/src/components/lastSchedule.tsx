import { Dimensions, TouchableOpacity ,StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import imgLupa from '../assets/lupa.png'
import imgQuadra from '../../assets/basquete.jpeg'
import { useNavigation } from '@react-navigation/native'

type Props = {
  date: string;
  time: string;
  status: string;
  image: string;
}

const {width} = Dimensions.get('window');

const LastSchedule = ({date, time, status, image}:Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <View style={styles.card}>
        <View style={styles.imgSchedule}>
          <Image source={{uri:image}} style={styles.imgQuadra} resizeMode="cover"/>
        </View>

        <View style={styles.contentInfo}>
          <Text style={styles.data}> {date}</Text>
          <Text style={styles.hora}> {time}</Text>
          <Text style={styles.status}> {status} </Text>
        </View>
        
        <TouchableOpacity style={styles.contentImage} onPress={() => navigation.navigate('Reservas')}>
          <Image source={imgLupa} style={styles.image} resizeMode="center"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LastSchedule

const styles = StyleSheet.create({
  content:{
    display: 'flex',
    padding: 10,
    width: width,
    height: width / 2.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },

  imgSchedule:{
    flex:4,
    height: '80%',
    alignItems:'center',
    justifyContent: 'center',
  },

  imgQuadra:{
    width:'90%',
    height: '90%',
    borderRadius: 10,
  },

  contentInfo:{
    flex:3,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  data:{
    color:'#000000',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1.2,
    padding: 5,
    backgroundColor: '#E7E7E7',
    borderRadius: 5,
    textAlign: 'center'
  },
  hora:{
    color:'#ffffff',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: '#434343',
    letterSpacing: 1.2,
    borderRadius: 50,
    textAlign: 'center',
    padding: 5,
  },
  status:{
    color:'#000000',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1.2,
    backgroundColor: '#E7E7E7',
    borderRadius: 5,
    textAlign: 'center',
    padding: 5,
  },
  contentImage:{
    flex:1.5,
    backgroundColor: '#004BEC',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:15
  },
  image:{
    alignItems:'center',
    justifyContent:'center',
    height: '100%',
    width: 50,
  }

})