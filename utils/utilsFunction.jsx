import { useEffect } from "react";
import { Platform } from "react-native";
import { useStateContext } from "./ContextProvider";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function schedulePushNotification(displayedText) {
  const messageTitle =
    displayedText === "Work Time" ? "Break Time" : "Work Time";
  const messageBody = `it is ${messageTitle}`;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: messageTitle,
      body: messageBody,
      data: { data: "goes here" },
    },
    trigger: null,
  });
}

export function processPushNotification() {
  const { setExpoPushToken, setNotification } = useStateContext();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export const playSelectedSound = async (selectedSound) => {
  try {
    if (soundObject._loaded) {
      await soundObject.unloadAsync();
    }
    if (selectedSound) {
      await soundObject.loadAsync(selectedSound);
      await soundObject.playAsync();

      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          soundObject.replayAsync();
        }
      });
    } else {
      console.error("Invalid sound selection");
    }
  } catch (error) {
    console.error("Error loading or playing sound:", error);
  }
};

export const stopAndUnloadSound = async () => {
  if (soundObject) {
    if (soundObject._loaded) {
      await soundObject.unloadAsync();
    }
  }
};
