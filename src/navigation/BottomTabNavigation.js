import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const [signedUser, setSignedUser] = useState();

    const getSignedUserData = async () => {
        const signedUserData = await AsyncStorage.getItem("SignedUserData");
        setSignedUser(JSON.parse(signedUserData));
    };

    useEffect(() => {
        getSignedUserData();
    }, []);

    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#cdcdcd"
        }}>
            <BottomTab.Screen name="Movies" component={HomeScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => focused ? <MaterialIcons name="movie" size={28} color={color} /> :
                    <MaterialCommunityIcons name="movie-outline" size={28} color={color} />
            }} />
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => focused ? signedUser?.loggedIn === true &&
                    <Image source={{ uri: signedUser?.user?.photoURL }} style={styles.profileImageStyle} /> :
                    signedUser?.loggedIn === true && <Image source={{ uri: signedUser?.user?.photoURL }}
                        style={styles.profileImageStyle} />
            }} />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 55,
        backgroundColor: "#000000",
        borderTopWidth: 0,
    },
    tabBarLabelStyle: {
        paddingBottom: 5,
        fontSize: 11.5,
        fontWeight: "600",
    },
    profileImageStyle: {
        width: 30,
        height: 30,
        borderWidth: 2.5,
        borderColor: "#ffffff",
        borderRadius: 50,
    },
});