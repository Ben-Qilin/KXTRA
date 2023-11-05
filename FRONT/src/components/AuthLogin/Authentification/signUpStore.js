import { create } from 'zustand';
import axios from 'axios';
//fonction qui crée un store a partir de la bibliotheque zustand pour gérer les states
//cela nous evite de passer les props de composants a composants enfants
const apiUrl = process.env.REACT_URL_API; 
export const useSignUpStore = create((set, get) => {
    return ({
        //objet representant les valeur souhaité mais initialisé comme des chaines de caractere vide (state initial)
        data: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone_user: "",
        },
//fonction qui est appelé chaque fois que un evenenment de cahngement se produit dans les champs de formulaire,
//il extrait la valeur de l'élément cible du formulaire , puis il met a jour l'objet {data} dans l'état du store avec la nouvelle valeur.
        handleChange: ( event ) => {
            const {name, value} = event.target;

            console.log(name, value)
            
            set((state) => {
                
                // Je fais une copie de data contenu dans le state
                const {data} = state;
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
        postSignUp: async() => {
            console.log(get().data)
            
            const response = await axios.post(`${apiUrl}/register`, get().data)
            window.alert(response.data);
            console.log(response.data);
        }
    })
})

