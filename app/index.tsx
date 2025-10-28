import LinkButton from "@/components/link-button";
import { theme } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Index: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="popcorn"
          size={100}
          color={theme.colors.textAccent}
        />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeHeader}>Cinemax</Text>
          <Text style={styles.welcomeSubText}>
            Discover movies and book your seats
          </Text>
        </View>
      </View>
      <View style={styles.linksContainer}>
        <LinkButton version="primary" href="/(auth)/register" title="Sign Up" />
        <LinkButton version="secondary" href="/(auth)/login" title="Sign In" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.l,
  },
  welcomeTextContainer: {
    alignItems: "center",
    gap: theme.spacing.s,
  },
  welcomeHeader: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.header,
    textAlign: "center",
    fontWeight: "bold",
  },
  welcomeSubText: {
    fontSize: theme.fontSizes.subHeader,
    textAlign: "center",
    color: theme.colors.textAccent,
  },
  linksContainer: {
    gap: theme.spacing.m,
    width: "100%",
    flexDirection: "column",
  },
});

export default Index;