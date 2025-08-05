import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { Text, Title, Divider, useTheme } from 'react-native-paper';
import { Strings } from '../constants/appStrings';

export default function AboutView() {

  const { colors: themeColors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 , paddingBottom: 50, backgroundColor: themeColors.background }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{Strings.appName}</Title>
      <Text style={styles.tagline} variant="titleSmall">{Strings.aboutOneSentence}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.about} variant="bodyLarge">{Strings.appName}{Strings.about}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">License</Text>
      <Text style={styles.license}>{Strings.license}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">Version</Text>
      <Text>v1.0.0</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">Credits</Text>

      <Text style={styles.credits} variant="bodySmall">
        • App icon includes a hanger vector from the "Simple Line Vectors" collection by Nishanth Kunder,
        licensed under the Creative Commons Attribution (CC BY 4.0) license. Source: svg-repo.com
      </Text>

      <Text style={styles.credits} variant="bodySmall">
        • Color palette inspired by design references from Pinterest (TBD - exact references will be noted here in the final release).
      </Text>

      <Text style={styles.credits} variant="bodySmall">
        • Built using open-source tools including React Native, Realm, and React Native Paper.
      </Text>

      <Divider style={styles.divider} />

      <Text style={styles.developer} variant="bodyMedium">{Strings.developer}</Text>
      <Text variant="bodyMedium">{Strings.aboutDeveloper}</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://github.com/wmaterkowska/wardrobe-organizer')}
      >
        github.com/wmaterkowska/wardrobe-organizer
      </Text>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
  },
  tagline: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  about: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  license: {
  },
  link: {
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  credits: {
    marginTop: 4,
    lineHeight: 18,
  },
  developer: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
});
