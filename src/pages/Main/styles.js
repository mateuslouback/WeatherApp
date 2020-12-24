import { StyleSheet, Dimensions, Platform } from "react-native";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  safeArea: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginTop: Platform.OS === 'android' && 40
  },
  inputCep: {
    width: Dimensions.get("window").width - 105,
    height: 45,
    borderWidth: 1,
    borderColor: "#FFF",
    backgroundColor: "rgba(255, 255, 255, .2)",
    borderRadius: 22.5,
    paddingHorizontal: 17,
    fontSize: 14,
    marginHorizontal: 20,
    color: "#FFF",
    fontFamily: "Poppins-Light",
  },
  refresh: {
    height: 40,
    width: 40,
    marginRight: 20,
    resizeMode: "contain",
  },
  icon: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "contain",
  },
  city: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 30,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Poppins-Light",
  },
  graus: {
    alignSelf: "center",
    fontSize: 90,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Poppins-Light",
  },
  desc: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Poppins-Light",
    textTransform: 'capitalize'
  },
  scrollPage: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  scrollCards: {
    width: "100%",
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  mapStyle: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    height: 250,
    marginBottom: 40,
    borderRadius: 5,
  },
  load: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,255,.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
