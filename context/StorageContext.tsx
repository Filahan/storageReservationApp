import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as Location from "expo-location";

// Définition du type pour les annonces
interface StorageListing {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
}

// Type du contexte
interface StorageContextType {
  listings: StorageListing[];
  userLocation: Location.LocationObjectCoords | null;
}

// Création du contexte
export const StorageContext = createContext<StorageContextType | undefined>(undefined);

// Fournisseur du contexte
export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [listings] = useState<StorageListing[]>([
    { id: 1, name: "Garage sécurisé", location: "Paris, France", latitude: 48.8566, longitude: 2.3522, price: "50€/mois" },
    { id: 2, name: "Cave spacieuse", location: "Lyon, France", latitude: 45.764, longitude: 4.8357, price: "40€/mois" },
    { id: 3, name: "Box privé", location: "Marseille, France", latitude: 43.2965, longitude: 5.3698, price: "60€/mois" },
  ]);

  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);

  // Obtenir la localisation de l'utilisateur
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <StorageContext.Provider value={{ listings, userLocation }}>
      {children}
    </StorageContext.Provider>
  );
};
