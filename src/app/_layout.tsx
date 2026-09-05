import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="assessment"
          options={{
            title: "Athlete Assessment",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="explore"
          options={{
            title: "Explore",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
