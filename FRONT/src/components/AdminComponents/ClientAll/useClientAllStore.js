import { create } from 'zustand';
import axios from 'axios';

const useClientAllStore = create(set => ({
    users: [],
    error: null,
    fetchUsers: async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            set({ users: response.data })
            console.log(response.data)
        } catch (err) {
            set({error: 'Une erreur est survenue lors de la récuperation des clients'});
        }
    },
    deleteUser: async (id) => {
        try {
             await axios.delete(`http://localhost:3000/users/${id}`);
            set(state => ({ users: state.users.filter(user => user.id !== id) }));
            console.log('User deleted successfully');
        } catch(error) {
            console.error('Something went wrong');
            console.log(error);
        }
    }
}))

export default useClientAllStore


