import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { TabNavigationContext } from '../context/TabNavigationContext';
import { RealmProvider } from '@realm/react';
import { WardrobeProvider } from '../context/WardrobeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import UpperAppbar from '../components/UpperAppbar';

import { Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn } from '../database/index';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useRoute: jest.fn(),
  };
});


describe('UpperAppbar', () => {
  const renderAppbar = (currentTabKey: string, routeName: string) => {
    (useRoute as jest.Mock).mockReturnValue({ name: routeName });

  const mockHeaderProps = {
    navigation: { navigate: jest.fn() },
    route: { name: 'Main', params: {} },
    options: {},
    back: undefined,
  };

    return render(
      <SafeAreaProvider>
      <RealmProvider schema={[Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn]}>
      <WardrobeProvider>
      <TabNavigationContext.Provider value={{ currentTabKey, setTabByKey: jest.fn() }}>
        <NavigationContainer>
          <UpperAppbar {...mockHeaderProps} />
        </NavigationContainer>
      </TabNavigationContext.Provider>
      </WardrobeProvider>
      </RealmProvider>
      </SafeAreaProvider>
    );
  };

  it('shows Welcome title for Home tab', () => {
    const { getByText } = renderAppbar('home', 'Main');
    expect(getByText('Welcome')).toBeTruthy();
  });

  it('shows Your Wardrobe for Wardrobe tab', () => {
    const { getByText } = renderAppbar('wardrobe', 'Main');
    expect(getByText('Your Wardrobe')).toBeTruthy();
  });

  it('shows Summary for Summary tab', () => {
    const { getByText } = renderAppbar('summary', 'Main');
    expect(getByText('Summary')).toBeTruthy();
  });

  it('shows fallback title for unknown tab', () => {
    const { getByText } = renderAppbar('unknown', 'Main');
    expect(getByText('Set{My}Style')).toBeTruthy();
  });
});
