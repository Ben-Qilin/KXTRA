import * as models from '../../models/index.js';

const institutionProviderController = {

  addInstitution: async (req, res) => {
    // Récupération des données du formulaire
    const {
      name_ins,
      cover,
      email_ins,
      adress_ins,
      city_ins,
      cp_ins,
      phone_ins,
      average_price,
      experiences,
    } = req.body;

    const user_id = req.user.id;

    try {
      const ins = await models.Institution.create({
        name_ins,
        cover,
        email_ins: email_ins.toLowerCase(), // Conversion en minuscules
        adress_ins,
        city_ins,
        cp_ins,
        phone_ins: parseInt(phone_ins), // Conversion en nombre
        average_price,
        experiences,
        user_id
      });

      res.status(201).json({ message: "L'institution a été créée." });
    } catch (error) {
      res.status(401).json({ errorMessage: error.message });
    }
  },

  getAllInstitutions: async (req, res) => {
    try {
      const institutions = await models.Institution.findAll();
      res.json(institutions);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getAllInstitutionByProviderId: async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (!userId) {
        return res.status(400).json({ errorMessage: "L'ID de l'utilisateur est requis." });
      }
  
      const institutions = await models.Institution.findAll({
        where: {
          user_id: userId,
        },
        include: {
          as: "user",
          model: models.User,
        },
      });
      //! ne pas mettre en accolade 
      res.json(institutions);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },
  

  getOneInstitutionByProviderId: async (req, res) => {
    try {
      const userId = req.user.id;

      if (userId) {
        const institutionId = await models.Institution.findOne({
          where: {
            user_id: userId,
          },
          include:
            {
              model: models.User,
              as: "user",
            },
        });
        res.json({ institutionId });
      }
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getOneInstitution: async (req, res) => {
    try {
      const ins = await models.Institution.findOne();
      res.json({ ins });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  updateInstitution: async (req, res) => {
    const { institutionId } = req.params;
    const {
      name_ins,
      cover,
      email_ins,
      adress_ins,
      city_ins,
      cp_ins,
      phone_ins,
      average_price,
      experiences,
    } = req.body;

    try {
      const ins = await models.Institution.findByPk(institutionId);

      if (!ins) {
        return res.status(404).json({ message: "L'établissement n'a pas été trouvée." });
      }

      ins.name_ins = name_ins;
      ins.cover = cover;
      ins.email_ins = email_ins;
      ins.adress_ins = adress_ins;
      ins.city_ins = city_ins;
      ins.cp_ins = cp_ins;
      ins.phone_ins = phone_ins;
      ins.average_price = average_price;
      ins.experiences = experiences;

      // Enregistrez les modifications dans la base de données
      await ins.save();
      return res.status(200).json({ message: "L'institution a été modifiée." });
    } catch (error) {
      res.status(401).json({ errorMessage: error.message });
    }
  },

  deleteInstitution: async (req, res) => {
    const { institutionId } = req.params;

    try {
      const ins = await models.Institution.findByPk(institutionId);

      if (!ins) {
        return res.status(404).json({ message: "L'institution n'a pas été trouvée." });
      }

      await ins.destroy();

      return res.status(200).json({ message: "L'institution a été supprimée." });
    } catch (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
  }
};

export default institutionProviderController;