import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StorageContext } from "../context/StorageContext";
import StorageModal from "./StorageModal";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import de l'icône
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import du sélecteur de date

export default function ListingsScreen({ }) {
  const context = useContext(StorageContext);
  if (!context) return null;

  const { listings } = context;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(listings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = (listing:any) => {
    setSelectedListing(listing);
    setModalVisible(true);
  };

  const handleSearch = (query:any) => {
    setSearchQuery(query);
    filterData(query, selectedDate);
  };

  const filterData = (query:any, date:any) => {
    let filtered = listings;

    // Filtrage par texte
    if (query.trim() !== "") {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    }

    // Filtrage par date
    if (date) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date); // Assurez-vous que chaque annonce ait une propriété 'date'
        return itemDate.toDateString() === date.toDateString(); // Compare uniquement la date (pas l'heure)
      });
    }

    setFilteredData(filtered);
  };

  const handleDateConfirm = (date:any) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
    filterData(searchQuery, date); // Refiltrer après avoir sélectionné la date
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
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
        {/* Bouton de calendrier */}
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <Ionicons name="calendar-outline" size={24} color="#888"  style={styles.calendarIcon} />
        </TouchableOpacity>
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

      {/* Sélecteur de date */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
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
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Ajout d'opacité au fond
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 0.1, // Supprime l'ombre (Android)
    shadowOpacity: 0.1, // Supprime l'ombre (iOS)
    opacity: 0.8, // Ajoute de l'opacité à l'ensemble du composant
  },
  
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 50,
  },
  calendarIcon: {
    marginLeft: 10,
  },
  card: { borderColor: "#D0D3D4", borderWidth:1, padding: 15, marginBottom: 10, borderRadius: 8, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold" },
  price: { color: "green", fontWeight: "bold" },
});
