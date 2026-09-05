import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.logo}>SPORTIQ</Text>

          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeText}>
              <Text style={styles.smallText}>WELCOME TO</Text>

              <Text style={styles.welcomeTitle}>
                Your Sports{"\n"}Journey 🚀
              </Text>

              <Text style={styles.welcomeSubtitle}>
                Discover your talent and improve your performance.
              </Text>
            </View>

            <Text style={styles.trophy}>🏆</Text>
          </View>

          {/* Dashboard */}
          <Text style={styles.sectionTitle}>Your Sports Dashboard</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Metrics</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏋️</Text>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📈</Text>
              <Text style={styles.statNumber}>100</Text>
              <Text style={styles.statLabel}>Max Score</Text>
            </View>
          </View>

          {/* Get Started */}
          <Text style={styles.sectionTitle}>Get Started</Text>

          {/* Start Assessment */}
          <TouchableOpacity
            style={styles.assessmentCard}
            onPress={() => router.push("/assessment")}
          >
            <View style={styles.assessmentIconBox}>
              <Text style={styles.assessmentIcon}>🎯</Text>
            </View>

            <View style={styles.assessmentInfo}>
              <Text style={styles.assessmentTitle}>Start New Assessment</Text>

              <Text style={styles.assessmentText}>
                Measure your speed, agility, strength, endurance and accuracy.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Assessment History */}
          <TouchableOpacity
            style={styles.historyCard}
            onPress={() => router.push("/history")}
          >
            <View style={styles.historyIconBox}>
              <Text style={styles.historyIcon}>📊</Text>
            </View>

            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Assessment History</Text>

              <Text style={styles.historyText}>
                View your previously saved performance assessments.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Explore SportIQ */}
          <Text style={styles.sectionTitle}>Explore SportIQ</Text>

          {/* AI Analysis */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push("/assessment")}
          >
            <View style={styles.featureIconBox}>
              <Text style={styles.featureIcon}>🤖</Text>
            </View>

            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>AI Talent Analysis</Text>

              <Text style={styles.featureText}>
                Complete an assessment to get your AI-powered talent score and
                insights.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Training Plan */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push("/training")}
          >
            <View style={styles.featureIconBox}>
              <Text style={styles.featureIcon}>💪</Text>
            </View>

            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Training Plan</Text>

              <Text style={styles.featureText}>
                Follow structured workouts to improve your athletic abilities.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Performance Tracking */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push("/history")}
          >
            <View style={styles.featureIconBox}>
              <Text style={styles.featureIcon}>📈</Text>
            </View>

            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Performance Tracking</Text>

              <Text style={styles.featureText}>
                Track your athletic performance and work on your weak areas.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* How It Works */}
          <Text style={styles.sectionTitle}>How SportIQ Works</Text>

          <View style={styles.stepsCard}>
            {/* Step 1 */}
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>

              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>Assessment</Text>

                <Text style={styles.stepText}>
                  Enter your athletic performance details.
                </Text>
              </View>
            </View>

            <View style={styles.line} />

            {/* Step 2 */}
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>

              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>Analysis</Text>

                <Text style={styles.stepText}>
                  SportIQ calculates your talent score.
                </Text>
              </View>
            </View>

            <View style={styles.line} />

            {/* Step 3 */}
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>

              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>Improve</Text>

                <Text style={styles.stepText}>
                  Follow your personalized training plan.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Democratizing sports talent discovery
          </Text>

          <Text style={styles.version}>
            SportIQ • Athlete Performance Platform
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

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  logo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2563EB",
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 20,
  },

  welcomeCard: {
    backgroundColor: "#2563EB",
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  welcomeText: {
    flex: 1,
  },

  smallText: {
    color: "#DBEAFE",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    lineHeight: 34,
    marginTop: 5,
  },

  welcomeSubtitle: {
    color: "#DBEAFE",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },

  trophy: {
    fontSize: 55,
    marginLeft: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
    marginTop: 3,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  statIcon: {
    fontSize: 23,
  },

  statNumber: {
    fontSize: 21,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 5,
  },

  statLabel: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 2,
  },

  assessmentCard: {
    backgroundColor: "#2563EB",
    borderRadius: 18,
    padding: 17,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  assessmentIconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  assessmentIcon: {
    fontSize: 27,
  },

  assessmentInfo: {
    flex: 1,
    marginLeft: 13,
  },

  assessmentTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  assessmentText: {
    color: "#DBEAFE",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  historyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  historyIcon: {
    fontSize: 27,
  },

  historyInfo: {
    flex: 1,
    marginLeft: 13,
  },

  historyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  historyText: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
    color: "#2563EB",
    marginLeft: 5,
  },

  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  featureIcon: {
    fontSize: 24,
  },

  featureInfo: {
    flex: 1,
    marginLeft: 13,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  featureText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
    marginTop: 4,
  },

  stepsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  step: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  stepNumberText: {
    color: "#2563EB",
    fontWeight: "900",
    fontSize: 15,
  },

  stepInfo: {
    flex: 1,
    marginLeft: 13,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  stepText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
    marginTop: 3,
  },

  line: {
    height: 20,
    width: 2,
    backgroundColor: "#DBEAFE",
    marginLeft: 18,
    marginVertical: 5,
  },

  footer: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginTop: 25,
  },

  version: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 6,
  },
});
