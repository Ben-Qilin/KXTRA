import {create} from 'zustand';
import axios from 'axios';



export const FormSearchStore = create((set, get) => {
    
    return({
        data: {
            arrivalDate:"",
            leaveDate: "",
            members: 1,
            keywords:"",
        },
        fetchPkgSearch:[],
        handleChange: (event) => {
            const {name, value} = event.target;
            console.log(name, value)

            set((state) => {
                const {data} = state;
                console.log(data);
                data[name] = value;
                return {
                    ...state,
                    data: data
                }
            })
        },
        
        incrementMembers: (event) => {
            event.preventDefault();
            set((state) => {
                const {data} = state;
                data.members += 1;
                console.log('members', data.members); // Ajout du console.log ici
                return {
                    ...state,
                    data: data
                }
            })
        },
        
        decrementMembers: (event) => {
            event.preventDefault();
            set((state) => {
                const {data} = state;
                if (data.members > 1) {
                    data.members -= 1;
                    console.log('members', data.members); // Ajout du console.log ici
                    return {
                        ...state,
                        data: data
                    }
                }
            })
        },
        handleSubmit: async (event) => {
            event.preventDefault()
            const { data } = get();
            try {
                const response = await axios.get('http://localhost:3000/search', { params: data })
                console.log(response.data)
                set({ fetchPkgSearch: response.data });
                
            } catch (error) {
                set({error: 'Une erreur est survenue lors de la récupération des établissement'});
            }
        }
        // handleSubmit: (event) => {
        //     event.preventDefault();
        //     const { data } = get();
        //     axios.get('http://localhost:3000/search', { params: data })
        //         .then(response => {
        //             console.log(response.data);
        //             // Traitez les données reçues ici
                
        //             set({ fetchPkgSearch: response.data });
        //         })
        //         .catch(error => {
        //             console.error(error);
        //             // Gérez les erreurs ici
        //         });
        // }
        

       
        
    })
})