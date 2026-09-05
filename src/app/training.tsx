import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrainingScreen() {
  const params = useLocalSearchParams();

  const name = String(params.name || "Athlete");
  const sport = String(params.sport || "Cricket");

  const speed = Number(params.speed || 0);
  const agility = Number(params.agility || 0);
  const strength = Number(params.strength || 0);
  const endurance = Number(params.endurance || 0);
  const accuracy = Number(params.accuracy || 0);

  const metrics = [
    { name: "Speed", value: speed, icon: "⚡" },
    { name: "Agility", value: agility, icon: "🏃" },
    { name: "Strength", value: strength, icon: "💪" },
    { name: "Endurance", value: endurance, icon: "❤️" },
    { name: "Accuracy", value: accuracy, icon: "🎯" },
  ];

  const weakest = [...metrics].sort((a, b) => a.value - b.value)[0];

  const getWorkout = (metric: string) => {
    switch (metric) {
      case "Speed":
        return [
          "Sprint Running – 6 × 30 meters",
          "High Knees – 3 × 30 seconds",
          "Acceleration Drill – 5 rounds",
          "Short Distance Sprint – 5 × 40 meters",
        ];

      case "Agility":
        return [
          "Shuttle Run – 5 rounds",
          "Cone Zig-Zag Drill – 4 rounds",
          "Lateral Movement – 3 × 30 seconds",
          "Quick Feet Drill – 4 rounds",
        ];

      case "Strength":
        return [
          "Squats – 3 × 15 reps",
          "Push-ups – 3 × 12 reps",
          "Lunges – 3 × 12 reps",
          "Plank – 3 × 30 seconds",
        ];

      case "Endurance":
        return [
          "Jogging – 15 minutes",
          "Jumping Jacks – 3 × 30 seconds",
          "Cycling – 20 minutes",
          "Burpees – 3 × 10 reps",
        ];

      case "Accuracy":
        return [
          "Target Practice – 15 minutes",
          "Precision Drill – 4 rounds",
          "Target Throwing – 20 attempts",
          "Controlled Movement Drill – 10 minutes",
        ];

      default:
        return [];
    }
  };

  const workouts = getWorkout(weakest.name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.logo}>SPORTIQ</Text>

          <Text style={styles.heading}>Personalized Training</Text>

          <Text style={styles.subtitle}>
            Training plan based on your assessment
          </Text>

          {/* Athlete Card */}

          <View style={styles.athleteCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.athleteInfo}>
              <Text style={styles.name}>{name}</Text>

              <Text style={styles.details}>{sport} Athlete</Text>
            </View>

            <Text style={styles.dumbbell}>💪</Text>
          </View>

          {/* Focus Area */}

          <View style={styles.focusCard}>
            <Text style={styles.focusSmall}>PRIMARY FOCUS AREA</Text>

            <View style={styles.focusRow}>
              <Text style={styles.focusIcon}>{weakest.icon}</Text>

              <View style={styles.focusInfo}>
                <Text style={styles.focusTitle}>{weakest.name}</Text>

                <Text style={styles.focusScore}>
                  Current Score: {weakest.value.toFixed(0)}%
                </Text>
              </View>
            </View>

            <Text style={styles.focusDescription}>
              Your {weakest.name.toLowerCase()} score is your weakest
              performance area. Improving this skill can help increase your
              overall athletic performance.
            </Text>
          </View>

          {/* Training Plan */}

          <Text style={styles.sectionTitle}>Recommended Training Plan</Text>

          <View style={styles.planCard}>
            {workouts.map((workout, index) => (
              <View key={index} style={styles.workoutItem}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>

                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>{workout}</Text>

                  <Text style={styles.workoutSubtitle}>
                    Focus on proper form and controlled movement
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Weekly Plan */}

          <Text style={styles.sectionTitle}>Weekly Training Guide</Text>

          <View style={styles.weekCard}>
            <View style={styles.dayRow}>
              <Text style={styles.day}>MON</Text>
              <Text style={styles.dayWorkout}>{weakest.name} Training</Text>
            </View>

            <View style={styles.dayRow}>
              <Text style={styles.day}>TUE</Text>
              <Text style={styles.dayWorkout}>Light Cardio</Text>
            </View>

            <View style={styles.dayRow}>
              <Text style={styles.day}>WED</Text>
              <Text style={styles.dayWorkout}>{weakest.name} Training</Text>
            </View>

            <View style={styles.dayRow}>
              <Text style={styles.day}>THU</Text>
              <Text style={styles.dayWorkout}>Rest & Recovery</Text>
            </View>

            <View style={styles.dayRow}>
              <Text style={styles.day}>FRI</Text>
              <Text style={styles.dayWorkout}>{weakest.name} Training</Text>
            </View>

            <View style={styles.dayRow}>
              <Text style={styles.day}>SAT</Text>
              <Text style={styles.dayWorkout}>Full Body Training</Text>
            </View>

            <View style={styles.dayRow}>
              <Text style={styles.day}>SUN</Text>
              <Text style={styles.dayWorkout}>Rest & Recovery</Text>
            </View>
          </View>

          {/* Important Tip */}

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>

            <View style={styles.tipInfo}>
              <Text style={styles.tipTitle}>Training Tip</Text>

              <Text style={styles.tipText}>
                Stay consistent with your training. Focus on your weaker areas
                while maintaining your strongest skills.
              </Text>
            </View>
          </View>

          {/* Buttons */}

          <TouchableOpacity
            style={styles.resultButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.resultButtonText}>← BACK TO RESULT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => router.push("/history")}
            activeOpacity={0.8}
          >
            <Text style={styles.historyButtonText}>
              VIEW ASSESSMENT HISTORY
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Train smart. Improve consistently. Achieve more. 🚀
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
    textAlign: "center",
    fontSize: 26,
    fontWeight: "900",
    color: "#2563EB",
    letterSpacing: 3,
    marginBottom: 8,
  },

  heading: {
    textAlign: "center",
    fontSize: 27,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },

  athleteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "900",
  },

  athleteInfo: {
    flex: 1,
    marginLeft: 13,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  details: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 3,
  },

  dumbbell: {
    fontSize: 30,
  },

  focusCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
  },

  focusSmall: {
    color: "#DBEAFE",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  focusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  focusIcon: {
    fontSize: 38,
  },

  focusInfo: {
    marginLeft: 12,
  },

  focusTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },

  focusScore: {
    color: "#DBEAFE",
    fontSize: 13,
    marginTop: 2,
  },

  focusDescription: {
    color: "#DBEAFE",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  numberText: {
    color: "#2563EB",
    fontWeight: "900",
  },

  workoutInfo: {
    flex: 1,
    marginLeft: 12,
  },

  workoutTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },

  workoutSubtitle: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
  },

  weekCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  day: {
    width: 45,
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "900",
  },

  dayWorkout: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },

  tipCard: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    marginBottom: 20,
  },

  tipIcon: {
    fontSize: 25,
  },

  tipInfo: {
    flex: 1,
    marginLeft: 10,
  },

  tipTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "900",
  },

  tipText: {
    color: "#475569",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  resultButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  resultButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  historyButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  historyButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "900",
  },

  footer: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 20,
  },
});
