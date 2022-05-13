import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Widget from "./src/components/Widget";
import { theme } from "./src/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();
  });

  const onLayoutRootView = useCallback(async () => {
    // we hide the splash screen once we know the root view has already performed layout.
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Widget />
    </View>
  );
}
