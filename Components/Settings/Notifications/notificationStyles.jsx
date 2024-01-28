import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
  },
  title: {
    fontSize: 15,
    marginTop: 10,
  },
  trackColor: {
    false: "#767577",
    true: "#81b0ff",
  },

  picker: {
    flex: 1,
    marginTop: -9,
    width: 170,
    height: 50,
  },
  pickerItem: {
    color: "black",
    fontSize: 14,
  },

  // MODALS
  saveSound: {
    marginLeft: 210,
  },
  dataCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  soundBut: {
    borderRadius: 40,
    height: 30,
    width: 30,
  },
  selectedSoundText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    alignItems: "center",
  },
  itemtitle: {
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
});
