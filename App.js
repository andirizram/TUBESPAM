import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import CreateScreen from "./CreateScreen";
import SearchScreen from "./SearchScreen";
import NoteScreen from "./NoteScreen";
import { useState, useEffect } from "react";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./ThemeContext";
import theme from "./Theme";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const Stack = createStackNavigator();

const App = () => {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "ChangeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 500);
  }, [hideSplashScreen]);

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    const unsubscribe = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    // Unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    setExpoPushToken(token);
  }

  return (
    <>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <IconRegistry icons={[MaterialIconsPack]} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Create"
                component={CreateScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Note"
                component={NoteScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </themeContext.Provider>
    </>
  );
};

export default App;
