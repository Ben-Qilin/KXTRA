import { create } from 'zustand';
import axios from 'axios';
const apiUrl = process.env.REACT_URL_API;
//fonction qui crée un store 
export const UseSignInStore = create((set, get) => {
    return ({
        isLoggedIn: false,
        user: null,
        isFetching: false,
        triedAutoConnect: false,
        data: {
            email: "",
            password: "",
        },

        handleChange: (event) => {
            const { name, value } = event.target;

            console.log(name, value)

            set((state) => {

                // Je fais une copie de data contenu dans le state
                const { data } = state;
                console.log(data);
                // Je modifie la valeur correspondant au name sur ma copie de data
                data[name] = value;

                // J'écrase l'ancien state par celui-ci via un spread-operator
                return {
                    ...state,
                    data: data
                }
            })
        },
        //fonction asynchrone qui envoi la requette http en POST avec les données utilisateur 
        postSignIn: async () => {
            console.log(get().data)
            const response = await axios.post(`${apiUrl}/login`, get().data)
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.data.token);

            // Configurer axios pour envoyer le token avec chaque requête
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
            // Mettre à jour l'état isLoggedIn et isAdmin
            set(state => ({ ...state, isLoggedIn: true, user: response.data.user }));


            // Rediriger vers la page d'accueil
            // Remplacez '/home' par le chemin de votre page d'accueil
            window.alert(response.data);
            console.log(response.data);
        },

        autoConnect: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return
            }
            try {
                const response = await axios.get(`${apiUrl}/profile`,
                    {
                        headers: {
                            Authorization: "Bearer " + (token)
                        }
                    })

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const user = response.data;
                
                set(state => ({ ...state, isLoggedIn: true, user, triedAutoConnect: true}));

            } catch (error) {
                set(state => ({ ...state, triedAutoConnect: true}));
                console.log(error.message)
                localStorage.removeItem('token')
            }
            

        },
        isAdmin: () => {
            return get().user.role === 'admin'
        },
        isProvider: () => {
            return get().user.role === 'provider'
        },


        logOut: async () => {
            // Supprimer le token du localStorage
            localStorage.removeItem('token');

            // Réinitialiser les états isLoggedIn, isAdmin et isProvider à false
            set(state => ({ ...state, isLoggedIn: false, user: null}));

            // Rediriger vers la page de connexion ou d'accueil
            window.location.replace('/auth');
        }
    })
})