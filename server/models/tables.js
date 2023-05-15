const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  User: sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
  }),
  Spots: sequelize.define("spots", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    spotName: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    parkingLot: DataTypes.BOOLEAN,
    location: DataTypes.TEXT,
    date: DataTypes.DATE,
  }),
};
