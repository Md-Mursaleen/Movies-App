import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
} from '../services/Requests';
import HomeBanner from '../components/HomeBanner';
import MovieCards from '../components/MovieCards';

const HomeScreen = () => {
    const [nowPlayingMoviesData, setnowPlayingMoviesData] = useState([]);
    const [popularMoviesData, setpopularMoviesData] = useState([]);
    const [top_ratedMoviesData, settop_ratedMoviesData] = useState([]);

    useEffect(() => {
        const handleApi = async () => {
            const { data, status } = await getNowPlayingMovies();
            if (status === 200) {
                setnowPlayingMoviesData(data.results);
            } else {
                Alert.alert(`Request failed with ${data}`);
            }
        };
        handleApi();
    }, []);

    useEffect(() => {
        const handleApi = async () => {
            const { data, status } = await getPopularMovies();
            if (status === 200) {
                setpopularMoviesData(data.results);
            } else {
                Alert.alert(`Request failed with ${data}`);
            }
        };
        handleApi();
    }, []);

    useEffect(() => {
        const handleApi = async () => {
            const { data, status } = await getTopRatedMovies();
            if (status === 200) {
                settop_ratedMoviesData(data.results);
            } else {
                Alert.alert(`Request failed with ${data}`);
            }
        };
        handleApi();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'default'}
                translucent
                backgroundColor={'transparent'} />
            <ScrollView style={{ flex: 1 }}>
                <HomeBanner />
                <View style={styles.subContainer}>
                    <MovieCards title="Now Playing" data={nowPlayingMoviesData} />
                    <MovieCards title="Popular Movies" data={popularMoviesData} />
                    <MovieCards title="Top Rated Movies" data={top_ratedMoviesData} />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    subContainer: {
        paddingHorizontal: 15,
        marginTop: 20,
        gap: 10,
    },
});
