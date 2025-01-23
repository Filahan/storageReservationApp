import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StorageContext } from "../context/StorageContext";
import StorageModal from "./StorageModal";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import de l'icône

export default function ListingsScreen({ }) {
  const context = useContext(StorageContext);
  if (!context) return null;

  const { listings } = context;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(listings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (listing:any) => {
    setSelectedListing(listing);
    setModalVisible(true);
  };

  const handleSearch = (query:any) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(listings);
    } else {
      setFilteredData(
        listings.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche avec icône */}
      <View style={styles.searchView}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher une annonce..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredData}
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
  container: { flex: 1, padding: 10, backgroundColor:'white' },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 50,
  },
  card: { borderColor: "#D0D3D4", borderWidth:1, padding: 15, marginBottom: 10, borderRadius: 8, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold" },
  price: { color: "green", fontWeight: "bold" },
});
