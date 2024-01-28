import { Text, View, Switch, TouchableOpacity, Modal } from "react-native";
import { useStateContext } from "../../../utils/ContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  playSelectedSound,
  stopAndUnloadSound,
} from "../../../utils/utilsFunction";
import { allSoundsArray } from "./data";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./notificationStyles";

function Notifications() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const {
    setIsVibrationEnabled,
    isVibrationEnabled,
    selectedSound,
    setSelectedSound,
  } = useStateContext();

  const toggleSwitch = async () => {
    try {
      const updatedValue = !isVibrationEnabled;
      setIsVibrationEnabled(updatedValue);
      await AsyncStorage.setItem(
        "time-vibration",
        JSON.stringify(updatedValue)
      );
    } catch (error) {
      setMessage("Failed to update in storage");
    }
  };

  const saveSoundPreference = async () => {
    setIsModalVisible(false);
    try {
      await AsyncStorage.setItem("time-sound", JSON.stringify(selectedSound));
      console.log("Tone Saved");
    } catch (error) {
      console.log("Failed To save tone");
    }
    stopAndUnloadSound();
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Vibration</Text>
        {/* <Text style={errorMessage}></Text> */}
        <Switch
          trackColor={styles.trackColor}
          thumbColor={isVibrationEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isVibrationEnabled}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Sound</Text>
        <View>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.selectedSoundText}>
              {selectedSound?.title || "Select a sound"}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={saveSoundPreference}
                  style={styles.saveSound}
                >
                  <Icon name="check" size={32} color="blue" />
                </TouchableOpacity>
                {allSoundsArray.map((item, index) => {
                  return (
                    <View key={index} style={styles.dataCon}>
                      <Text style={styles.itemtitle}>{item.title}</Text>

                      <TouchableOpacity
                        style={{
                          ...styles.soundBut,
                          backgroundColor:
                            selectedSound.title === item.title ? "red" : "grey",
                        }}
                        onPress={() => {
                          setSelectedSound(item);
                          playSelectedSound(item.sound);
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}
export default Notifications;
