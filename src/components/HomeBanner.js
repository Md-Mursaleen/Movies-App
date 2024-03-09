import React, { useEffect, useState } from 'react';
import {
    Alert, FlatList, ImageBackground, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';
import { getUpcomingMovies } from '../services/Requests';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { normalize } from '../utilis/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

const HomeBanner = () => {
    const [upcomingMoviesData, setupcomingMoviesData] = useState([]);
    useEffect(() => {
        const handleUpComingApi = async () => {
            const { data, status } = await getUpcomingMovies();
            if (status === 200) {
                setupcomingMoviesData(data.results);
            } else {
                Alert.alert(`Request failed with ${data}`);
            }
        };
        handleUpComingApi();
    }, []);

    const renderMovieBanner = ({ item, index }) => {
        return (
            <ImageBackground source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            }}
                resizeMode="cover"
                style={styles.movieBannerContainer}>
                <LinearGradient colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,7)']}
                    style={styles.linearGradientContainer}>
                    <Text style={styles.textStyle}>My List</Text>
                    <TouchableOpacity onPress={() => {
                        console.log('Clicked Play Button');
                    }}
                        activeOpacity={0.8}
                        style={styles.playButtonContainer}>
                        <Entypo name="controller-play" size={35} color="#000000" />
                        <Text style={[styles.textStyle,
                        {
                            fontSize: responsiveFontSize(2.2),
                            fontWeight: '700',
                            color: '#000000',
                        },
                        ]}>
                            Play
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.textStyle}>Info</Text>
                </LinearGradient>
            </ImageBackground>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                data={upcomingMoviesData}
                renderItem={renderMovieBanner} />
        </View>
    );
};

export default HomeBanner;

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(70),
        width: '100%',
    },
    movieBannerContainer: {
        width: responsiveWidth(100),
        height: '100%',
        justifyContent: 'flex-end',
        opacity: 0.9,
    },
    linearGradientContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
    },
    textStyle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '500',
        color: '#ffffff',
    },
    playButtonContainer: {
        width: responsiveWidth(28),
        height: responsiveHeight(5.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: normalize(10),
        gap: normalize(5),
    },
});
