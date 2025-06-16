import { Tabs } from 'expo-router';
import { Wallet, ScanLine, Compass } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
        tabBarShowLabel: false, // We'll handle labels manually
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <View style={[styles.navItem, focused && styles.navItemActive]}>
                <Wallet 
                  color={focused ? '#ffffff' : '#000000'} 
                  size={24} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.navItemText, 
                  { color: focused ? '#ffffff' : '#000000' }
                ]}>
                  Wallet
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <View style={[styles.navItem, focused && styles.navItemActive]}>
                <ScanLine 
                  color={focused ? '#ffffff' : '#000000'} 
                  size={24} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.navItemText, 
                  { color: focused ? '#ffffff' : '#000000' }
                ]}>
                  Scan
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <View style={[styles.navItem, focused && styles.navItemActive]}>
                <Compass 
                  color={focused ? '#ffffff' : '#000000'} 
                  size={24} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.navItemText, 
                  { color: focused ? '#ffffff' : '#000000' }
                ]}>
                  Discover
                </Text>
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
    paddingHorizontal: 0,
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
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 107,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    gap: 4, // Even spacing between icon and text
  },
  navItemActive: {
    backgroundColor: '#1a1a1a', // Dark grey instead of pure black
  },
  navItemText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});