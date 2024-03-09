import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { normalize } from "../utilis/Theme";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    GoogleSignin.configure({
        webClientId: "590766462640-cmq8qv8op2lpi5l49l1knharjl1152j7.apps.googleusercontent.com"
    });

    function onAuthStateChanged(user) {
        setUser(user);
        AsyncStorage.setItem("SignedUserData", JSON.stringify({
            user,
            loggedIn: true
        }));
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        if (user) {
            navigation.navigate("BottomTab");
        }
    }, [user]);

    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const signedInUser = auth().signInWithCredential(googleCredential);
        signedInUser.then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
        if (user) {
            navigation.navigate("BottomTab");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ImageBackground source={require('../../assets/images/login-banner.jpg')}
                resizeMode="cover"
                style={styles.imageStyle}>
                <View style={styles.overViewStyle}>
                    <Image source={require('../../assets/images/icon.png')}
                        style={styles.iconImageStyle} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>
                            WATCH TV SHOWS & MOVIES ANYWHERE. ANYTIME.</Text>
                    </View>
                    <Text style={styles.planTextStyle}>Plans starts from Rs 200 a month.</Text>
                    <TouchableOpacity onPress={() => signInWithGoogle()}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    imageStyle: {
        flex: 1,
        height: '100%',
        resizeMode: 'contain',
    },
    overViewStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    iconImageStyle: {
        marginTop: '20%',
        marginLeft: 10,
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        position: 'absolute',
        marginTop: '55%',
        marginLeft: 15,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        lineHeight: 55,
    },
    planTextStyle: {
        marginTop: '75%',
        marginLeft: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        lineHeight: 25,
    },
    buttonContainer: {
        padding: normalize(13),
        marginHorizontal: normalize(15),
        marginTop: 'auto',
        marginBottom: normalize(40),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e50913",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 17,
        fontWeight: "bold",
        color: '#ffffff',
    },
});