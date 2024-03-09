import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { normalize } from '../utilis/Theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const MovieDetailsScreen = ({ route }) => {
    const { title, release_date, poster_path, overview,
        backdrop_path, vote_count } = route.params.movieData;
    const [isVideoVisible, setisVideoVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor={'#080508'} />
                <ScrollView style={{ flex: 1 }}>
                    {isVideoVisible ? (
                        <Video setControls
                            controls
                            repeat={false}
                            resizeMode="cover"
                            style={{ height: responsiveHeight(35) }}
                            source={{
                                uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                            }}
                            onFullscreenPlayerWillPresent={() => {
                                Orientation.lockToLandscape();
                            }}
                            onFullscreenPlayerWillDismiss={() => {
                                Orientation.lockToPortrait();
                            }} />
                    ) : (
                        <Image source={{
                            uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
                        }}
                            style={{ height: responsiveHeight(35) }} />
                    )}
                    {/* Second Container */}
                    <View style={styles.subContainer}>
                        {/* First Box */}
                        <View style={styles.contentContainer}>
                            <Fontisto name="netflix" size={22} color="red" />
                            <Text style={styles.videoTypeTextStyle}>
                                SERIES
                            </Text>
                        </View>
                        {/* First Box */}
                        {/* Second Box */}
                        <Text style={styles.videoTitleTextStyle}>
                            {title}
                        </Text>
                        {/* Second Box */}
                        {/* Third Box */}
                        <View style={styles.contentContainer}>
                            <Text style={styles.videoDateStyle}>
                                {release_date.split('-')[0]}
                            </Text>
                            <View style={styles.viewStyle}></View>
                            <View style={[styles.contentContainer, { gap: 5 }]}>
                                <MaterialIcons name="favorite" size={20} color="red" />
                                <Text style={styles.videoCountTextStyle}>
                                    {vote_count}%
                                </Text>
                                <MaterialIcons name="hd" size={25} color="#ffffff" />
                            </View>
                        </View>
                        {/* Third Box */}
                    </View>
                    <View style={[styles.subContainer, { marginTop: 5 }]}>
                        <TouchableOpacity onPress={() => {
                            setisVideoVisible(false);
                        }}
                            activeOpacity={0.8}
                            style={styles.playButtonContainer}>
                            <Entypo name="controller-play" size={22} color="#000000" />
                            <Text style={[styles.textStyle,
                            {
                                fontSize: responsiveFontSize(2),
                                fontWeight: '700',
                                color: '#000000',
                            },
                            ]}>
                                Play
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            console.log('Clicked Play Button');
                        }}
                            activeOpacity={0.8}
                            style={[styles.playButtonContainer, { backgroundColor: '#2b292b' }]}>
                            <Octicons name="download"
                                size={22}
                                color="#ffffff"
                                style={{ marginRight: 5 }} />
                            <Text style={[styles.textStyle,
                            {
                                fontSize: responsiveFontSize(2),
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                            ]}>
                                Download
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.videoOverviewTextStyle}>
                            {overview}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#080508',
    },
    subContainer: {
        padding: 10,
        gap: 10,
    },
    textStyle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '500',
        color: '#ffffff',
    },
    playButtonContainer: {
        height: responsiveHeight(5.3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        gap: 5,
    },
    videoOverviewTextStyle: {
        marginVertical: normalize(10),
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'justify',
        lineHeight: 25,
    },
    videoTitleTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    viewStyle: {
        width: 2.5,
        height: 20,
        backgroundColor: '#ffffff',
    },
    videoCountTextStyle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 15,
    },
    videoTypeTextStyle: {
        fontSize: 15,
        color: '#ffffff',
        letterSpacing: 5,
    },
    videoDateStyle: {
        fontSize: 16,
        color: '#ffffff',
    },
});
