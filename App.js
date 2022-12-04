const Stack = createNativeStackNavigator();
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ScreenCreateNoteDMA from "./screens/ScreenCreateNoteDMA";
import ScreenSearchNoteNotFound from "./screens/ScreenSearchNoteNotFound";
import ScreenSearchNoteDM from "./screens/ScreenSearchNoteDM";
import HomeScreenEmptyDM from "./screens/HomeScreenEmptyDM";
import SplashScreen from "./screens/SplashScreen";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./ThemeContext";
import theme from "./Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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
    }, 3000);
  }, []);

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
  return (
    <>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <IconRegistry icons={[MaterialIconsPack]} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {hideSplashScreen ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="HomeScreenEmptyDM"
                  component={HomeScreenEmptyDM}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScreenCreateNoteDMA"
                  component={ScreenCreateNoteDMA}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScreenSearchNoteNotFoundDM"
                  component={ScreenSearchNoteNotFound}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScreenSearchNoteDM"
                  component={ScreenSearchNoteDM}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <SplashScreen />
            )}
          </NavigationContainer>
        </ApplicationProvider>
      </themeContext.Provider>
    </>
  );
};
export default App;
