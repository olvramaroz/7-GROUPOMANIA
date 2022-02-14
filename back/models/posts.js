'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    post: { 
      type: DataTypes.TEXT 
    },
    UserId: { 
      type: DataTypes.INTEGER 
    },
    imageUrl: { 
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};