import * as models from "../../models/index.js";

const serviceProviderController = {
  addService: async (req, res) => {
    // Je récupère le formulaire
    const { name_serv, cover_serv, description_serv, institution_id, hour_start, hour_end } = req.body;

    try {
      const service = await models.Service.create({
        name_serv,
        cover_serv,
        description_serv,
        institution_id,
        hour_start,
        hour_end,
      });

      res.status(201).json( "Le service a été créé." );
    } catch (error) {
      res.status(401).json({ errorMessage: error.message });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const services = await models.Service.findAll();
      res.json(services);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getAllServicesByInstitutionId: async (req, res) => {
    try {
      const institution_id = req.params.id; // Utilisez req.params.id pour obtenir l'ID de l'institution
      if (!institution_id) {
        return res.status(401).json({ message: "L'institution n'a pas été trouvée." });
      }
      const services = await models.Service.findAll({
        where: {
          institution_id: institution_id
        },
        // Utilisez simplement "include" pour charger l'institution associée
        // // ! ne pas oublier le as et le models !!
        // include: {
        //   as: "institution",
        //   models: models.Institution
        // },
          
      });

      res.json(services); // Renvoyez les services dans la réponse
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getOneService: async (req, res) => {
    try {
      const serviceId = req.params.serviceId; // Obtenez l'ID du service à partir des paramètres d'URL
      const service = await models.Service.findByPk(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Le service n'a pas été trouvé." });
      }

      res.json(service);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getOneService: async (req, res) => {
    try {
      const service = await models.Service.findOne();
      res.json(service);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getOneServiceByProviderId: async (req, res) => {
    try {
      const userId = req.user.id;

      if (userId) {
        const serviceId = await models.Service.findOne(serviceId, {
          where: {
            user_id: userId,
          },
          include:
            {
              model: User,
              as: "user",
            },
        });
      }
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  updateService: async (req, res) => {
    const { serviceId } = req.params;
    const { name_serv, description_serv, hour_start, hour_end } = req.body;

    try {
      const service = await models.Service.findByPk(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Le service n'a pas été trouvé." });
      }

      service.name_serv = name_serv;
      service.description_serv = description_serv;
      service.hour_start = hour_start;
      service.hour_end = hour_end;

      await service.save();
      res.status(201).json({ message: "Le service a été modifié." });
    } catch (error) {
      res.status(401).json({ errorMessage: error.message });
    }
  },

  deleteService: async (req, res) => {
    const { serviceId } = req.params;

    try {
      const service = await models.Service.findByPk(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Le service n'a pas été trouvé." });
      }

      await service.destroy();
      return res.status(200).json({ message: "Le service a été supprimé." });
    } catch (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
  }
};

export default serviceProviderController;