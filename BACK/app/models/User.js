import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 'user',
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
    },
    adress_user: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    city_user: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cp_user: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    phone_user: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_profil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    validation_token: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export default User;