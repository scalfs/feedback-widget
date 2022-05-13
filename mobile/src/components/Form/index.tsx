import { ArrowLeft } from "phosphor-react-native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import ScreenshotButton from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";

import * as FileSystem from "expo-file-system";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onFeedbackCanceled: () => void;
}

function Form({ feedbackType, onFeedbackSent, onFeedbackCanceled }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleScreenshot = () => {
    captureScreen({ format: "jpg", quality: 0.8 })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  };

  const handleScreenshotRemove = () => setScreenshot(null);

  const handleSendFeedback = async () => {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, {
        encoding: "base64",
      }));

    try {
      await api.post("/feedbacks", {
        comment,
        type: feedbackType,
        screenshot: screenshotBase64
          ? `data:image/png;base64, ${screenshotBase64}`
          : "",
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        autoCorrect={false}
        onChangeText={setComment}
        placeholder="Something is not working quite well? We want to fix it. Write in details what is happening..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />

        <Button
          disabled={!comment}
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}

export default Form;
