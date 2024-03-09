import React, { useEffect } from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent barStyle='light-content'
                backgroundColor='transparent' />
            <Image source={require('../../assets/images/logo.jpeg')}
                style={styles.imageStyle} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    imageStyle: {
        width: '70%',
        height: responsiveHeight(200),
        resizeMode: 'contain',
    },
});
