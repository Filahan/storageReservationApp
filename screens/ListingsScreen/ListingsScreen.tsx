import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StorageContext } from "../../context/StorageContext";
import StorageModal from "../StorageModal";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Search from "../../components/Search";

export interface StorageListing {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
  date: string;
  img: string;
  dates: string;
  rating: number;
  reviews: number;
}

interface StorageContextType {
  listings: StorageListing[];
}

export default function ListingsScreen() {
  const context = useContext(StorageContext) as unknown as StorageContextType;
  const { listings } = context;
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<StorageListing[]>(listings);
  const [selectedListing, setSelectedListing] = useState<StorageListing | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [saved, setSaved] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "list" ? "map" : "list"));
  }, []);

  const openModal = (listing: StorageListing) => {
    setSelectedListing(listing);
    setModalVisible(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterData(query, selectedDate);
  };

  const filterData = (query: string, date: string) => {
    let filtered = listings;

    if (query.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (date) {
      const selected = new Date(date);
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === selected.toDateString();
      });
    }

    setFilteredData(filtered);
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date.toISOString());
    setDatePickerVisible(false);
    filterData(searchQuery, date.toISOString());
  };

  const handleSave = useCallback(
    (id: number) => {
      setSaved((prev) => 
        prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]
      );
    },
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Search
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onDatePress={() => setDatePickerVisible(true)}
      />

      {viewMode === "list" ? (
        <ScrollView contentContainerStyle={styles.content}>
          {filteredData.map((item) => {
            const isSaved = saved.includes(item.id);
            return (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => openModal(item)}
                activeOpacity={0.9}
              >
                <View style={styles.card}>
                  <View style={styles.cardSaveWrapper}>
                    <TouchableOpacity onPress={() => handleSave(item.id)}>
                      <View style={styles.cardSave}>
                        <Ionicons
                          color={isSaved ? "#ea266d" : "#666"}
                          name={isSaved ? "bookmark" : "bookmark-outline"}
                          size={24}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: item.img }} style={styles.cardImg} />
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <View style={styles.ratingContainer}>
                        <FontAwesome name="star" color="#ea266d" size={12} />
                        <Text style={styles.cardStars}>{item.rating}</Text>
                        <Text style={styles.cardReviews}>({item.reviews})</Text>
                      </View>
                    </View>
                    <Text style={styles.cardDates}>{item.dates}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.8566,
            longitude: 2.3522,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
        >
          {filteredData.map((item) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={() => openModal(item)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerPrice}>{item.price}</Text>
                <View style={styles.markerArrow} />
              </View>
            </Marker>
          ))}
        </MapView>
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={toggleViewMode}>
        <FeatherIcon
          name={viewMode === "list" ? "map" : "list"}
          size={21}
          color="#fff"
        />
      </TouchableOpacity>

      <StorageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        listing={selectedListing}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSaveWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardSave: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1d1d1d",
    maxWidth: "70%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStars: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#1d1d1d",
  },
  cardReviews: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  cardDates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2a2a2a",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#F4C95D",
    width: 47,
    height: 47,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  marker: {
    alignItems: "center",
  },
  markerPrice: {
    backgroundColor: "#ea266d",
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontWeight: "700",
    fontSize: 14,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ea266d",
    transform: [{ rotate: "180deg" }],
    marginTop: -2,
  },
});