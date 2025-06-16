import { Tabs } from 'expo-router';
import { Wallet, ScanLine, Compass } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarShowLabel: true,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          <BlurView intensity={20} style={styles.blurContainer}>
            <View style={styles.backgroundContainer} />
          </BlurView>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Wallet color={color} size={size} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <View style={[styles.labelContainer, focused && styles.activeLabelContainer]}>
              <View style={styles.labelText}>
                {children}
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <ScanLine color={color} size={size} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <View style={[styles.labelContainer, focused && styles.activeLabelContainer]}>
              <View style={styles.labelText}>
                {children}
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Compass color={color} size={size} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <View style={[styles.labelContainer, focused && styles.activeLabelContainer]}>
              <View style={styles.labelText}>
                {children}
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: [{ translateX: -169 }], // Half of 338px width
    width: 338,
    height: 72,
    borderTopWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 12,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 60,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#dddddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  tabBarItem: {
    paddingTop: 8,
    paddingBottom: 8,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    overflow: 'hidden',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 60,
  },
  tabBarLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 48,
    minHeight: 32,
  },
  activeIconContainer: {
    backgroundColor: '#000000',
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 2,
  },
  activeLabelContainer: {
    backgroundColor: '#000000',
  },
  labelText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    color: 'inherit',
  },
});