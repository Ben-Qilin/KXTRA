import { create } from "zustand"
import axios from 'axios';
const apiUrl = process.env.REACT_URL_API;
export const PepitasStore = create((set, get) => ({
    institutions: [],
    packages: [],
    error: null,
    fetchAllInstitutions: async () => {
        try {
            const response = await axios.get(`${apiUrl}/institution`);
            set({ institutions: response.data });
          } catch (error) {
              set({error: 'Une erreur est survenue lors de la récuperation des etablissements '});
          }
    },
    fetchAllPackages: async () => {
        try {
            const response = await axios.get(`${apiUrl}/packages`);
            set({ packages: response.data });
            console.log(packages)
        } catch (error) {
            set({error: 'Une erreur est survenue lors de la récuperation des packages '});
        }
    }
}))