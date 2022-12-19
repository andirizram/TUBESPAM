import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import randomcolor from "randomcolor";
import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  Image,
  TouchableOpacity,
  Text,
  Keyboard,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import {
  Datepicker as RNKDatepicker,
  Icon as RNKIcon,
  withStyles,
} from "@ui-kitten/components";
import themeContext from "./ThemeContext";
import theme from "./Theme";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

const COLOR_KEY = "color";

const CreateScreen = () => {
  const theme = useContext(themeContext);
  const [color, setColor] = useState(randomcolor());
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState({
    date: "",
    title: "",
    content: "",
  });
  const navigation = useNavigation();

  const saveColor = async (color) => {
    try {
      await AsyncStorage.setItem(COLOR_KEY, color);
    } catch (error) {
      console.error(error);
    }
  };

  const randomizeColor = () => {
    const newColor = randomcolor();
    setColor(newColor);
    saveColor(newColor); // simpan warna baru di AsyncStorage
  };

  const createNote = async () => {
    try {
      const notesFromStorage = await AsyncStorage.getItem("notes");
      let notes = [];
      if (notesFromStorage) {
        notes = JSON.parse(notesFromStorage);
      }
      notes.push({ ...note, id: Math.random().toString() });
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      navigation.navigate("Home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.screenCreateNoteDMA, { backgroundColor: color }]}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.infostyle}
                  resizeMode="cover"
                  source={require("./assets/info.png")}
                />
                <Text style={styles.modalText}>{`Save Or Discard 
Changes ?`}</Text>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    if (note.title === "") {
                      Alert.alert("Note Doesn't Have A Title");
                      setModalVisible(!modalVisible);
                    } else {
                      createNote();
                      randomizeColor();
                    }
                  }}
                >
                  <Text style={styles.textStyleSave}>Save</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDiscard]}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={styles.textStyleDiscard}>Discard</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.backTouchableOpacity}
            activeOpacity={0.2}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.rectangleView} />
            <Image
              style={styles.angleSmallLeft11}
              resizeMode="cover"
              source={require("./assets/anglesmallleft-1-1.png")}
            />
          </TouchableOpacity>
          {/* <RNKDatepicker
            placeholder={() => (
              <Text
                style={[styles.datePickerPlaceHolder, { color: theme.color }]}
              >
                Insert Date
              </Text>
            )}
            accessoryRight={<RNKIcon name="calendar-outline" pack="material" />}
            date={note.date}
            onSelect={(text) => setNote({ ...note, date: text })}
            controlStyle={[
              styles.datePickerValue,
              { backgroundColor: theme.background },
            ]}
          /> */}
          <TextInput
            style={[styles.datePickerPlaceHolder, { color: theme.color }]}
            placeholder="Insert Date DD-MM-YYYY"
            value={note.date}
            onChangeText={(text) => setNote({ ...note, date: text })}
            keyboardType="number-pad"
            placeholderTextColor={theme.color}
          />
          <TextInput
            value={note.title}
            onChangeText={(text) => setNote({ ...note, title: text })}
            style={[styles.titleTextInput, { color: theme.color }]}
            placeholder="Inset Note Title"
            autoCapitalize="sentences"
            placeholderTextColor={theme.color}
            keyboardType="default"
          />
          <TextInput
            value={note.content}
            onChangeText={(text) => setNote({ ...note, content: text })}
            multiline={true}
            placeholder="Insert Note Content"
            style={[styles.clickToStart, { color: theme.color }]}
            placeholderTextColor={theme.color}
            autoFocus
            keyboardType="default"
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  datePickerPlaceHolder: {
    //fontFamily: "Nunito",
    color: "#5a5a5a",
    fontSize: 23,
    top: 120,
    left: 15,
  },
  datePickerValue: {
    position: "absolute",
    //backgroundColor: "#1e1e1e",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  infostyle: {
    width: 40,
    height: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDiscard: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    right: 50,
    bottom: 0,
    backgroundColor: "#2196F3",
  },
  buttonSave: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    left: 50,
    top: 42,
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyleDiscard: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  textStyleSave: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    top: 18,
  },
});

export default CreateScreen;
