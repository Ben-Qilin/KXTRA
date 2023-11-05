import Calendar from "../models/Calendar.js";
import moment from 'moment';

const calendarController = {
    addPackageCalendar: async (req, res) => {
        const getModelCalendar = Calendar(req.body);
        await getModelCalendar.save();
        res.status(201).json({ errorMessage: error.message });
    },

    getAllCalendar: async (req, res) => {
        const findModelCalendar = await findModelCalendar.find({
            start: { $gte: moment(req.query.start).toDate },
            end: { $lte: moment(req.query.end).toDate },
        });

        res.send(findModelCalendar);
    },
}
// addPackage: async (req, res) => {
//     //je récupére le formulaire
//     const {
//         price,
//         quantity,
//         date_start,
//         date_end,
//         available,
//         hour_start,
//         hour_end,
//         join_catg,
//         capacity
//     } = req.body;
//     try {
//         const pkg = await models.Package.create({
//             price,
//             quantity,
//             date_start,
//             date_end,
//             available,
//             hour_start,
//             hour_end,
//             join_catg,
//             capacity,
//         });
//         res.status(201).send("The package is created.");
//     } catch (error) {
//         res.status(401).json({ errorMessage: error.message });
//     }
// },

// Création d'un nouvel événement
// Event.create({
//     name: 'Mon événement',
//     start_date: new Date('2023-10-20T08:00:00'),
//     end_date: new Date('2023-10-20T12:00:00'),
// })
//     .then((event) => {
//         console.log(`Événement créé : ${event.name}`);
//     })
//     .catch((error) => {
//         console.error({ errorMessage: error.message });
//     });

// // Récupération de tous les événements
// Event.findAll()
//     .then((events) => {
//         events.forEach((event) => {
//             console.log(`Événement : ${event.name}, Début : ${event.start_date}, Fin : ${event.end_date}`);
//         });
//     })
//     .catch((error) => {
//         console.error({ errorMessage: error.message });
//     });

export default calendarController;