import { View, StyleSheet, Platform } from 'react-native';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';

export function GlassBottomNav({ children }) {
  const canUseGlass =
    Platform.OS === 'ios' && isGlassEffectAPIAvailable();

  if (!canUseGlass) {
    // Fallback for Android / unsupported iOS
    return <View style={styles.fallback}>{children}</View>;
  }

  return (
    <GlassView
      glassEffectStyle="regular"
      isInteractive
      style={styles.glass}
    >
      {children}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  glass: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 88, // iOS-style tab bar height
    paddingBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  fallback: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 88,
    paddingBottom: 20,

    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
