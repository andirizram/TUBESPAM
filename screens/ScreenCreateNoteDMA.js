import * as React from "react";
import { useState, useContext } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Datepicker as RNKDatepicker,
  Icon as RNKIcon,
  withStyles,
} from "@ui-kitten/components";
import themeContext from "../ThemeContext";
import theme from "../Theme";

const ScreenCreateNoteDMA = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [datePicker, setDatePicker] = useState(undefined);

  return (
    <View
      style={[
        styles.screenCreateNoteDMA,
        { backgroundColor: theme.background },
      ]}
    >
      <TouchableOpacity
        style={styles.backTouchableOpacity}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("HomeScreenEmptyDM")}
      >
        <View style={styles.rectangleView} />
        <Image
          style={styles.angleSmallLeft11}
          resizeMode="cover"
          source={require("../assets/anglesmallleft-1-1.png")}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.titleTextInput, { color: theme.color }]}
        placeholder="Inset Note Title"
        keyboardType="default"
        autoCapitalize="sentences"
      />
      <TextInput
        placeholder="Insert Note Content"
        multiline
        style={[styles.clickToStart, { color: theme.color }]}
      />
      <RNKDatepicker
        placeholder={() => (
          <Text style={styles.datePickerPlaceHolder}>Insert Date</Text>
        )}
        accessoryRight={<RNKIcon name="calendar-outline" pack="material" />}
        date={datePicker}
        onSelect={setDatePicker}
        controlStyle={styles.datePickerValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerPlaceHolder: {
    //fontFamily: "Nunito",
    color: "#5a5a5a",
    fontSize: 14,
  },
  datePickerValue: {
    position: "absolute",
    top: 108,
    left: 15,
    backgroundColor: "#1e1e1e",
  },
  rectangleView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.3)",
  },
  angleSmallLeft11: {
    position: "absolute",
    height: "80%",
    width: "80%",
    top: "10%",
    right: "10%",
    bottom: "10%",
    left: "10%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  backTouchableOpacity: {
    position: "absolute",
    top: 47,
    left: 20,
    width: 40,
    height: 40,
  },
  titleTextInput: {
    position: "absolute",
    top: 150,
    left: 15,
    minWidth: 10,
    color: "white",
    fontSize: 25,
    height: 40,
    flexShrink: 1,
  },
  clickToStart: {
    position: "absolute",
    top: 190,
    left: 15,
    fontSize: 16,
    fontWeight: "500",
    //fontFamily: "Nunito",
    color: "white",
    textAlign: "justify",
    width: 370,
    height: 380,
    //padding: 10,
    textAlignVertical: "top",
  },
  screenCreateNoteDMA: {
    position: "relative",
    //borderRadius: 30,
    backgroundColor: "#1e1e1e",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    flexShrink: 1,
  },
});

export default ScreenCreateNoteDMA;
