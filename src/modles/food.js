'use strict';

const Food = (Sequelize, DataTypes) => {
  const Food = Sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
    }
  });
  return Food;
}
module.exports = Food;