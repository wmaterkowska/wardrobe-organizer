import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { Text, Title, Divider, useTheme } from 'react-native-paper';

import i18n from '../i18n/i18n';

import { useTranslation } from 'react-i18next';

export default function AboutView() {

  const { colors: themeColors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 , paddingBottom: 50, backgroundColor: themeColors.background }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{t('about_view.name')}</Title>
      <Text style={styles.tagline} variant="titleSmall">{t('about_view.aboutOneSentence')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.about} variant="bodyLarge">{t('about_view.name')}{t('about_view.about')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">{t('about_view.licenseTitle')}</Text>
      <Text style={styles.license}>{t('about_view.license')}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">{t('about_view.versionTitle')}</Text>
      <Text>v1.0.0</Text>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle} variant="titleSmall">{t('about_view.credits')}</Text>

      <Text style={styles.credits} variant="bodySmall">
        {t('about_view.hangerCredits')}
      </Text>

      <Text style={styles.credits} variant="bodySmall">
        {t('about_view.buildCredits')}
      </Text>

      <Divider style={styles.divider} />

      <Text style={styles.developer} variant="bodyMedium">{t('about_view.developer')}</Text>
      <Text variant="bodyMedium">{t('about_view.aboutDeveloper')}</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://github.com/wmaterkowska/wardrobe-organizer')}
      >
        {t('about_view.github')}
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
