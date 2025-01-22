import React from "react";
import { View, Text, Button, StyleSheet, Dimensions, ScrollView } from "react-native";
import Modal from "react-native-modal";

interface StorageModalProps {
  visible: boolean;
  onClose: () => void;
  listing: {
    name: string;
    location: string;
    price: string;
  } | null;
}

const StorageModal: React.FC<StorageModalProps> = ({ visible, onClose, listing }) => {
  if (!listing) return null; // Ne pas afficher si aucune annonce sélectionnée

  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{listing.name}</Text>
          <Button title="Fermer" onPress={onClose} />
        </View>

        <ScrollView style={styles.modalBody}>
          <Text>📍 {listing.location}</Text>
          <Text>💰 {listing.price}</Text>
          <Text style={styles.modalText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at magna auctor, pharetra quam id, fermentum justo.
            Duis tempor cursus risus, nec feugiat justo sagittis vel.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  modalContent: { backgroundColor: "white", height: height * 0.9, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  modalBody: { flex: 1 },
  modalText: { marginTop: 10, fontSize: 16, lineHeight: 24 },
});

export default StorageModal;
