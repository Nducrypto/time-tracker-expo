import React, { createContext, useContext, useState } from "react";
import { allSoundsArray } from "../Components/Settings/Notifications/data";

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [initialWorkTime, setInitialWorkTime] = useState({
    hours: 0,
    minutes: 1,
    seconds: 0,
  });

  const [initialBreakTime, setInitialBreakTime] = useState({
    hours: 0,
    minutes: 5,
    seconds: 0,
  });
  const [currentWorkTime, setCurrentWorkTime] = useState({
    ...initialWorkTime,
  });
  const [currentBreakTime, setCurrentBreakTime] = useState({
    ...initialBreakTime,
  });
  const initialState = { hours: 0, minutes: 0, seconds: 0 };
  const [timerInterval, setTimerInterval] = useState(initialState);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isInputsOpen, setIsInputsOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("Work Time");
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  // const [selectedSound, setSelectedSound] = useState("");
  const [selectedSound, setSelectedSound] = useState(allSoundsArray[0]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  return (
    <stateContext.Provider
      value={{
        initialWorkTime,
        setInitialWorkTime,
        initialBreakTime,
        setInitialBreakTime,
        currentWorkTime,
        setCurrentWorkTime,
        currentBreakTime,
        setCurrentBreakTime,
        initialState,
        timerInterval,
        setTimerInterval,
        isTimerRunning,
        setIsTimerRunning,
        isInputsOpen,
        setIsInputsOpen,
        isloading,
        setIsLoading,
        displayedText,
        setDisplayedText,
        isVibrationEnabled,
        setIsVibrationEnabled,
        isStartClicked,
        setIsStartClicked,
        isTimerComplete,
        setIsTimerComplete,
        selectedSound,
        setSelectedSound,
        expoPushToken,
        setExpoPushToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
