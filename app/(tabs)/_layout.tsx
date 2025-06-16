import { Tabs } from 'expo-router';
import { Wallet, ScanLine, Compass } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: false, // We'll handle labels manually
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused ? styles.iconWrapperFocused : styles.iconWrapperInactive]}>
              <Wallet color="#fff" size={20} strokeWidth={2} />
              <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive]}>
                Wallet
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused ? styles.iconWrapperFocused : styles.iconWrapperInactive]}>
              <ScanLine color="#fff" size={20} strokeWidth={2} />
              <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive]}>
                Scan
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused ? styles.iconWrapperFocused : styles.iconWrapperInactive]}>
              <Compass color="#fff" size={20} strokeWidth={2} />
              <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive]}>
                Discover
              </Text>
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
    paddingHorizontal: 8,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 60,
    backgroundColor: '#000',
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
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 60,
    minHeight: 56,
  },
  iconWrapperFocused: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  iconWrapperInactive: {
    backgroundColor: '#000',
    borderWidth: 0,
  },
  tabBarLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 11,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  tabBarLabelActive: {
    fontFamily: 'DMSans-Bold',
  },
});