import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, .25)",
    paddingHorizontal: 15,
    paddingVertical: 12,
    height: 95,
    width: 145,
    marginRight: 12,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  desc: {
    color: "#FFF",
    fontSize: 30,
    fontFamily: "Poppins-Regular",
  },
});
