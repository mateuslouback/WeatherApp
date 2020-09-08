import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    zIndex: 10000,
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#7E7E7E",
    marginBottom: 25,
    fontWeight: "bold",
  },
  errorDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#7E7E7E",
    marginBottom: 25,
  },
});
