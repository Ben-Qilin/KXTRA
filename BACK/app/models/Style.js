import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Style = sequelize.define('Style', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_style: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
})

export default Style;