import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const DetailWeather = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.desc}>{props.desc}</Text>
    </View>
  );
};

export default DetailWeather;
