import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { normalize } from '../utilis/Theme';
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [signedUser, setSignedUser] = useState();

    const getSignedUserData = async () => {
        const signedUserData = await AsyncStorage.getItem("SignedUserData");
        setSignedUser(JSON.parse(signedUserData));
    };

    useEffect(() => {
        getSignedUserData();
    }, []);

    const signOutWithGoogle = async () => {
        auth().signOut();
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.profileTextStyle}>Profile</Text>
            <View style={styles.textContainer}>
                <Text style={styles.headerTitleTextStyle}>Your profile is empty</Text>
                <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(18) }]}>
                    Start watching your favourites movies button below.</Text>
            </View>
            <Pressable onPress={() => signOutWithGoogle()}
                style={styles.buttonContainer}>
                <Text style={styles.signOutTextStyle}>Sign Out</Text>
            </Pressable>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#000000"
    },
    profileTextStyle: {
        marginLeft: 15,
        fontSize: 34,
        fontWeight: "bold",
        color: "#ffffff"
    },
    textContainer: {
        marginTop: normalize(120),
        marginLeft: normalize(15),
    },
    headerTitleTextStyle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#d6d6d8"
    },
    headerSubTitleTextStyle: {
        width: 360,
        fontSize: 27,
        fontWeight: "500",
        color: "#808b9d"
    },
    buttonContainer: {
        padding: 13,
        marginHorizontal: 15,
        marginTop: "auto",
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e50913",
        borderRadius: 5
    },
    signOutTextStyle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#ffffff"
    }
});