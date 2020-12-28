import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import * as Font from "expo-font";
import api from "../../services/api";
import MapView, { Marker } from "react-native-maps";
import { debounce } from "lodash";
import styles from "./styles.js";
import DetailWeather from "../../components/DetailWeather";
import Error from "../../components/ErrorLocation";
import imageIcon from "../../../assets/images/icons/icons.json";
import Background from "../../components/BackGround/bg.json";

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorLocation, setErrorLocation] = useState(false);
  const [hiddenLoad, setHiddenLoad] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const [icon, setIcon] = useState();
  const [bgColor, setBgColor] = useState("");
  const API_ID = "YOUR_API_ID";

  useEffect(() => {
    (async () => {
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted' || status === 'undetermined') {
          const dataLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          setLocation(dataLocation);
          loadWeather(dataLocation);
      } else {
        setErrorLocation(true)
        setHiddenLoad(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
      }))();
  }, []);

  const loadWeather = async (location) => {
    setHiddenLoad(false);
    let response = await api
      .get(
        `?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_ID}&lang=pt_br`
      )
      .catch(() => {
        Alert.alert(
          "Erro ao carregar a previsão do tempo.",
          "Tente novamente mais tarde.",
          [{ text: "OK" }],
          {
            cancelable: false,
          }
        );
        setHiddenLoad(true);
      });

    setWeatherData(response.data);
    const nameIcon = response.data.weather[0].icon;
    setIcon(imageIcon[nameIcon]);
    defineBackground(nameIcon);
    setHiddenLoad(true);
  };

  const loadWeatherCity = async (city) => {
    setHiddenLoad(false);
    let response = await api
      .get(`?q=${city}&appid=${API_ID}&lang=pt_br`)
      .catch(() => {
        Alert.alert(
          "Cidade não encontrada!",
          "Confira o nome da cidade e tente novamente.",
          [{ text: "OK" }],
          {
            cancelable: false,
          }
        );
        setHiddenLoad(true);
      });

    setWeatherData(response.data);
    const nameIcon = response.data.weather[0].icon;
    setIcon(imageIcon[nameIcon]);
    defineBackground(nameIcon);
    setHiddenLoad(true);
  };

  const handleCity = debounce((text) => {
    if (text !== "") {
      loadWeatherCity(text.trim());
    }
  }, 1500);

  function defineBackground(icon) {
    switch (icon) {
      case "01d":
      case "50d":
        setBgColor(Background.color_one);
        break;
      case "01n":
      case "50n":
        setBgColor(Background.color_five);
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        setBgColor(Background.color_two);
        break;
      case "09d":
      case "09n":
      case "13d":
      case "13n":
        setBgColor(Background.color_tree);
        break;
      case "10d":
      case "10n":
      case "11d":
      case "11n":
        setBgColor(Background.color_four);
        break;
    }
  }

  return (
    <>
      <StatusBar style="light" />
      {errorLocation && <Error />}
      {!hiddenLoad && <ActivityIndicator style={styles.load} size="large" color="#000" />}
      {weatherData &&
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TextInput
                allowFontScaling={false}
                placeholder="Digite uma cidade"
                style={styles.inputCep}
                placeholderTextColor="#FFF"
                keyboardAppearance="dark"
                onChangeText={(text) => handleCity(text)}
                autoCompleteType="off"
              />
              <TouchableOpacity
                style={styles.refresh}
                onPress={() => loadWeather(location)}
              >
                <Image
                  style={styles.refresh}
                  source={require("../../../assets/images/icons/refresh.png")}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <ScrollView style={styles.scrollPage}>
            <Image source={{ uri: icon }} style={styles.icon} />
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.graus}>
              {parseInt(weatherData.main.temp - 273.15)}º
            </Text>
            <Text style={styles.desc}>
              {weatherData.weather[0].description}
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollCards}
            >
              <DetailWeather
                title="Máxima"
                desc={parseInt(weatherData.main.temp_max - 273.15) + "º"}
              />
              <DetailWeather
                title="Mínima"
                desc={parseInt(weatherData.main.temp_min - 273.15) + "º"}
              />
              <DetailWeather
                title="Humidade"
                desc={weatherData.main.humidity + "%"}
              />
              <DetailWeather title="Pressão" desc={weatherData.main.pressure} />
              <DetailWeather
                title="Ventos km/h"
                desc={weatherData.wind.speed}
              />
              <DetailWeather
                title="Nuvens"
                desc={weatherData.clouds.all + "%"}
              />
              <View style={{ width: 25 }} />
            </ScrollView>

            <MapView
              style={styles.mapStyle}
              region={{
                latitude: parseFloat(weatherData.coord.lat),
                longitude: parseFloat(weatherData.coord.lon),
                latitudeDelta: 0.011,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(weatherData.coord.lat),
                  longitude: parseFloat(weatherData.coord.lon),
                }}
                title={weatherData.name}
                image={require("../../../assets/images/icons/pin.png")}
              />
            </MapView>
          </ScrollView>
        </View>
      }
    </>
  );
}

export default App;
