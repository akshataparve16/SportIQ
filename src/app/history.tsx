import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// =====================================================
// SPORTIQ BACKEND URL
// =====================================================
const SERVER_URL = "http://10.67.254.113:3000";

// =====================================================
// ATHLETE TYPE
// =====================================================
type Athlete = {
  id: number;
  name: string;
  age: number;
  sport: string;
  speed: number;
  agility: number;
  strength: number;
  endurance: number;
  accuracy: number;
  score: number;
  created_at?: string;
};

// =====================================================
// HISTORY SCREEN
// =====================================================
export default function HistoryScreen() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ===================================================
  // FETCH HISTORY
  // ===================================================
  const fetchAthletes = async () => {
    try {
      console.log("================================");
      console.log("Fetching assessment history...");
      console.log("Server:", SERVER_URL);

      const response = await fetch(`${SERVER_URL}/athletes`);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      console.log("History received:", data);

      setAthletes(data);
    } catch (error) {
      console.error("HISTORY ERROR:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ===================================================
  // LOAD HISTORY WHEN SCREEN OPENS
  // ===================================================
  useFocusEffect(
    useCallback(() => {
      fetchAthletes();
    }, []),
  );

  // ===================================================
  // PULL TO REFRESH
  // ===================================================
  const onRefresh = () => {
    setRefreshing(true);
    fetchAthletes();
  };

  // ===================================================
  // LOADING
  // ===================================================
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading assessment history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ===================================================
  // MAIN SCREEN
  // ===================================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>SPORTIQ</Text>

          <Text style={styles.title}>Assessment History</Text>

          <Text style={styles.subtitle}>
            View your previous sports performance assessments
          </Text>
        </View>

        {/* EMPTY STATE */}
        {athletes.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No Assessments Yet</Text>

            <Text style={styles.emptyText}>
              Complete your first assessment to see your performance history
              here.
            </Text>
          </View>
        ) : (
          <>
            {/* TOTAL */}
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Total Assessments</Text>

              <Text style={styles.totalNumber}>{athletes.length}</Text>
            </View>

            {/* HISTORY CARDS */}
            {athletes.map((athlete, index) => (
              <View style={styles.card} key={athlete.id ?? index}>
                {/* CARD HEADER */}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.athleteName}>{athlete.name}</Text>

                    <Text style={styles.sport}>{athlete.sport}</Text>
                  </View>

                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreLabel}>Score</Text>

                    <Text style={styles.score}>{athlete.score}</Text>
                  </View>
                </View>

                {/* BASIC DETAILS */}
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Age</Text>
                    <Text style={styles.detailValue}>{athlete.age}</Text>
                  </View>
                </View>

                {/* PERFORMANCE */}
                <Text style={styles.performanceTitle}>Performance</Text>

                <View style={styles.metricsGrid}>
                  <Metric title="Speed" value={athlete.speed} />

                  <Metric title="Agility" value={athlete.agility} />

                  <Metric title="Strength" value={athlete.strength} />

                  <Metric title="Endurance" value={athlete.endurance} />

                  <Metric title="Accuracy" value={athlete.accuracy} />
                </View>

                {/* DATE */}
                {athlete.created_at && (
                  <Text style={styles.date}>
                    {new Date(athlete.created_at).toLocaleString()}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// =====================================================
// METRIC COMPONENT
// =====================================================
function Metric({ title, value }: { title: string; value: number }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>

      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // HEADER
  header: {
    marginBottom: 20,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    lineHeight: 20,
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#64748B",
  },

  // TOTAL CARD
  totalCard: {
    backgroundColor: "#2563EB",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },

  totalLabel: {
    color: "#DBEAFE",
    fontSize: 14,
    fontWeight: "600",
  },

  totalNumber: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 4,
  },

  // EMPTY
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
  },

  // HISTORY CARD
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  athleteName: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111827",
  },

  sport: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 4,
  },

  scoreBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
  },

  scoreLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },

  score: {
    fontSize: 22,
    color: "#2563EB",
    fontWeight: "800",
  },

  // DETAILS
  detailsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  detailItem: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 80,
  },

  detailLabel: {
    fontSize: 11,
    color: "#64748B",
  },

  detailValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },

  // PERFORMANCE
  performanceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  metricCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    minWidth: "30%",
    flexGrow: 1,
  },

  metricTitle: {
    fontSize: 11,
    color: "#64748B",
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563EB",
    marginTop: 3,
  },

  date: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 15,
  },
});
