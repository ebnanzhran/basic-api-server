'use strict';

const clothes = (Sequelize, DataTypes) => {
  const Clothes = Sequelize.define('Clothes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    }
  });
  return Clothes;
}
module.exports = clothes;