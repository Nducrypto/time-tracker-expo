import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TimeTracker from "./Components/TimeTracker/TimerTracker.jsx";
import { ContextProvider } from "./utils/ContextProvider.jsx";
import Settings from "./Components/Settings/Settings.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppRegistry, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

const Stack = createStackNavigator();
const BACKGROUND_FETCH_TASK = "background-fetch";
let timerState = { hours: 0, minutes: 0, seconds: 60 };

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async ({ data, error }) => {
  if (error) {
    console.log("Error performing task manager");
    return;
  }

  if (data) {
    console.log(`Fetched ${data} successfully`);

    updateCountdown();
  }
});
const updateCountdown = () => {
  if (timerState.seconds > 0) {
    timerState.seconds -= 1;
  } else if (timerState.minutes > 0) {
    timerState.minutes -= 1;
    timerState.seconds = 59;
  } else if (timerState.hours > 0) {
    timerState.hours -= 1;
    timerState.minutes = 59;
    timerState.seconds = 59;
  }

  console.log(timerState);

  setTimeout(updateCountdown, 1000);
};
export default function App() {
  async function registerBackgroundFetchAsync() {
    console.log("Successfully registerd");
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 2,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  }

  useEffect(() => {
    registerBackgroundFetchAsync();
  }, []);

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TimeTracker">
          <Stack.Screen
            options={{
              title: "",
              headerShadowVisible: false,
              headerLeft: () => {
                const { navigate } = useNavigation();
                return (
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigate("Settings")}
                  >
                    <Icon name="gear" size={25} color="blue" />
                  </TouchableOpacity>
                );
              },
            }}
            name="TimeTracker"
            component={TimeTracker}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 20,
  },
});

AppRegistry.registerComponent("work-timer-app", () => App);
