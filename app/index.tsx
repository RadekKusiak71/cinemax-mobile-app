import LinkButton from "@/components/link-button";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Index: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeHeader}>Cinemax</Text>
        <Text style={styles.welcomeText}>Find your favorite movies and book tickets.</Text>
      </View>

      <View style={styles.linksContainer}>
        <LinkButton href="/(auth)/login" title="Sign In" />
        <LinkButton href="/(auth)/register" title="Sign Up" />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  welcomeTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingInline: 12,
  },
  welcomeHeader: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  linksContainer: {
    gap: 12,
  },
});

export default Index;
