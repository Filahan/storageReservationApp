import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as Location from "expo-location";

// Définition des types
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
  userLocation: Location.LocationObjectCoords | null;
}

interface StorageProviderProps {
  children: ReactNode;
}

// Création du contexte avec une valeur par défaut plus sûre
export const StorageContext = createContext<StorageContextType>({
  listings: [],
  userLocation: null,
});

export const StorageProvider = ({ children }: StorageProviderProps) => {
  const [listings] = useState<StorageListing[]>([
    {
      id: 1,
      name: "Garage sécurisé",
      location: "Paris, France",
      latitude: 48.8566,
      longitude: 2.3522,
      price: "50€/mois",
      date: "2023-10-01",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      dates: "Oct 1 - Oct 31",
      rating: 4.5,
      reviews: 124,
    },
    {
      id: 2,
      name: "Cave spacieuse",
      location: "Lyon, France",
      latitude: 45.764,
      longitude: 4.8357,
      price: "40€/mois",
      date: "2023-10-05",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      dates: "Oct 5 - Nov 5",
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: "Box privé",
      location: "Marseille, France",
      latitude: 43.2965,
      longitude: 5.3698,
      price: "60€/mois",
      date: "2023-10-10",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      dates: "Oct 10 - Nov 10",
      rating: 4.3,
      reviews: 72,
    },
  ]);
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permission de localisation refusée");
          return;
        }
        
        const currentLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(currentLocation.coords);
      } catch (error) {
        console.error("Erreur de localisation:", error);
      }
    };

    getLocation();
  }, []);

  return (
    <StorageContext.Provider value={{ listings, userLocation }}>
      {children}
    </StorageContext.Provider>
  );
};