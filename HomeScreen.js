import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Switch,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "./ThemeContext";
import theme from "./Theme";
import { EventRegister } from "react-native-event-listeners";
import { sendPushNotification } from "./NotificationSender";

const COLOR_KEY = "color";
const MODAL_3_VISIBLE = "MODAL_3_VISIBLE";
const expoPushToken = "your-expo-push-token";

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState(false);
  const theme = useContext(themeContext);
  const [color, setColor] = useState(null);
  const [reminderTime, setReminderTime] = useState("");
  const [modalVisible, setModalVisible] = useState(null);
  const [lastEdited, setLastEdited] = useState(null);

  useEffect(() => {
    setLastEdited(new Date().toString());
  }, []);

  const showModal = (modal) => {
    setModalVisible(modal);
  };

  const hideModal = () => {
    setModalVisible(null);
  };

  useEffect(() => {
    const getColor = async () => {
      try {
        const color = await AsyncStorage.getItem(COLOR_KEY);
        setColor(color);
      } catch (error) {
        console.error(error);
      }
    };

    getColor();
  }, []);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notesFromStorage = await AsyncStorage.getItem("notes");
        if (notesFromStorage) {
          setNotes(JSON.parse(notesFromStorage));
        }
      } catch (e) {
        console.error(e);
      }
    };

    getNotes();
  }, [notes]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Note", { note: item })}
      >
        <SafeAreaView
          style={[
            styles.itemContainer,
            { backgroundColor: color },
            { borderBottomColor: theme.borderBottomColor },
          ]}
        >
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
                <Text style={styles.modalText}>{`Add Reminder`}</Text>
                <View style={styles.remindercontainer}>
                  <TextInput
                    style={styles.reminderinput}
                    placeholder="Enter reminder time in minutes"
                    value={reminderTime}
                    onChangeText={setReminderTime}
                    keyboardType="numeric"
                  />
                  <Button
                    title="Set Reminder"
                    onPress={() => sendPushNotification(expoPushToken)}
                  />
                </View>
                {/* <Pressable
                  style={[styles.button, styles.buttonDiscard]}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={styles.textStyleDiscard}>Discard</Text>
                </Pressable> */}
              </View>
            </View>
          </Modal>
          <View style={styles.headerContainer}>
            <Text style={[styles.judul, { color: theme.color }]}>
              {item.title} {item.color}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => showModal(MODAL_3_VISIBLE)}>
                <Image
                  style={styles.reminderimage}
                  source={
                    currentImage === 1
                      ? require("./assets/reminderlight.png")
                      : require("./assets/reminderdark.png")
                  }
                />
              </TouchableOpacity>
              {/* <Button
                title="Reminder"
                onPress={() => showModal(MODAL_3_VISIBLE)}
              /> */}
            </View>
          </View>
          <Text style={[styles.note, { color: theme.color }]}>
            Last Edited {lastEdited}
          </Text>
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  const [currentImage, setCurrentImage] = useState(1);

  const handleOnPress = () => {
    setCurrentImage(currentImage === 1 ? 2 : 1);
  };

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
          handleOnPress();
        }}
      />
      <TouchableOpacity
        style={styles.searchTouchableOpacity}
        activeOpacity={0.05}
        onPress={() => navigation.navigate("Search")}
      >
        <Image
          style={styles.search1Icon}
          resizeMode="cover"
          source={require("./assets/search-1.png")}
        />
        <View style={styles.rectangleView} />
      </TouchableOpacity>

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => navigation.navigate("Create")}
        >
          <Image
            style={styles.ellipseIcon}
            resizeMode="cover"
            source={require("./assets/plus.png")}
          />
        </TouchableOpacity>
        {/* <Image
            style={styles.plusSmall2Icon}
            resizeMode="cover"
            source={require("./assets/plussmall-2.png")}
          /> */}

        {notes.length ? (
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require("./NOTE.png")}
              style={styles.iconRemovebgPreview1}
              resizeMode="cover"
            />
            <Text style={[styles.buatCatatanPertamamu, { color: theme.color }]}>
              Create your first DayList !
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reminderimage: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    top: 18,
  },
  remindercontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderinput: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  itemContainer: {
    width: 300,
    height: 130,
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    //justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  buttonContainer: {
    marginTop: 5,
    top: 1,
    marginLeft: 220,
    alignItems: "flex-end",
    position: "absolute",
  },
  judul: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    marginTop: 10,
    top: 1,
  },
  note: {
    fontSize: 12,
    marginLeft: 140,
    marginTop: 50,
    top: 25,
  },
  container: {
    flex: 1,
    marginTop: 100,
    //paddingTop: 10,
    right: 20,
    marginLeft: 20,
    position: "relative",
  },

  emptyImage: {
    width: 128,
    height: 128,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  item: {
    marginVertical: 4,
  },
  title: {
    textAlign: "center",
    marginTop: 50,
  },
  notesTitle: {
    fontSize: 24,
  },
  switchmode: {
    position: "absolute",
    top: 47,
    left: 240,
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
    left: 300,
    width: 40,
    height: 40,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  ellipseIcon: {
    position: "absolute",
    height: 50,
    width: 50,
    top: 540,
    // right: "0%",
    bottom: "0%",
    left: 290,
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
    top: 550,
    left: 120,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  iconRemovebgPreview1: {
    position: "absolute",
    top: 150,
    //left: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 287,
    height: 264,
  },
  buatCatatanPertamamu: {
    position: "absolute",
    top: 360,
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
    zIndex: 1,
  },
});

export default HomeScreen;
