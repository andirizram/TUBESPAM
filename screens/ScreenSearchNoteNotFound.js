import * as React from "react";
import { useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

const ScreenSearchNoteNotFound = () => {
  const [searchTextInput, setSearchTextInput] = useState("TextNoteTitle");

  return (
    <View style={styles.screenSearchNoteNotFound}>
      <TextInput
        style={styles.searchTextInput}
        keyboardType="default"
        value={searchTextInput}
        onChangeText={setSearchTextInput}
        placeholderTextColor="rgba(239, 239, 239, 0)"
      />
      <Text style={styles.fileNotFoundTrySearching}>
        File not found. Try searching again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchTextInput: {
    position: "absolute",
    top: 47,
    left: 20,
    width: 320,
    height: 40,
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  fileNotFoundTrySearching: {
    position: "absolute",
    top: 411,
    left: 27,
    fontSize: 20,
    fontWeight: "300",
    //fontFamily: "Nunito",
    color: "#fff",
    textAlign: "left",
    width: 313,
  },
  screenSearchNoteNotFound: {
    position: "relative",
    borderRadius: 30,
    backgroundColor: "#1e1e1e",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default ScreenSearchNoteNotFound;
