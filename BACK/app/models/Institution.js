import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Institution = sequelize.define('Institution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_ins: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_ins: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Cette propriété doit être unique
        // validate: {
        //     isEmail: true, // Assurez-vous que la valeur est une adresse e-mail valide
        // },
    },
    adress_ins: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    city_ins: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cp_ins: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    phone_ins: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    average_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    experiences: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }

})

export default Institution;