import { FlatList, Image, Text, StyleSheet, View, ViewToken, Dimensions } from "react-native";
import {Button} from "../components/index";
import React, { useRef, useState } from "react";
import {ImageSliderType, ImageSlider} from "../data/SliderData"
import imgLupa from '../assets/lupa.png'
import Animated, {useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

type Props = {
    itemList: ImageSliderType[];
};

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

const {width} = Dimensions.get('window');


const Slider = ({ itemList }) => {
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate('Search');
      };

    return (
        
        <View style={styles.page}>
            <FlatList
                style={styles.flatList}
                data={itemList}
                pagingEnabled
                snapToAlignment={"start"}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                    <View style={styles.slid}>
                        <Image source={{uri:item.image}} style={styles.image} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.background}
                        >
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.cityState}>{item.cityState}</Text>
                            </View>
                        </LinearGradient>
                    </View>
                )}
            />
            <View style={styles.contentButton}>
                <Button radius={"50px"} style={styles.button} onPress={handleNavigate}>
                    <Text style={styles.btnText}>
                        Buscar Quadras
                    </Text>
                    <Image source={imgLupa} style={styles.lupa} resizeMode="center"/>
                </Button>
            </View>
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    flatList: {
        flexGrow: 0,
    },
    slid: {
        alignItems: 'center',
        width: width * 0.85,
        height: width / 1.2,
        marginHorizontal: 10,
    },
    image: {
        width: width * 0.85,
        height: width / 1.2,
        borderRadius: 20,
        marginHorizontal: 10
    },
    background: {
        justifyContent: 'flex-end',
        position: 'absolute',
        height: width / 1.2,
        width: width * 0.85,
        padding: 20,
        borderRadius: 20,
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1.5,
    },
    category: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '200',
        letterSpacing: 1.2,
    },
    cityState: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '200',
        letterSpacing: 1.2,
    },
    contentButton: {
        padding: 16,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#004BEC'
    },
    btnText:{
        fontSize: 20,
    },
    lupa:{
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
        width: 60,
    }
});