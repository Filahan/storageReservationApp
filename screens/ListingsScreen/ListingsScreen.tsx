import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StorageContext } from "../../context/StorageContext";
import StorageModal from "../StorageModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

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

// Type pour le contexte
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
      filtered = filtered.filter((item: StorageListing) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (date) {
      const selected = new Date(date);
      filtered = filtered.filter((item: StorageListing) => {
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

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

  const handleSave = useCallback(
    (id: number) => {
      if (saved.includes(id)) {
        setSaved(saved.filter((val) => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerAction} />
          <View style={styles.headerAction}>
            <TouchableOpacity onPress={() => {}}>
              <FeatherIcon color="#000" name="sliders" size={21} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerTitle}>Places to stay</Text>
      </View>

      <View style={styles.searchView}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher une annonce..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <Ionicons name="calendar-outline" size={24} color="#888" style={styles.calendarIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredData.map((item: StorageListing) => {
          const isSaved = saved.includes(item.id);

          return (
            <TouchableOpacity key={item.id} onPress={() => openModal(item)}>
              <View style={styles.card}>
                <View style={styles.cardSaveWrapper}>
                  <TouchableOpacity onPress={() => handleSave(item.id)}>
                    <View style={styles.cardSave}>
                      <FontAwesome
                        color={isSaved ? "#ea266d" : "#222"}
                        name="bookmark"
                        solid={isSaved}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <Image source={{ uri: item.img }} style={styles.cardImg} />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={styles.cardHeader}>
                    <FontAwesome name="star" color="#ea266d" size={12} />
                    <Text style={styles.cardStars}>{item.rating}</Text>
                    <Text style={styles.cardReviews}>({item.reviews} reviews)</Text>
                  </View>
                  <Text style={styles.cardDates}>{item.dates}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <StorageModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        listing={selectedListing} 
      />
      <StorageModal visible={modalVisible} onClose={() => setModalVisible(false)} listing={selectedListing} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 16,
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
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardSaveWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardSave: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#232425",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  cardStars: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#232425",
  },
  cardReviews: {
    marginLeft: 4,
    fontSize: 14,
    color: "#595a63",
  },
  cardDates: {
    marginTop: 4,
    fontSize: 14,
    color: "#595a63",
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#232425",
  },
});