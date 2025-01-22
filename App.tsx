import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { StorageProvider } from "./context/StorageContext";
import ListingsScreen from "./screens/ListingsScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";

export type RootTabParamList = {
  Listings: undefined;
  Map: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <StorageProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = route.name === "Listings" ? "search" : route.name === "Map" ? "map-outline" : "settings-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#00000",
            tabBarInactiveTintColor: "#BDBDBD",
          })}
        >
          <Tab.Screen name="Listings" component={ListingsScreen}     options={{ tabBarLabel: () => null }} />
          <Tab.Screen name="Map" component={MapScreen}     options={{ tabBarLabel: () => null }}/>        
          <Tab.Screen name="Settings" component={SettingsScreen}    options={{ tabBarLabel: () => null }}  // Enlever le label
 />
        </Tab.Navigator>
      </NavigationContainer>
    </StorageProvider>
  );
}
