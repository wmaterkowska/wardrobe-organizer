import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Basic smoke test', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<Text>Hello world</Text>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
