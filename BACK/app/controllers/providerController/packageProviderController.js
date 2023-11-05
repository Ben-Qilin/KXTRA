import * as models from "../../models/index.js";

const packageProviderController = {
  addPackage: async (req, res) => {
    const {
      name_pkg,
      price,
      quantity,
      date_start,
      date_end,
      available,
      join_catg,
      capacity
    } = req.body;

    try {
      const pkg = await models.Package.create({
        name_pkg,
        price,
        quantity,
        date_start,
        date_end,
        available,
        join_catg,
        capacity,
      });

      res.status(201).json({ pkg });
    } catch (error) {
      res.status(401).json({ errorMessage: error.message });
    }
  },

  addServiceToPackage: async (req, res) => {
    const {
      packageId,
      serviceId
    } = req.body;

    try {
      if (!packageId || !serviceId) {
        return res.status(404).json({ message: "Le package ou le service n'a pas été trouvé." });
      }

      if (!parseInt(packageId) || !parseInt(serviceId)) {
        return res.status(403).json({ message: "Données non valides" });
      }

      const packageFound = await models.Package.findByPk(packageId);
      const serviceFound = await models.Service.findByPk(serviceId);

      if (!packageFound || !serviceFound) {
        res.status(404).json({ message: "Package ou service non trouvé" });
      }

      await packageFound.addService(serviceFound);
      res.status(201).json('Le service a été ajouté au package avec succès');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllPackages: async (req, res) => {
    try {
      const packages = await models.Package.findAll({
        include: [
          { model: models.Service, as: 'services',
           include: [{ model: models.Institution, as: 'institution' }],},
          
        ]
      });
      res.json(packages);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  bestPackageHome: async (req, res) => {
    try {
      // La fonction `findOne` ne récupère qu'un seul enregistrement, utilisez `findAll` pour obtenir plusieurs résultats
      const packages = await models.Package.findAll({ limit: 3 }); // Changez le nombre limité selon vos besoins
      res.json(packages);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  getOnePackage: async (req, res) => {
    const { id } = req.params;  // Récupérez l'ID à partir de l'URL
    try {
        const pkg = await models.Package.findOne({
            where: {
                id: id  // Utilisez l'ID pour trouver le package
            },
            include: [{
              model: models.Service,
              as: 'services',
              include: [{
                  model: models.Institution,
                  as: 'institution'
              }]
          }]
        });
        res.json(pkg);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
},

  getOnePrice: async (req, res) => {
    try {
      const packageId = req.params.id;
      const pkg = await models.Package.findByPk(packageId);

      if (!pkg) {
        return res.status(404).json({ message: "Le package n'a pas été trouvé." });
      }

      res.json({ price: pkg.price });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  updatePackage: async (req, res) => {
    const { packageId } = req.params;
    const {
      price,
      quantity,
      date_start,
      date_end,
      available,
      join_catg,
      capacity,
    } = req.body;

    try {
      const pkg = await models.Package.findByPk(packageId);

      if (!pkg) {
        return res.status(404).json({ message: "Le package n'a pas été trouvé." });
      }

      pkg.price = price;
      pkg.quantity = quantity;
      pkg.date_start = date_start;
      pkg.date_end = date_end;
      pkg.available = available;
      pkg.join_catg = join_catg;
      pkg.capacity = capacity;

      // Enregistrez les modifications dans la base de données
      await pkg.save();
      res.status(200).json({ message: "Le package a été modifié." });
    } catch (error) {
      res.status(401).json({ errorMessage: error.message });
    }
  },

  deletePackage: async (req, res) => {
    const { packageId } = req.params;

    try {
      const pkg = await models.Package.findByPk(packageId);

      if (!pkg) {
        return res.status(404).json({ message: "Le package n'a pas été trouvé." });
      }

      await pkg.destroy();
      return res.status(200).json({ message: "Le package a été supprimé." });
    } catch (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await models.Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
};

export default packageProviderController;