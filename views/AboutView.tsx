import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { Text, Title, Divider } from 'react-native-paper';
import { Strings } from '../constants/appStrings';

export default function AboutView() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{Strings.appName}</Title>
      <Text style={styles.tagline}>{Strings.aboutOneSentence}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.about}>{Strings.appName}{Strings.about}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>License</Text>
      <Text style={styles.license}>{Strings.license}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Version</Text>
      <Text>v1.0.0</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Credits</Text>

      <Text style={styles.credits}>
        • App icon includes a hanger vector from the "Simple Line Vectors" collection by Nishanth Kunder,
        licensed under the Creative Commons Attribution (CC BY 4.0) license. Source: svg-repo.com
      </Text>

      <Text style={styles.credits}>
        • Color palette inspired by design references from Pinterest (TBD - exact references will be noted here in the final release).
      </Text>

      <Text style={styles.credits}>
        • Built using open-source tools including React Native, Realm, and React Native Paper.
      </Text>

      <Divider style={styles.divider} />

      <Text>{Strings.developer}</Text>
      <Text>{Strings.aboutDeveloper}</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://github.com/wmaterkowska/wardrobe-organizer')}
      >
        github.com/wmaterkowska/wardrobe-organizer
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  tagline: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  about: {
    fontSize: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  license: {
    fontSize: 14,
  },
  link: {
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  credits: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  divider: {
    marginVertical: 8,
  },
});
