import React from "react";
import { View, Image, Text } from "react-native";

import styles from "./styles";

const ErrorLocation = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ resizeMode: "contain", width: 225, height: 170 }}
        source={require("../../../assets/images/icons/error.png")}
      />
      <Text style={styles.errorTitle}>
        Sem permissão para acessar sua Localização.
      </Text>
      <Text style={styles.errorDescription}>
        Vá em configurações do App e conceda a permissão de uso da Localização o tempo todo.
      </Text>
    </View>
  );
};

export default ErrorLocation;
