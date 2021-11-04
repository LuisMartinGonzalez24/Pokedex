import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface FocusAwareStatusBar extends StatusBarProps { }

export const FocusAwareStatusBar = (props: FocusAwareStatusBar) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}