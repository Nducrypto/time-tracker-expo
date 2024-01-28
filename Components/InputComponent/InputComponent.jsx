import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./inputStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateContext } from "../../utils/ContextProvider";

const InputComponent = () => {
  const {
    setCurrentWorkTime,
    currentWorkTime,
    currentBreakTime,
    setCurrentBreakTime,
    setTimerInterval,
    setInitialWorkTime,
    setDisplayedText,
    setInitialBreakTime,
    setIsInputsOpen,
    initialWorkTime,
    initialBreakTime,
    setIsTimerRunning,
    setIsStartClicked,
  } = useStateContext();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentWorkTime.minutes > 59 || currentBreakTime.minutes > 59) {
      displayMessage();
    } else {
      setMessage("");
    }
  }, [currentWorkTime.minutes, currentBreakTime.minutes]);

  const displayMessage = () => {
    setMessage("Minutes must be less than 60");
  };
  const handleSaveToLocalStorage = async () => {
    try {
      if (currentWorkTime.minutes < 60 && currentBreakTime.minutes < 60) {
        await AsyncStorage.setItem(
          "work-time",
          JSON.stringify(currentWorkTime)
        );
        await AsyncStorage.setItem(
          "break-time",
          JSON.stringify(currentBreakTime)
        );
        updateStatesAfterStorage();
      } else {
        displayMessage();
      }
    } catch (error) {
      console.log("Failed to update in storage");
    }
  };

  const updateStatesAfterStorage = () => {
    setTimerInterval({ hours: 0, minutes: 0, seconds: 0 });
    setInitialWorkTime(currentWorkTime);
    setDisplayedText("Work Time");
    setInitialBreakTime(currentBreakTime);
    setIsInputsOpen(false);
    setIsStartClicked(false);
  };

  const handleClose = () => {
    setCurrentBreakTime({ ...initialBreakTime });
    setCurrentWorkTime({ ...initialWorkTime });
    setIsInputsOpen(false);
    setIsTimerRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.sharedtext}>Work</Text>
      <View style={styles.workCon}>
        <TextInput
          style={[styles.input, { marginRight: 10 }]}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(text) =>
            setCurrentWorkTime({
              ...currentWorkTime,
              hours: Number(text),
              seconds: 0,
            })
          }
          placeholder={`${initialWorkTime.hours} hours`}
        />
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="numeric"
          onChangeText={(text) =>
            setCurrentWorkTime({
              ...currentWorkTime,
              minutes: Number(text),
              seconds: 0,
            })
          }
          placeholder={`${initialWorkTime.minutes} minutes`}
        />
      </View>
      <Text style={styles.sharedtext}>Break</Text>
      <View style={styles.workCon}>
        <TextInput
          style={[styles.input, { marginRight: 10 }]}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={(text) =>
            setCurrentBreakTime({
              ...currentBreakTime,
              hours: Number(text),
              seconds: 0,
            })
          }
          placeholder={`${initialBreakTime.hours} hours`}
        />
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="numeric"
          onChangeText={(text) =>
            setCurrentBreakTime({
              ...currentBreakTime,
              minutes: Number(text),
              seconds: 0,
            })
          }
          placeholder={`${initialBreakTime.minutes} minutes`}
        />
      </View>
      <View style={styles.cancelSavebutCon}>
        <TouchableOpacity style={styles.cancelBut} onPress={handleClose}>
          <Text style={styles.butText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveBut}
          onPress={handleSaveToLocalStorage}
        >
          <Text style={styles.butText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputComponent;
