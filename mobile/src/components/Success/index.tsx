import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";

import successImg from "../../assets/success.png";

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>Thanks for the feedback!</Text>

      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>I want to send another</Text>
      </TouchableOpacity>
    </View>
  );
}
