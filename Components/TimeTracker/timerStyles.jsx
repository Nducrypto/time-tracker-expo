import { StyleSheet } from "react-native";

export const buttonStyle = {
  paddingRight: 30,
  paddingLeft: 30,
  paddingBottom: 10,
  paddingTop: 10,
  borderRadius: 10,
};

export const styles = StyleSheet.create({
  title: {
    backgroundColor: "purple",
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 10,
    fontSize: 20,
    color: "white",
  },
  image: {
    width: "94%",
    height: "35%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  sessionIndicator: {
    fontSize: 20,
    marginTop: 40,
    textAlign: "center",
  },
  loading: {
    marginTop: 200,
  },
  countDownContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  countDownTimer: {
    borderWidth: 1,
    width: 370,
    height: 70,
    paddingBottom: 11,
    paddingTop: 11,
    textAlign: "center",
    fontSize: 30,
    // fontSize: 20,
    fontWeight: "300",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  startPauseButton: {
    ...buttonStyle,
    backgroundColor: "lightgreen",
    width: 116,
    height: 41,
  },
  resetButton: {
    ...buttonStyle,
    backgroundColor: "red",
    width: 110,
    height: 41,
  },
  startButtonText: {
    color: "black",
    textAlign: "center",
  },
  resetButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "100%",
  },
  proceedButText: {
    fontSize: 12,
    color: "white",
  },
  snoozeBut: {
    ...buttonStyle,
    backgroundColor: "lightgreen",
    width: 104,
    height: 41,
  },
  snoozeButText: {
    color: "black",
    textAlign: "center",
    fontSize: 12,
  },
});
