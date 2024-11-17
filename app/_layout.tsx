import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import 'expo-dev-client';

const RootLayout = () => {
  return (
    <>
      {/* Set the status bar style */}
      <StatusBar style="light" />

      {/* Render the child routes */}
      <Slot />
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

