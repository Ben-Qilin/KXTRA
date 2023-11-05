import { create } from "zustand";
import axios from "axios";
import { UseSignInStore } from "../../AuthLogin/signInStore";
const apiUrl = process.env.REACT_URL_API;
const AddPackageFormStore = create((set, get) => {
  return {
    data: {
      name_pkg: "",
      price: "",
      quantity: "",
      date_start: "",
      date_end: "",
      available: true,
      join_catg: "",
      capacity: ""
    },
    services: [],
    serviceS: [],
    handleChange: (event) => {
      const { name, value, checked } = event.target;

      set((state) => {
        const { data, services, serviceS } = state;
        if (name === 'institution_id') {
          // Mettez à jour les services en fonction de l'ID de l'institution
          get().getServices(value);
        }
        if (name === 'serviceS') {
          if (checked) {
            // Ajoutez le service au tableau si la case est cochée
            serviceS.push(value);
          } else {
            // Supprimez le service du tableau si la case n'est pas cochée
            const index = serviceS.indexOf(value);
            if (index > -1) {
              serviceS.splice(index, 1);
            }
          }
          console.log(serviceS)
        } else {
          data[name] = value;


        }

        return {
          ...state,
          data: data,
          services: services,
          serviceS: serviceS,
        };
      });
    },

    postPackage: async () => {
      console.log(get().data);
      let packageId;
      try {
        const response = await axios.post(
          `${apiUrl}/packages`,
          get().data
        );
        console.log(response.data);
    
        // Récupérer l'ID du package créé
        packageId = response.data.pkg.id;
        console.log(packageId);
      } catch (error) {
        console.error('Error creating package:', error);
      }
    
      // Enregistrer les services sélectionnés dans la table de relation
      if (packageId) {
        get().serviceS.forEach(async (serviceId) => {
          try {
            await axios.post(`${apiUrl}/package/service`, {
              packageId: packageId,
              serviceId: serviceId,
            });
          } catch (error) {
            console.error('Error adding service to package:', error);
          }
        });
      }
    
      window.alert("Package et services enregistrés avec succès!");
    },
  

    //! demander a tom la direction a prendre pour recuperer l'id de l'instituion via l'objet user ou autre
    getServices: async (institution_id) => {
      try {
        console.log(`Fetching services for institutionId: ${institution_id}`); // Log the institutionId
        const response = await axios.get(
          `${apiUrl}/institutions/${institution_id}/services`
        );
        console.log('Fetched services:', response.data); // Log the fetched services
        set({ services: response.data });
      } catch (err) {
        console.error('Error fetching services:', err); // Log any error
        set({
          error:
            "Une erreur est survenue lors de la récuperation des services",
        });
      }
    },

  };
});

export default AddPackageFormStore;

