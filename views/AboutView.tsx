import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { Text, Title, Divider, useTheme } from 'react-native-paper';

import { useTranslation } from 'react-i18next';

import { GITHUB } from '../constants/index';

export default function AboutView() {

  const { colors: themeColors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 , paddingBottom: 50, backgroundColor: themeColors.background }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{t('about_app:name')}</Title>
      <Text style={styles.tagline} variant="titleSmall">{t('about_app:aboutOneSentence')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.about} variant="bodyLarge">{t('about_app:name')}{t('about_app:about')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">{t('about_app:licenseTitle')}</Text>
      <Text style={styles.license}>{t('about_app:license')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">{t('about_app:versionTitle')}</Text>
      <Text>{t('about_app:version')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">{t('about_app:credits')}</Text>

      <Text style={styles.credits} variant="bodySmall">
        {t('about_app:hangerCredits')}
      </Text>

      <Text style={styles.credits} variant="bodySmall">
        {t('about_app:buildCredits')}
      </Text>

      <Divider style={styles.divider} />

      <Text style={styles.developer} variant="bodyMedium">{t('about_app:developer')}</Text>
      <Text variant="bodyMedium">{t('about_app:aboutDeveloper')}</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(GITHUB)}
      >
        {t('about_app:github')}
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
