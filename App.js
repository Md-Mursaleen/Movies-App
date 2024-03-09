import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigation from "./src/navigation/RootNavigation";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000000");
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <RootNavigation />
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  }
});
