import BottomSheet from "@gorhom/bottom-sheet";
import { ChatTeardropDots } from "phosphor-react-native";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { theme } from "../../theme";
import Options from "../Options";
import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import Form from "../Form";
import { Success } from "../Success";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = () => bottomSheetRef.current?.expand();

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  const handleFeedbackSent = () => {
    setFeedbackSent(true);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : feedbackType ? (
          <Form
            feedbackType={feedbackType}
            onFeedbackSent={handleFeedbackSent}
            onFeedbackCanceled={handleRestartFeedback}
          />
        ) : (
          <Options onFeedbackTypeChanged={setFeedbackType} />
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
