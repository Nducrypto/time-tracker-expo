import { StyleSheet } from "react-native";

const buttonStyle = {
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 10,
  paddingTop: 10,
  borderRadius: 10,
};

export const styles = StyleSheet.create({
  container: {
    width: 330,
  },
  message: {
    marginTop: 20,
    textAlign: "center",
  },
  sharedtext: {
    marginTop: 20,
    fontSize: 17,
    textAlign: "center",
  },
  workCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 6,
    paddingRight: 6,
  },
  input: {
    flex: 1,
    padding: 6,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    // width: 20,
  },
  cancelSavebutCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  saveBut: {
    ...buttonStyle,
    backgroundColor: "blue",
    width: 80,
    height: 41,
  },
  cancelBut: {
    ...buttonStyle,
    backgroundColor: "red",
    width: 80,
    height: 41,
  },
  butText: {
    color: "white",
    textAlign: "center",
  },
});
