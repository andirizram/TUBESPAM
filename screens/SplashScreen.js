import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.splashScreenView}>
      <Image
        style={styles.iconRemovebgPreview1}
        resizeMode="cover"
        source={require("../assets/iconremovebgpreview-11.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconRemovebgPreview1: {
    position: "absolute",
    top: 260,
    left: 70,
    width: 279,
    height: 256,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashScreenView: {
    position: "relative",
    //borderRadius: 30,
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
