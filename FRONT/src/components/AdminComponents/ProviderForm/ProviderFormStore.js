import { create } from 'zustand';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//fonction qui crée un store 
export const UseProviderFormStore = create((set, get) => {
    return ({
        isLoggedIn: false,
        data: {
            role: "",
            firstname: "",
            lastname:"",
            adress_user: "",
            phone_user: "",
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
        postProviderCreate: async () => {
            console.log(get().data)
            const response = await axios.post('http://localhost:3000/register-provider', get().data)
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.data.token);

            // Configurer axios pour envoyer le token avec chaque requête
            axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`;

            // Mettre à jour l'état isLoggedIn
            set(state => ({ ...state, isLoggedIn: true }));


            // Rediriger vers la page d'accueil
            // Remplacez '/home' par le chemin de votre page d'accueil
            window.alert(response.data);
            console.log(response.data);
        }
    })
})