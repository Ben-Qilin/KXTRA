import { create } from 'zustand';
import axios from 'axios';
const apiUrl = process.env.REACT_URL_API;
export const ProviderPageStore = create((set, get) => ({
  institutions: [],
  error: null,
  
  fetchInstitutions: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/users_provider/${userId}/institutions`);
      set({ institutions: response.data });
      console.log(response.data)
    } catch (error) {
        set({error: 'Une erreur est survenue lors de la récuperation des etablissements '});
    }
  },
}));