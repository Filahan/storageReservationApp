import React, { useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StorageContext } from "../context/StorageContext";

export default function MapScreen() {
  const context = useContext(StorageContext);
  if (!context) return null;
  
  const { listings, userLocation } = context;

  if (!userLocation) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
    >
      {/* <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} title="Votre" pinColor="blue" /> */}
      {listings.map((storage) => (
        <Marker key={storage.id} coordinate={{ latitude: storage.latitude, longitude: storage.longitude }} title={storage.name} />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
