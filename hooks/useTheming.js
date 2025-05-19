// hooks/useTheming.js
import { useColorScheme } from 'react-native';

export function useTheming() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#000000' : '#0f172a',
    card: isDark ? '#0f172a' : '#1e293b',
    text: 'white',
    border: '#334155',
    primaryButton: 'white',
    primaryButtonText: 'black',
    secondaryButton: 'transparent',
    secondaryButtonText: 'white',
    muted: '#94a3b8',
    code: {
      background: '#111827',
      text: '#e2e8f0',
      border: '#334155'
    }
  };

  return {
    isDark,
    colors,
    resolveColor: (lightColor, darkColor) => isDark ? darkColor : lightColor,
  };
}