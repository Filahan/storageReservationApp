import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StorageListing } from "../context/StorageContext"; // Importation du type depuis le contexte

interface StorageModalProps {
  visible: boolean;
  onClose: () => void;
  listing: StorageListing | null; // Utilisation du type du contexte
}

export default function StorageModal({ visible, onClose, listing }: StorageModalProps) {
  if (!listing) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: listing.img }} style={styles.modalImage} />
          <Text style={styles.modalTitle}>{listing.name}</Text>
          <Text style={styles.modalLocation}>{listing.location}</Text>
          <Text style={styles.modalPrice}>{listing.price}</Text>
          <Text style={styles.modalDates}>{listing.dates}</Text>
          <Text style={styles.modalRating}>
            <Ionicons name="star" size={16} color="#ea266d" /> {listing.rating} ({listing.reviews} reviews)
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Les styles restent identiques
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalLocation: {
    fontSize: 16,
    color: "#595a63",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#232425",
    marginBottom: 10,
  },
  modalDates: {
    fontSize: 16,
    color: "#595a63",
    marginBottom: 10,
  },
  modalRating: {
    fontSize: 16,
    color: "#232425",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#ea266d",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});