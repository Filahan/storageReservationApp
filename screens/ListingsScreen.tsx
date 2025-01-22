import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { StorageContext } from "../context/StorageContext";
import StorageModal from "./StorageModal"; // Import du modal

export default function ListingsScreen() {
  const context = useContext(StorageContext);
  if (!context) return null;

  const { listings } = context;
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (listing:any) => {
    setSelectedListing(listing);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.location}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Appel du modal */}
      <StorageModal visible={modalVisible} onClose={() => setModalVisible(false)} listing={selectedListing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f9f9f9" },
  card: { backgroundColor: "white", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold" },
  price: { color: "green", fontWeight: "bold" },
});

