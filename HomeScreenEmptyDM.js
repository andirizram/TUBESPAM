import * as React from "react";
import { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Image,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../ThemeContext";
import theme from "../Theme";

const HomeScreenEmptyDM = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [mode, setMode] = useState(false);

  return (
    <View
      style={[styles.homeScreenEmptyDM, { backgroundColor: theme.background }]}
    >
      <Text style={styles.dayListText}>
        <Text style={styles.dayText}>Day</Text>
        <Text style={[styles.listText, { color: theme.color }]}>List</Text>
      </Text>
      <Switch
        style={styles.switchmode}
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          EventRegister.emit("ChangeTheme", value);
        }}
      />
      <TouchableOpacity
        style={styles.searchTouchableOpacity}
        activeOpacity={0.05}
        onPress={() => navigation.navigate("ScreenSearchNoteDM")}
      >
        <Image
          style={styles.search1Icon}
          resizeMode="cover"
          source={require("../assets/search-1.png")}
        />
        <View style={styles.rectangleView} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addTouchableOpacity}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("ScreenCreateNoteDMA")}
      >
        <Image
          style={styles.ellipseIcon}
          resizeMode="cover"
          source={require("../assets/ellipse-1.png")}
        />
        <Image
          style={styles.plusSmall2Icon}
          resizeMode="cover"
          source={require("../assets/plussmall-2.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.iconRemovebgPreview1}
        resizeMode="cover"
        source={require("../assets/iconremovebgpreview-1.png")}
      />
      <Text style={[styles.buatCatatanPertamamu, { color: theme.color }]}>
        Create your first DayList !
      </Text>
      <Pressable style={styles.searchPressable}>
        <View style={styles.rectangleView1} />
        <Image
          style={styles.sun1Icon}
          resizeMode="cover"
          source={require("../assets/sun-1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  switchmode: {
    position: "absolute",
    top: 47,
    left: 220,
    width: 40,
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontWeight: "500",
    //fontFamily: "Nunito",
    color: "#d8cc5e",
  },
  listText: {
    fontStyle: "italic",
    fontWeight: "500",
    //fontFamily: "Nunito",
    color: "#fff",
  },
  dayListText: {
    position: "absolute",
    top: 40,
    left: 20,
    fontSize: 36,
    textAlign: "left",
  },
  search1Icon: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 20,
    height: 20,
  },
  rectangleView: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    width: 40,
    height: 40,
  },
  searchTouchableOpacity: {
    position: "absolute",
    top: 47,
    left: 340,
    width: 40,
    height: 40,
  },
  ellipseIcon: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    backgroundColor: "#2b2a33",
    borderRadius: 30,
  },
  plusSmall2Icon: {
    position: "absolute",
    height: "90%",
    width: "90%",
    top: "4%",
    right: "6%",
    bottom: "6%",
    left: "4%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  addTouchableOpacity: {
    position: "absolute",
    top: 721,
    left: 340,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  iconRemovebgPreview1: {
    position: "absolute",
    top: 248,
    //left: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 287,
    height: 264,
  },
  buatCatatanPertamamu: {
    position: "absolute",
    top: 452,
    //left: 54,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "500",
    //fontFamily: "Nunito",
    textAlign: "left",
  },
  rectangleView1: {
    position: "absolute",
    top: 0,
    left: 30,
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    width: 40,
    height: 40,
  },
  sun1Icon: {
    position: "absolute",
    top: 8,
    left: 38,
    width: 23,
    height: 23,
  },
  searchPressable: {
    position: "absolute",
    top: 47,
    left: 240,
    width: 40,
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeScreenEmptyDM: {
    position: "absolute",
    //borderRadius: 30,
    backgroundColor: "#1e1e1e",
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreenEmptyDM;
