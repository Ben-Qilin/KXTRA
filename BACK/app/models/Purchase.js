import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Purchase = sequelize.define('Purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date_start: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hour_start: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hour_end: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

export default Purchase; 