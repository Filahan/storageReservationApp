import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { StorageProvider } from "./context/StorageContext";
import ListingsScreen from "./screens/ListingsScreen/ListingsScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MessageScreen from "./screens/SettingsScreen";

export type RootTabParamList = {
  Listings: undefined;
  Map: undefined;
  Message: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const getIconName = (routeName: keyof RootTabParamList): any=> {
  const iconMap = {
    Listings: "home-outline",
    Map: "navigate-outline",
    Message: "chatbox-outline",
    Settings: "settings-outline",
  };
  return iconMap[routeName];
};

const screenOptions = ({ route }: { route: { name: keyof RootTabParamList } }) => ({
  tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
    <Ionicons 
      name={getIconName(route.name)} 
      size={size} 
      color={color} 
    />
  ),
  tabBarActiveTintColor: "#000000",
  tabBarInactiveTintColor: "#BDBDBD",
  headerStyle: {
    height: Platform.OS === 'ios' ? 44 : 40,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: "",
  tabBarStyle: {
    borderTopWidth: 0,
    elevation: 8,
    shadowOpacity: 0.1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    height: Platform.OS === 'ios' ? 80 : 60,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    marginBottom: Platform.OS === 'ios' ? 4 : 0,
  },
});

export default function App() {
  return (
    <StorageProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Listings" component={ListingsScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Message" component={MessageScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StorageProvider>
  );
}