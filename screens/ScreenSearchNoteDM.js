import * as React from "react";
import { useState, useContext } from "react";
import { TextInput, StyleSheet, Pressable, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import themeContext from "../ThemeContext";
import theme from "../Theme";

const ScreenSearchNoteDM = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  return (
    <View
      style={[styles.screenSearchNoteDM, { backgroundColor: theme.background }]}
    >
      <TextInput
        style={[styles.searchTextInput, { color: theme.color }]}
        placeholder="Search note"
        keyboardType="default"
      />
      <Pressable
        style={styles.crossSmall3Pressable}
        onPress={() => navigation.navigate("HomeScreenEmptyDM")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/crosssmall-3.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchTextInput: {
    position: "absolute",
    top: 47,
    left: 50,
    width: 310,
    height: 36,
    color: "white",
    backgroundColor: "gray",
    //fontFamily: "Nunito",
    fontSize: 22,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  crossSmall3Pressable: {
    position: "absolute",
    left: 365,
    top: 56,
    width: 29,
    height: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenSearchNoteDM: {
    position: "relative",
    //borderRadius: 30,
    backgroundColor: "#1e1e1e",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScreenSearchNoteDM;
