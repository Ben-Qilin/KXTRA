import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_catg: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description_catg: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
})

export default Category;