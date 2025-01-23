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
  Message: undefined;
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
              let iconName: keyof typeof Ionicons.glyphMap =
                route.name === "Listings"
                  ? "home-outline"
                  : route.name === "Map"
                  ? "navigate-outline"
                  : route.name === "Message"
                  ? "chatbox-outline"
                  : "settings-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#00000",
            tabBarInactiveTintColor: "#BDBDBD",
            // headerShown: false, // Supprime le header
            headerStyle: {
              height: 40, // Réduit la hauteur du header
              elevation: 0, // Supprime l'ombre (Android)
              shadowOpacity: 0, // Supprime l'ombre (iOS)
              borderBottomWidth: 0, // Supprime la bordure inférieure            
             }, // Ajustez la hauteur selon vos besoins
            // tabBarShowLabel: false, // Supprime les labels des onglets
            headerTitle: "", // Remove header title
          })}
        >
          <Tab.Screen name="Listings" component={ListingsScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Message" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StorageProvider>
  );
}
