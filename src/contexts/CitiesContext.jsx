import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    async function fetchCity() {
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (err) {
        alert('There was an error while loading city...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCity();
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
