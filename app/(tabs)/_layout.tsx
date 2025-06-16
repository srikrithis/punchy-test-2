import { Tabs } from 'expo-router';
import { Wallet, ScanLine, Compass } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2D1B69',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarShowLabel: true,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#f1eee6', '#faefea']}
            locations={[0.7, 1]}
            style={StyleSheet.absoluteFillObject}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Wallet color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <ScanLine color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} strokeWidth={2} />
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
    left: 24,
    right: 24,
    width: 338,
    height: 72,
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBarLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 0,
  },
});