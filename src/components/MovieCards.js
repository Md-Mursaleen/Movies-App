import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const MovieCards = ({ title, data }) => {
    const navigation = useNavigation();

    const handleOnClick = (movieData) => {
        navigation.navigate('MovieDetails', { movieData })
    };

    const renderMovieCard = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => handleOnClick(item)} >
                <Image source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                    resizeMode="center"
                    style={styles.movieImageStyle} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleTextStyle}>
                {title}
            </Text>
            <FlatList horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderMovieCard}
                ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>} />
        </View>
    );
};

export default MovieCards;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: responsiveHeight(40),
        gap: 15,
    },
    movieTitleTextStyle: {
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1,
    },
    movieImageStyle: {
        width: responsiveWidth(50),
        height: '100%',
        borderRadius: 10,
    },
});
