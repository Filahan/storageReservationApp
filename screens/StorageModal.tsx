import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StorageListing } from "../context/StorageContext";

interface StorageModalProps {
  visible: boolean;
  onClose: () => void;
  listing: StorageListing | null;
}

export default function StorageModal({ visible, onClose, listing }: StorageModalProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  if (!listing) return null;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    setScrollPosition(currentScrollPosition);

    // Définir un seuil pour fermer le modal (par exemple, 50 pixels)
    if (currentScrollPosition < -80) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContent}>
          <View style={styles.handleIndicator}/>
          
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
          >
            <Image 
              source={{ uri: listing.img }} 
              style={styles.modalImage} 
              resizeMode="cover"
            />
            
            <View style={styles.infoSection}>
              <Text style={styles.modalTitle}>{listing.name}</Text>
              
              <View style={styles.locationSection}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.modalLocation}>{listing.location}</Text>
              </View>
              
              <View style={styles.priceRatingRow}>
                <Text style={styles.modalPrice}>{listing.price}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#fff" />
                  <Text style={styles.ratingText}>{listing.rating}</Text>
                  <Text style={styles.reviewsText}>({listing.reviews})</Text>
                </View>
              </View>
              
              <View style={styles.datesSection}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.modalDates}>{listing.dates}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '70%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  infoSection: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ea266d',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ea266d',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  ratingText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 2,
  },
  reviewsText: {
    color: '#ffd1e0',
    fontSize: 12,
  },
  datesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  modalDates: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
});