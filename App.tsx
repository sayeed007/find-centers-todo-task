/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import MenuScreen from './src/screens/MenuScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import { StyleSheet } from 'react-native';
import BookingsScreen from './src/screens/BookingsScreen';
import { colors } from './src/utils/colors';

// Initialize React Query
const queryClient = new QueryClient();

// Create bottom tab navigator
const BottomBar = createBottomTabNavigator();

// Custom theme for React Native Paper
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <BottomBar.Navigator
              initialRouteName="Activities"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Bookings') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Activities') {
                    iconName = focused ? 'calendar-range' : 'calendar-range-outline';
                  } else if (route.name === 'Notifications') {
                    iconName = focused ? 'bell' : 'bell-outline';
                  } else if (route.name === 'Menu') {
                    iconName = focused ? 'cog' : 'cog-outline';
                  }

                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.brand,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
              })}>

              <BottomBar.Screen name="Bookings" component={BookingsScreen} />
              <BottomBar.Screen name="Activities" component={ActivitiesScreen} />
              <BottomBar.Screen name="Notifications" component={NotificationsScreen} />
              <BottomBar.Screen name="Menu" component={MenuScreen} />

            </BottomBar.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute', // To make it float a bit
    backgroundColor: '#ffffff', // Adjust the background color
    borderTopLeftRadius: 20, // Curved Top Left
    borderTopRightRadius: 20, // Curved Top Right
    height: 60, // Adjust height if needed
    borderTopWidth: 0, // Remove the default top border
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default App;