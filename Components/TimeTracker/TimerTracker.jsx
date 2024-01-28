import { useEffect } from "react";
import {
  View,
  Text,
  Vibration,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./timerStyles";
import { useStateContext } from "../../utils/ContextProvider";
import {
  playSelectedSound,
  schedulePushNotification,
  stopAndUnloadSound,
} from "../../utils/utilsFunction";
import MessageComponent from "./MessageComponent/MessageComponent";

const TimeTracker = () => {
  const {
    initialState,
    timerInterval,
    isInputsOpen,
    isStartClicked,
    setIsStartClicked,
    isloading,
    displayedText,
    setDisplayedText,
    setIsLoading,
    isTimerRunning,
    setIsTimerRunning,
    setTimerInterval,
    initialWorkTime,
    currentBreakTime,
    setCurrentBreakTime,
    setInitialWorkTime,
    initialBreakTime,
    setInitialBreakTime,
    currentWorkTime,
    setCurrentWorkTime,
    setIsVibrationEnabled,
    isVibrationEnabled,
    isTimerComplete,
    setIsTimerComplete,
    selectedSound,
    setSelectedSound,
  } = useStateContext();

  const updateTimer = () => {
    setTimerInterval((prevInterval) => {
      const newState = { ...prevInterval };
      if (newState.seconds > 0) {
        newState.seconds -= 1;
      } else if (newState.minutes > 0) {
        newState.minutes -= 1;
        newState.seconds = 59;
      } else if (newState.hours > 0) {
        newState.hours -= 1;
        newState.minutes = 59;
        newState.seconds = 59;
      } else {
        if (
          newState.hours === 0 &&
          newState.minutes === 0 &&
          newState.seconds === 0
        ) {
          setIsTimerComplete(true);
          setIsTimerRunning(false);
        }
      }

      return newState;
    });
  };
  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  async function handleScheduleNotification() {
    await schedulePushNotification(displayedText);
    return;
  }
  useEffect(() => {
    let interval;
    const handleTimerComplete = () => {
      playSelectedSound(selectedSound.sound);
      handleScheduleNotification();
      if (isVibrationEnabled) {
        interval = setInterval(() => {
          Vibration.vibrate(500);
        }, 1500);
      }
    };

    if (isTimerComplete) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isTimerComplete]);

  const startPauseTimer = () => {
    if (isStartClicked) {
      setIsTimerRunning((prev) => !prev);
    } else {
      setIsTimerRunning(true);
      setTimerInterval({ ...currentWorkTime });
      setIsStartClicked(true);
    }
  };
  const resetCountDown = () => {
    setIsTimerRunning(false);
    setTimerInterval(initialState);
    setDisplayedText("Work Time");
    setIsStartClicked(false);
    setIsTimerComplete(false);
    stopAndUnloadSound();
  };

  const switchTimer = () => {
    if (displayedText === "Work Time") {
      setDisplayedText("Break Time");
      setTimerInterval({ ...currentBreakTime });
    } else {
      setDisplayedText("Work Time");
      setTimerInterval({ ...currentWorkTime });
    }
  };

  useEffect(() => {
    const loadWorkTimeFromStorage = async () => {
      setIsLoading(true);
      try {
        const storedWorkTime = await AsyncStorage.getItem("work-time");
        const storedBreakTime = await AsyncStorage.getItem("break-time");
        const vibrationStatus = await AsyncStorage.getItem("time-vibration");
        const alertSound = await AsyncStorage.getItem("time-sound");
        if (storedWorkTime) {
          updateStateAfterloadingStorage(storedWorkTime, storedBreakTime);
          setIsLoading(false);
        } else {
          setTimerInterval({ ...initialState });
          setIsLoading(false);
        }
        if (vibrationStatus === "true") {
          setIsVibrationEnabled(true);
        }
        if (alertSound !== null) {
          const parsedAlertSound = JSON.parse(alertSound);
          setSelectedSound(parsedAlertSound);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error loading work-time from AsyncStorage:", error);
      }
    };

    loadWorkTimeFromStorage();
  }, []);

  const updateStateAfterloadingStorage = (storedWorkTime, storedBreakTime) => {
    const parsedWorkTime = JSON.parse(storedWorkTime);
    const parsedBreakTime = JSON.parse(storedBreakTime);
    setInitialWorkTime(parsedWorkTime);
    setCurrentWorkTime(parsedWorkTime);
    setInitialBreakTime(parsedBreakTime);
    setCurrentBreakTime(parsedBreakTime);
  };

  const handleSnooze = () => {
    setIsTimerComplete(false);
    stopAndUnloadSound();
    setTimerInterval((prevInterval) => ({
      ...prevInterval,
      hours: prevInterval.hours,
      minutes: prevInterval.minutes + 5,
      seconds: prevInterval.seconds,
    }));
    setIsTimerRunning(true);
  };

  const handleProceedToNextSession = () => {
    setIsTimerComplete(false);
    stopAndUnloadSound();
    switchTimer();
    setIsTimerRunning(true);
  };
  const isCountDownEndin =
    timerInterval.hours === 0 && timerInterval.minutes === 0;

  return (
    <View>
      <Text style={styles.title}>TimeFlow Productivity Tracker</Text>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/man-working-with-laptop-cartoon-character-freelancer-using-computer-freelance-business-remote-job-distant-work-time-management-home-office_335657-2089.jpg?size=626&ext=jpg&ga=GA1.2.812039611.1690657998&semt=ais",
        }}
        style={styles.image}
      />
      {isloading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <Text style={styles.sessionIndicator}>
            {`${displayedText} : ${String(
              displayedText === "Work Time"
                ? initialWorkTime.hours
                : initialBreakTime.hours
            ).padStart(2, "0")}:${String(
              displayedText === "Work Time"
                ? initialWorkTime.minutes
                : initialBreakTime.minutes
            ).padStart(2, "0")} :${String(initialWorkTime.seconds).padStart(
              2,
              "0"
            )}`}
          </Text>
          <View style={styles.countDownContainer}>
            <Text
              style={{
                ...styles.countDownTimer,
                borderColor: isCountDownEndin ? "red" : "green",
              }}
            >{`${String(timerInterval.hours).padStart(2, "0")}:${String(
              timerInterval.minutes
            ).padStart(2, "0")}:${String(timerInterval.seconds).padStart(
              2,
              "0"
            )}`}</Text>
          </View>
          {!isTimerComplete && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={resetCountDown}
                style={styles.resetButton}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.startPauseButton}
                onPress={startPauseTimer}
                disabled={isInputsOpen}
              >
                <Text style={styles.startButtonText}>
                  {isTimerRunning
                    ? "Pause"
                    : timerInterval.seconds !== 0 ||
                      timerInterval.minutes !== 0 ||
                      timerInterval.hours !== 0
                    ? "Resume"
                    : "Start"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal
            visible={isTimerComplete}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <MessageComponent />
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleProceedToNextSession}
                    disabled={isInputsOpen}
                  >
                    <Text style={styles.proceedButText}>Proceed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSnooze}
                    disabled={isInputsOpen}
                    style={styles.snoozeBut}
                  >
                    <Text style={styles.snoozeButText}>Snooze</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default TimeTracker;
