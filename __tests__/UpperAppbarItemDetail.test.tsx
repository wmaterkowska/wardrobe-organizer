jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: jest.fn(),
  };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { TabNavigationContext } from '../context/TabNavigationContext';
import { RealmProvider } from '@realm/react';
import { WardrobeProvider } from '../context/WardrobeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import UpperAppbar from '../components/UpperAppbar';

import { Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn } from '../database/index';


jest.mock('@realm/react', () => {
  const actual = jest.requireActual('@realm/react');
  return {
    ...actual,
    useRealm: () => ({
      objectForPrimaryKey: () => ({
        item_name: 'Red Jacket',
      }),
    }),
    useQuery: () => [], // if needed
    RealmProvider: ({ children }: any) => children,
  };
});

const mockHeaderProps = {
  navigation: { navigate: jest.fn() },
  route: { name: 'ItemDetail', params: { itemId: 'abc123' } },
  options: {},
  back: undefined,
};


describe('UpperAppbarItemDetail', () => {
  it('shows item name in title for ItemDetail screen', () => {
    (useRoute as jest.Mock).mockReturnValue({
      name: 'ItemDetail',
      params: { itemId: 'abc123' },
    });

    const mockHeaderProps = {
      navigation: { navigate: jest.fn() },
      route: { name: 'ItemDetail', params: { itemId: 'abc123' } },
      options: {},
      back: undefined,
    };

    const { getByText } = render(
      <SafeAreaProvider>
      <RealmProvider schema={[Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn]}>
      <WardrobeProvider>
        <TabNavigationContext.Provider value={{ currentTabKey: 'wardrobe', setTabByKey: jest.fn() }}>
          <NavigationContainer>
            <UpperAppbar {...mockHeaderProps} />
          </NavigationContainer>
        </TabNavigationContext.Provider>
      </WardrobeProvider>
      </RealmProvider>
      </SafeAreaProvider>
    );

    expect(getByText('Red Jacket')).toBeTruthy();
  });
});


