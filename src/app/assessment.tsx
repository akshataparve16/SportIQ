import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SERVER_URL = "http://10.130.85.18:3000";

export default function AssessmentScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sport, setSport] = useState("Cricket");

  const [speed, setSpeed] = useState("");
  const [agility, setAgility] = useState("");
  const [strength, setStrength] = useState("");
  const [endurance, setEndurance] = useState("");
  const [accuracy, setAccuracy] = useState("");

  const [saving, setSaving] = useState(false);

  const analyzeTalent = async () => {
    // Prevent duplicate submission
    if (saving) return;

    // Check empty fields
    if (
      !name.trim() ||
      !age ||
      !speed ||
      !agility ||
      !strength ||
      !endurance ||
      !accuracy
    ) {
      Alert.alert("Missing Information", "Please fill all the fields.");
      return;
    }

    // Convert values to numbers
    const ageValue = Number(age);
    const speedValue = Number(speed);
    const agilityValue = Number(agility);
    const strengthValue = Number(strength);
    const enduranceValue = Number(endurance);
    const accuracyValue = Number(accuracy);

    // Validate age
    if (isNaN(ageValue) || ageValue <= 0 || ageValue > 100) {
      Alert.alert("Invalid Age", "Please enter a valid age.");
      return;
    }

    // Validate performance scores
    const values = [
      speedValue,
      agilityValue,
      strengthValue,
      enduranceValue,
      accuracyValue,
    ];

    if (values.some((value) => isNaN(value) || value < 0 || value > 100)) {
      Alert.alert(
        "Invalid Score",
        "All performance scores must be between 0 and 100.",
      );
      return;
    }

    // Calculate overall talent score
    const score =
      speedValue * 0.2 +
      agilityValue * 0.2 +
      strengthValue * 0.15 +
      enduranceValue * 0.2 +
      accuracyValue * 0.25;

    const finalScore = Number(score.toFixed(1));

    try {
      setSaving(true);

      console.log("================================");
      console.log("Sending assessment...");
      console.log("Server:", SERVER_URL);

      const response = await fetch(`${SERVER_URL}/assessment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          age: ageValue,
          sport: sport,
          speed: speedValue,
          agility: agilityValue,
          strength: strengthValue,
          endurance: enduranceValue,
          accuracy: accuracyValue,
          score: finalScore,
        }),
      });

      console.log("Server response status:", response.status);

      // Read response as text first
      const responseText = await response.text();

      console.log("Server response:", responseText);

      let data: any = {};

      // Convert response to JSON
      try {
        if (responseText) {
          data = JSON.parse(responseText);
        }
      } catch {
        console.log("Response is not valid JSON.");
      }

      // Backend error
      if (!response.ok) {
        throw new Error(
          data?.error || data?.message || `Server error: ${response.status}`,
        );
      }

      console.log("Assessment saved successfully!");
      console.log("================================");

      // Success message
      Alert.alert(
        "Assessment Saved! 🎉",
        `Athlete: ${name}\nSport: ${sport}\n\nOverall Talent Score: ${finalScore}/100`,
        [
          {
            text: "View Result",
            onPress: () => {
              router.push({
                pathname: "/result",
                params: {
                  name: name.trim(),
                  age: age,
                  sport: sport,
                  speed: speed,
                  agility: agility,
                  strength: strength,
                  endurance: endurance,
                  accuracy: accuracy,
                  score: finalScore.toString(),
                },
              });
            },
          },
        ],
      );
    } catch (error) {
      console.log("================================");
      console.log("SAVE ERROR:", error);
      console.log("================================");

      Alert.alert(
        "Connection Error",
        "Could not connect to the SportIQ server.\n\nPlease make sure the backend server is running and the IP address is correct.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Logo */}
          <Text style={styles.logo}>SPORTIQ</Text>

          {/* Heading */}
          <Text style={styles.heading}>Athlete Assessment</Text>

          <Text style={styles.subtitle}>Enter your performance details</Text>

          {/* Athlete Details */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Athlete Details</Text>

            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
              editable={!saving}
            />

            <Text style={styles.label}>Age</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              editable={!saving}
            />

            <Text style={styles.label}>Sport</Text>

            <View style={styles.sportRow}>
              {["Cricket", "Football", "Basketball"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.sportButton,
                    sport === item && styles.selectedSport,
                  ]}
                  onPress={() => setSport(item)}
                  disabled={saving}
                >
                  <Text
                    style={[
                      styles.sportText,
                      sport === item && styles.selectedSportText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Performance Metrics */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>

            {/* Speed */}
            <Text style={styles.label}>Speed (0 - 100)</Text>

            <TextInput
              style={styles.input}
              placeholder="Example: 85"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={speed}
              onChangeText={setSpeed}
              editable={!saving}
            />

            {/* Agility */}
            <Text style={styles.label}>Agility (0 - 100)</Text>

            <TextInput
              style={styles.input}
              placeholder="Example: 80"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={agility}
              onChangeText={setAgility}
              editable={!saving}
            />

            {/* Strength */}
            <Text style={styles.label}>Strength (0 - 100)</Text>

            <TextInput
              style={styles.input}
              placeholder="Example: 75"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={strength}
              onChangeText={setStrength}
              editable={!saving}
            />

            {/* Endurance */}
            <Text style={styles.label}>Endurance (0 - 100)</Text>

            <TextInput
              style={styles.input}
              placeholder="Example: 85"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={endurance}
              onChangeText={setEndurance}
              editable={!saving}
            />

            {/* Accuracy */}
            <Text style={styles.label}>Accuracy (0 - 100)</Text>

            <TextInput
              style={styles.input}
              placeholder="Example: 90"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={accuracy}
              onChangeText={setAccuracy}
              editable={!saving}
            />
          </View>

          {/* Analyze Button */}
          <TouchableOpacity
            style={[styles.analyzeButton, saving && styles.disabledButton]}
            onPress={analyzeTalent}
            activeOpacity={0.8}
            disabled={saving}
          >
            <Text style={styles.analyzeText}>
              {saving ? "SAVING ASSESSMENT..." : "ANALYZE MY TALENT"}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Your performance data will be analyzed by SportIQ.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2563EB",
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },

  sportRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },

  sportButton: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },

  selectedSport: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  sportText: {
    color: "#334155",
    fontWeight: "600",
  },

  selectedSportText: {
    color: "#FFFFFF",
  },

  analyzeButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    elevation: 3,
  },

  disabledButton: {
    backgroundColor: "#93C5FD",
  },

  analyzeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  footer: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 18,
    lineHeight: 18,
  },
});
