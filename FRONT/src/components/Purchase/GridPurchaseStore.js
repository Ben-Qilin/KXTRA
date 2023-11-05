import { create } from 'zustand';
import axios from 'axios';

const GridPurchaseStore = create((set) => ({
    packages: [],
    fetchPackages: async () => {
        const response = await axios.get('https://example.com/api/packages');
        set({ packages: response.data})
    }
}));

export default GridPurchaseStore;
