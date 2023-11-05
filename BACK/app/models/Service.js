import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_serv: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cover_serv: {
    type: DataTypes.STRING(255),
    allowNull: false,

  },
  description_serv: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  hour_start: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hour_end: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

export default Service;
