import React, { createContext, useContext } from 'react';
import { TAB_ROUTE_KEYS } from '../navigation/tabRoutes';

type TabRouteKey = keyof typeof TAB_ROUTE_KEYS;

type TabContextType = {
  setTabByKey: (key: TabRouteKey) => void;
  currentTabKey: TabRouteKey;
};

export const TabNavigationContext = createContext<TabContextType | null>(null);

export const useTabNavigation = () => {
  const ctx = useContext(TabNavigationContext);
  if (!ctx) throw new Error('useTabNavigation must be used inside TabNavigationContext.Provider');
  return ctx;
};
