import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Text,
  Keyboard,
  Pressable,
  Image,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationHelpersContext,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import {
  Datepicker as RNKDatepicker,
  Icon as RNKIcon,
  withStyles,
} from "@ui-kitten/components";
import themeContext from "./ThemeContext";
import theme from "./Theme";
import { Picker } from "@react-native-picker/picker";

const MODAL_1_VISIBLE = "MODAL_1_VISIBLE";
const MODAL_2_VISIBLE = "MODAL_2_VISIBLE";
const MODAL_3_VISIBLE = "MODAL_3_VISIBLE";

const NoteScreen = () => {
  const theme = useContext(themeContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [note, setNote] = useState(route.params.note);
  const [modalVisible, setModalVisible] = useState(null);
  const [color, setColor] = useState(theme.background);

  const handleChange = async (selectedColor) => {
    setColor(selectedColor);
    try {
      await AsyncStorage.setItem("@background_color", selectedColor);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveColor = async () => {
    try {
      const value = await AsyncStorage.getItem("@background_color");
      if (value !== null) {
        setColor(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    retrieveColor();
  }, []);

  const showModal = (modal) => {
    setModalVisible(modal);
  };

  const hideModal = () => {
    setModalVisible(null);
  };

  const saveNote = async () => {
    try {
      const notesFromStorage = await AsyncStorage.getItem("notes");
      let notes = [];
      if (notesFromStorage) {
        notes = JSON.parse(notesFromStorage);
      }
      notes = notes.map((item) => (item.id === note.id ? note : item));
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNote = async () => {
    try {
      const notesFromStorage = await AsyncStorage.getItem("notes");
      let notes = [];
      if (notesFromStorage) {
        notes = JSON.parse(notesFromStorage);
      }
      notes = notes.filter((item) => item.id !== note.id);
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };
  async function shareNote() {
    try {
      const result = await Share.share({
        message: note.content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.screenCreateNoteDMA, { backgroundColor: color }]}>
          {/* Edit Button */}
          <View style={styles.search}>
            <View style={styles.rectangleView} />
            <TouchableOpacity onPress={() => showModal(MODAL_2_VISIBLE)}>
              <Image
                style={styles.pencil11}
                resizeMode="cover"
                source={require("./assets/trash-1.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.share}>
            <View style={styles.rectangleView} />
            <TouchableOpacity onPress={shareNote}>
              <Image
                style={styles.pencil11}
                resizeMode="cover"
                source={require("./assets/info.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.backTouchableOpacity}
            activeOpacity={0.2}
            onPress={() => showModal(MODAL_1_VISIBLE)}
          >
            <View style={styles.rectangleView1} />
            <Image
              style={styles.angleSmallLeft11}
              resizeMode="cover"
              source={require("./assets/anglesmallleft-1-1.png")}
            />
          </TouchableOpacity>

          {/* Trash Button */}
          {/* <View style={styles.groupView}>
            <View style={styles.search2}></View>
            <TouchableOpacity
              style={styles.searchTouchableOpacity}
              activeOpacity={0.05}
              onPress={() => showModal(MODAL_2_VISIBLE)}
            >
              <Image
                style={styles.trash1Icon}
                resizeMode="cover"
                source={require("./assets/trash-1.png")}
              />
              <View style={styles.rectangleView2} />
            </TouchableOpacity>
          </View> */}

          {/* ChangeBackground Button */}
          <View style={styles.changeBackground}>
            <View style={styles.rectangleView3} />
            <TouchableOpacity onPress={() => showModal(MODAL_3_VISIBLE)}>
              <Image
                style={styles.image1Icon}
                resizeMode="cover"
                source={require("./assets/image-1.png")}
              />
            </TouchableOpacity>
          </View>

          {/* Modal 1 Edit */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible === MODAL_1_VISIBLE}
            onRequestClose={hideModal}
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
                  style={[
                    styles.button,
                    styles.buttonSave,
                    { backgroundColor: "green" },
                  ]}
                  onPress={saveNote}
                >
                  <Text style={styles.textStyleSave}>Save</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonDiscard,
                    { backgroundColor: "red" },
                  ]}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.textStyleDiscard}>Discard</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Modal 2 Trash */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible === MODAL_2_VISIBLE}
            onRequestClose={hideModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.infostyle}
                  resizeMode="cover"
                  source={require("./assets/info.png")}
                />
                <Text style={styles.modalText}>{`Are you sure?`}</Text>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonYesDelete,
                    { backgroundColor: "green" },
                  ]}
                  onPress={deleteNote}
                >
                  <Text style={styles.textStyleSave}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonNoDelete,
                    { backgroundColor: "red" },
                  ]}
                  onPress={hideModal}
                >
                  <Text style={styles.textStyleDiscard}>No</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Modal 3 ChangeBackground */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible === MODAL_3_VISIBLE}
            onRequestClose={hideModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.infostyle}
                  resizeMode="cover"
                  source={require("./assets/info.png")}
                />
                <Text style={styles.modalText}>{`Change Background`}</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={color}
                  onValueChange={handleChange}
                >
                  <Picker.Item label="Putih" value="white" />
                  <Picker.Item label="Merah" value="red" />
                  <Picker.Item label="Hijau" value="green" />
                  <Picker.Item label="Biru" value="blue" />
                  <Picker.Item label="Kuning" value="yellow" />
                  <Picker.Item label="Coklat" value="brown" />
                  <Picker.Item label="Abu-abu" value="gray" />
                  <Picker.Item label="Pink" value="pink" />
                  <Picker.Item label="Ungu" value="purple" />
                  <Picker.Item label="Powderblue" value="#b0e0e6" />
                  <Picker.Item label="Oranye" value="orange" />
                  <Picker.Item label="Lightgreen" value="#90ee90" />
                </Picker>
                <Pressable
                  style={[styles.button, styles.buttonDone]}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={styles.textStyleSave}>Done</Text>
                </Pressable>
                {/* <Pressable
                  style={[styles.button, styles.buttonDiscard]}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={styles.textStyleDiscard}>Discard</Text>
                </Pressable> */}
              </View>
            </View>
          </Modal>

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
            placeholder="Insert Date"
            value={note.date}
            onChangeText={(text) => setNote({ ...note, date: text })}
            keyboardType="number-pad"
          />
          <TextInput
            value={note.title}
            onChangeText={(text) => setNote({ ...note, title: text })}
            style={[styles.titleTextInput, { color: theme.color }]}
            placeholder="Inset Note Title"
            autoCapitalize="sentences"
            placeholderTextColor={theme.color}
          />
          <TextInput
            value={note.content}
            onChangeText={(text) => setNote({ ...note, content: text })}
            placeholder="Insert Note Content"
            multiline={true}
            style={[styles.clickToStart, { color: theme.color }]}
            placeholderTextColor={theme.color}
            autoFocus
          />

          {/* <Button title="Save" onPress={saveNote} />
          <Button title="Delete" onPress={deleteNote} /> */}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 200,
  },
  searchTouchableOpacity: {
    position: "absolute",
    top: 47,
    left: 340,
    width: 40,
    height: 40,
    backgroundColor: "gray",
    borderRadius: 10,
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
  pencil11: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 20,
    height: 20,
  },
  search: {
    position: "absolute",
    top: 47,
    left: 300,
    width: 40,
    height: 40,
  },
  share: {
    position: "absolute",
    top: 47,
    left: 250,
    width: 40,
    height: 40,
  },
  image1Icon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  changeBackground: {
    position: "absolute",
    top: 691,
    left: 299,
    width: 40,
    height: 40,
  },
  rectangleView3: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    width: 40,
    height: 40,
  },
  groupView: {
    position: "absolute",
    top: 47,
    left: 240,
    width: 40,
    height: 40,
  },
  rectangleView2: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
    backgroundColor: "#cd4242",
    width: 40,
    height: 40,
  },
  search2: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  trash1Icon: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 20,
    height: 20,
  },
  datePickerPlaceHolder: {
    //fontFamily: "Nunito",
    color: "#5a5a5a",
    fontSize: 14,
    top: 108,
    left: 15,
  },
  datePickerValue: {
    position: "absolute",
    //backgroundColor: "#1e1e1e",
  },
  rectangleView1: {
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
    width: 300,
  },
  buttonDiscard: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    right: 60,
    bottom: 0,
    width: 100,
  },
  buttonSave: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    left: 60,
    top: 42,
    width: 100,
  },
  buttonYesDelete: {
    borderRadius: 10,
    padding: 10,
    width: 60,
    elevation: 2,
    left: 50,
    top: 42,
    backgroundColor: "#2196F3",
  },
  buttonNoDelete: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 60,
    right: 50,
    bottom: 0,
    backgroundColor: "#2196F3",
  },
  buttonDone: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    left: 0,
    top: 15,
    backgroundColor: "#2196F3",
    width: 100,
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

export default NoteScreen;
