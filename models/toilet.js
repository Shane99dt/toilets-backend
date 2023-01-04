const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Toilet = sequelize.define("Toilet", {
    address: {
      type: DataTypes.STRING,
    },
    arrondissement: {
      type: DataTypes.STRING,
    },
    hours: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.GEOMETRY,
    },
  })

  return Toilet
}
