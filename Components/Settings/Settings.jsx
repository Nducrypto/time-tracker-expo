import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useStateContext } from "../../utils/ContextProvider";
import InputComponent from "../InputComponent/InputComponent";
import { buttonStyle } from "../TimeTracker/timerStyles";
import Notifications from "./Notifications/Notifications";

const Settings = () => {
  const { isInputsOpen, setIsInputsOpen, setIsTimerRunning } =
    useStateContext();

  const handleOpenInputs = async () => {
    setIsInputsOpen(true);
    setIsTimerRunning(false);
  };

  return (
    <View>
      <Notifications />
      <View style={styles.setTimeContainer}>
        {!isInputsOpen && (
          <TouchableOpacity
            onPress={handleOpenInputs}
            style={styles.setTimeButton}
          >
            <Text style={styles.buttonText}>Set Time</Text>
          </TouchableOpacity>
        )}
        {isInputsOpen && <InputComponent />}
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  setTimeContainer: {
    alignItems: "center",
  },
  setTimeButton: {
    ...buttonStyle,
    backgroundColor: "#FF10F0",
    width: 180,
    height: 41,
    marginTop: 160,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
