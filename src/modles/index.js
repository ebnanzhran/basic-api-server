'use strict';
require('dotenv').config();
// const DATABASE_URL = process.env.DATABASE_URL;
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

const food = require('./food');
const clothes = require('./clothes');

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
    // {
    //   dialect: 'postgres',
    //   protocol: 'postgres',
    //   dialectOptions: {
    //     ssl: true,
    //     native: true
    //   }
    // }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
  db: sequelize,
  Food: food(sequelize, DataTypes),
  Clothes: clothes(sequelize, DataTypes)
};