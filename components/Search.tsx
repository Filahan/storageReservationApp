import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface SearchProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onDatePress: () => void;
}

export default function Search({
  searchQuery,
  onSearchChange,
  onDatePress,
}: SearchProps) {
  return (
    <View style={styles.header}>
      <View style={styles.searchView}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher une annonce..."
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        <TouchableOpacity onPress={onDatePress}>
          <Ionicons name="calendar-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
});