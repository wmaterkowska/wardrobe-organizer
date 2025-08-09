import React from 'react';
import { render } from '@testing-library/react-native';

import '../i18n/i18n';
import i18n from '../i18n/i18n';

import { Text } from 'react-native-paper';
import InsightCard from '../components/InsightCard';


describe('itemsInWardrobe Insight Card', () => {
  it('renders correctly english with count = 1', () => {
    i18n.changeLanguage('en');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={1}/>
    );
    expect(getByText('You have 1 piece in your wardrobe.')).toBeTruthy();
  });

  it('renders correctly english with count = 5', () => {
    i18n.changeLanguage('en');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={5} />
    );
    expect(getByText('You have 5 pieces in your wardrobe.')).toBeTruthy();
  });

  it('renders correctly polish with count = 1', () => {
    i18n.changeLanguage('pl');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={1}/>
    );
    expect(getByText('Masz 1 przedmiot w swojej szafie.')).toBeTruthy();
  });

  it('renders correctly polish with count = 2', () => {
    i18n.changeLanguage('pl');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={2} />
    );
    expect(getByText('Masz 2 przedmioty w swojej szafie.')).toBeTruthy();
  });

  it('renders correctly polish with count = 5', () => {
    i18n.changeLanguage('pl');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={5}/>
    );
    expect(getByText('Masz 5 przedmiotów w swojej szafie.')).toBeTruthy();
  });

  it('renders correctly polish with count = 22', () => {
    i18n.changeLanguage('pl');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={22} />
    );
    expect(getByText('Masz 22 przedmioty w swojej szafie.')).toBeTruthy();
  });

  it('renders correctly polish with count = 25', () => {
    i18n.changeLanguage('pl');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={25}/>
    );
    expect(getByText('Masz 25 przedmiotów w swojej szafie.')).toBeTruthy();
  });

  it('renders correctly polish with count = 0', () => {
    i18n.changeLanguage('pl');
    const { getByText } = render(
      <InsightCard type={'itemsInWardrobe'} data={0} />
    );
    expect(getByText('Masz 0 przedmiotów w swojej szafie.')).toBeTruthy();
  });

});
