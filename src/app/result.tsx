import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const name = String(params.name || "Athlete");
  const age = String(params.age || "0");
  const sport = String(params.sport || "Cricket");

  const speed = Number(params.speed || 0);
  const agility = Number(params.agility || 0);
  const strength = Number(params.strength || 0);
  const endurance = Number(params.endurance || 0);
  const accuracy = Number(params.accuracy || 0);

  const calculatedScore =
    speed * 0.2 +
    agility * 0.2 +
    strength * 0.15 +
    endurance * 0.2 +
    accuracy * 0.25;

  const score = Number(params.score || calculatedScore);

  const getLevel = (value: number) => {
    if (value >= 85) return "Excellent";
    if (value >= 70) return "Very Good";
    if (value >= 50) return "Good";
    return "Needs Improvement";
  };

  const getLevelColor = (value: number) => {
    if (value >= 85) return "#16A34A";
    if (value >= 70) return "#2563EB";
    if (value >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const metrics = [
    {
      name: "Speed",
      value: speed,
      icon: "⚡",
    },
    {
      name: "Agility",
      value: agility,
      icon: "🏃",
    },
    {
      name: "Strength",
      value: strength,
      icon: "💪",
    },
    {
      name: "Endurance",
      value: endurance,
      icon: "❤️",
    },
    {
      name: "Accuracy",
      value: accuracy,
      icon: "🎯",
    },
  ];

  const weakestMetric = [...metrics].sort((a, b) => a.value - b.value)[0];

  const strongestMetric = [...metrics].sort((a, b) => b.value - a.value)[0];

  const getOverallLevel = (value: number) => {
    if (value >= 85) return "HIGH POTENTIAL";
    if (value >= 70) return "STRONG POTENTIAL";
    if (value >= 50) return "DEVELOPING";
    return "BEGINNER";
  };

  const goToTraining = () => {
    router.push({
      pathname: "/training",
      params: {
        name,
        age,
        sport,
        speed: speed.toString(),
        agility: agility.toString(),
        strength: strength.toString(),
        endurance: endurance.toString(),
        accuracy: accuracy.toString(),
        score: score.toString(),
      },
    });
  };

  const goToHistory = () => {
    router.push("/history");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* HEADER */}

          <Text style={styles.logo}>SPORTIQ</Text>

          <Text style={styles.heading}>Assessment Result</Text>

          <Text style={styles.subtitle}>
            Your athletic performance analysis
          </Text>

          {/* ATHLETE CARD */}

          <View style={styles.athleteCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.athleteInfo}>
              <Text style={styles.athleteName}>{name}</Text>

              <Text style={styles.athleteDetails}>
                {sport} • Age {age}
              </Text>
            </View>

            <Text style={styles.trophy}>🏆</Text>
          </View>

          {/* OVERALL SCORE */}

          <View style={styles.scoreCard}>
            <Text style={styles.scoreSmallTitle}>OVERALL TALENT SCORE</Text>

            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>{score.toFixed(1)}</Text>

              <Text style={styles.scoreOutOf}>/ 100</Text>
            </View>

            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>
                {getOverallLevel(score)}
              </Text>
            </View>

            <Text style={styles.scoreDescription}>
              Your overall score is calculated using your speed, agility,
              strength, endurance and accuracy.
            </Text>
          </View>

          {/* PERFORMANCE METRICS */}

          <Text style={styles.sectionTitle}>Performance Metrics</Text>

          <View style={styles.metricsCard}>
            {metrics.map((metric) => {
              const percentage = Math.max(0, Math.min(100, metric.value));

              return (
                <View key={metric.name} style={styles.metricItem}>
                  <View style={styles.metricHeader}>
                    <View style={styles.metricNameRow}>
                      <Text style={styles.metricIcon}>{metric.icon}</Text>

                      <Text style={styles.metricName}>{metric.name}</Text>
                    </View>

                    <Text
                      style={[
                        styles.metricPercentage,
                        {
                          color: getLevelColor(metric.value),
                        },
                      ]}
                    >
                      {percentage.toFixed(0)}%
                    </Text>
                  </View>

                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${percentage}%`,
                          backgroundColor: getLevelColor(metric.value),
                        },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.metricLevel,
                      {
                        color: getLevelColor(metric.value),
                      },
                    ]}
                  >
                    {getLevel(metric.value)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* AI ANALYSIS */}

          <Text style={styles.sectionTitle}>AI Talent Analysis</Text>

          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <View style={styles.aiIconBox}>
                <Text style={styles.aiIcon}>🤖</Text>
              </View>

              <View style={styles.aiHeaderInfo}>
                <Text style={styles.aiTitle}>SportIQ Analysis</Text>

                <Text style={styles.aiSubtitle}>Based on your assessment</Text>
              </View>
            </View>

            <Text style={styles.aiText}>
              Your strongest area is{" "}
              <Text style={styles.boldText}>{strongestMetric.name}</Text> with a
              score of{" "}
              <Text style={styles.boldText}>
                {strongestMetric.value.toFixed(0)}%
              </Text>
              .
            </Text>

            <Text style={styles.aiText}>
              Your biggest opportunity for improvement is{" "}
              <Text style={styles.boldText}>{weakestMetric.name}</Text> with a
              score of{" "}
              <Text style={styles.boldText}>
                {weakestMetric.value.toFixed(0)}%
              </Text>
              .
            </Text>

            <View style={styles.tipBox}>
              <Text style={styles.tipIcon}>💡</Text>

              <Text style={styles.tipText}>
                Focus on improving your weaker areas while continuing to
                maintain your strongest skills.
              </Text>
            </View>
          </View>

          {/* QUICK SUMMARY */}

          <Text style={styles.sectionTitle}>Performance Summary</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⭐</Text>

              <Text style={styles.summaryValue}>{strongestMetric.name}</Text>

              <Text style={styles.summaryLabel}>Strongest Skill</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🎯</Text>

              <Text style={styles.summaryValue}>{weakestMetric.name}</Text>

              <Text style={styles.summaryLabel}>Focus Area</Text>
            </View>
          </View>

          {/* ACTION BUTTONS */}

          <TouchableOpacity
            style={styles.trainingButton}
            onPress={goToTraining}
            activeOpacity={0.8}
          >
            <Text style={styles.trainingButtonIcon}>💪</Text>

            <View style={styles.trainingButtonInfo}>
              <Text style={styles.trainingButtonTitle}>View Training Plan</Text>

              <Text style={styles.trainingButtonText}>
                Get personalized workouts for your weak areas
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.historyButton}
            onPress={goToHistory}
            activeOpacity={0.8}
          >
            <Text style={styles.historyButtonIcon}>📊</Text>

            <View style={styles.historyButtonInfo}>
              <Text style={styles.historyButtonTitle}>
                View Assessment History
              </Text>

              <Text style={styles.historyButtonText}>
                Track your performance over time
              </Text>
            </View>

            <Text style={styles.historyArrow}>›</Text>
          </TouchableOpacity>

          {/* FOOTER */}

          <Text style={styles.footer}>
            Keep training. Keep improving. Keep achieving. 🚀
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
    fontSize: 28,
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

  athleteName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  athleteDetails: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 3,
  },

  trophy: {
    fontSize: 30,
  },

  scoreCard: {
    backgroundColor: "#2563EB",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  scoreSmallTitle: {
    color: "#DBEAFE",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  scoreCircle: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  scoreNumber: {
    color: "#FFFFFF",
    fontSize: 55,
    fontWeight: "900",
  },

  scoreOutOf: {
    color: "#DBEAFE",
    fontSize: 14,
    marginTop: -7,
  },

  levelBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 12,
  },

  levelBadgeText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "900",
  },

  scoreDescription: {
    color: "#DBEAFE",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 13,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  metricsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  metricItem: {
    marginBottom: 17,
  },

  metricItemLast: {
    marginBottom: 0,
  },

  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  metricNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  metricIcon: {
    fontSize: 21,
    width: 30,
  },

  metricName: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
  },

  metricPercentage: {
    fontSize: 15,
    fontWeight: "900",
  },

  barBackground: {
    height: 9,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 9,
  },

  barFill: {
    height: 9,
    borderRadius: 10,
  },

  metricLevel: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 5,
  },

  aiCard: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },

  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  aiIconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  aiIcon: {
    fontSize: 27,
  },

  aiHeaderInfo: {
    marginLeft: 12,
  },

  aiTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },

  aiSubtitle: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2,
  },

  aiText: {
    color: "#334155",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 14,
  },

  boldText: {
    fontWeight: "900",
    color: "#2563EB",
  },

  tipBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  tipIcon: {
    fontSize: 22,
  },

  tipText: {
    flex: 1,
    color: "#475569",
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 9,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  summaryIcon: {
    fontSize: 25,
  },

  summaryValue: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 7,
  },

  summaryLabel: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
  },

  trainingButton: {
    backgroundColor: "#2563EB",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },

  trainingButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    overflow: "hidden",
  },

  trainingButtonInfo: {
    flex: 1,
    marginLeft: 12,
  },

  trainingButtonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  trainingButtonText: {
    color: "#DBEAFE",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 3,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 30,
    marginLeft: 5,
  },

  historyButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },

  historyButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    overflow: "hidden",
  },

  historyButtonInfo: {
    flex: 1,
    marginLeft: 12,
  },

  historyButtonTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "900",
  },

  historyButtonText: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 3,
  },

  historyArrow: {
    color: "#2563EB",
    fontSize: 30,
    marginLeft: 5,
  },

  footer: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginTop: 5,
  },

  version: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 6,
  },
});
