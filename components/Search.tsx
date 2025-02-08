// components/Search.tsx
import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Modal, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface SearchProps {
  onFilterApply: (filters: Filters) => void;
  onResetFilters: () => void;
}

export interface Filters {
  location: string;
  startDate?: Date;
  endDate?: Date;
  maxPrice?: string;
}

export default function Search({
  onFilterApply,
  onResetFilters,
}: SearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({ location: '', maxPrice: '' });
  const [datePickerType, setDatePickerType] = useState<'start' | 'end'>('start');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateConfirm = (date: Date) => {
    if (datePickerType === 'start') {
      setFilters(prev => ({ ...prev, startDate: date }));
    } else {
      setFilters(prev => ({ ...prev, endDate: date }));
    }
    setDatePickerVisible(false);
  };

  const applyFilters = () => {
    onFilterApply(filters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({ location: '', maxPrice: '' });
    onResetFilters();
    setShowFilters(false);
  };
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const startDateStr = formatDate(filters.startDate);
  const endDateStr = formatDate(filters.endDate);
  const dateRange = [startDateStr, endDateStr].filter(Boolean).join(' - ');
  const priceStr = filters.maxPrice ? `${filters.maxPrice}€` : '';
  const summaryParts = [];
  if (dateRange) summaryParts.push(dateRange);
  if (priceStr) summaryParts.push(priceStr);
  const summaryText = summaryParts.join(' • ');

  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => setShowFilters(true)}
        >
          <View style={styles.locationIconText}>
            <Ionicons name="location-sharp" size={18} color="#F4C95D" />
            <Text style={styles.locationText} numberOfLines={1}>
              {filters.location || 'Choisir un emplacement'}
            </Text>
          </View>
          {summaryText ? (
            <Text style={styles.filtersSummaryText} numberOfLines={1}>
              {summaryText}
            </Text>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options" size={24} color="#F4C95D" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}>
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
  <TouchableOpacity 
    style={styles.closeButton}
    onPress={() => setShowFilters(false)}
  >
    <Ionicons name="close" size={24} color="#666" />
  </TouchableOpacity>
  <Text style={styles.modalTitle}>Filtrer les résultats</Text>

            <Text style={styles.filterLabel}>Localisation</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez une ville"
              value={filters.location}
              onChangeText={text => setFilters(prev => ({ ...prev, location: text }))}
            />

            <Text style={styles.filterLabel}>Dates</Text>
            <View style={styles.dateRow}>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => {
                  setDatePickerType('start');
                  setDatePickerVisible(true);
                }}>
                <Text style={styles.dateText}>
                  {filters.startDate?.toLocaleDateString() || 'Début'}
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.dateSeparator}>-</Text>
              
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => {
                  setDatePickerType('end');
                  setDatePickerVisible(true);
                }}>
                <Text style={styles.dateText}>
                  {filters.endDate?.toLocaleDateString() || 'Fin'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>Prix maximum</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>€</Text>
              <TextInput
                style={[styles.input, styles.priceInput]}
                placeholder="Prix max"
                keyboardType="numeric"
                value={filters.maxPrice}
                onChangeText={text => setFilters(prev => ({ ...prev, maxPrice: text }))}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.resetButton]} onPress={resetFilters}>
                <Text style={styles.buttonText}>Réinitialiser</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.applyButton]} onPress={applyFilters}>
                <Text style={styles.buttonText}>Appliquer</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative', // Ajouté pour le positionnement absolu du bouton
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
    marginTop: 10, // Ajouté pour l'espacement sous le bouton close
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  locationButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  locationIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
    flexShrink: 1,
  },
  filtersSummaryText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  
  filterButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    },
  filterLabel: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    padding: 14,
  },
  dateText: {
    color: '#333',
    textAlign: 'center',
  },
  dateSeparator: {
    marginHorizontal: 8,
    color: '#666',
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  currencySymbol: {
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  priceInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#F8F8F8',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#F4C95D',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
});