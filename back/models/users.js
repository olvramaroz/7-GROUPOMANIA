'use strict';
const {
  Model
} = require('sequelize');

const {
  passwordValidator,
  uniqueEmail,
  authValidator
} = require('password')

const { deleteFile } = require('deleteFile')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Post, { foreignKey: 'userId' })
    }

    softDestroy () {
      return this.update({
        deleted: true,
        email: `deleted-user${this.id}@groupomania.com`,
        imageUrl: null,
        firstName: 'Utilisateur',
        lastName: 'Supprimé'
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          uniqueEmail
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          passwordValidator
        }
      },
      imageUrl: DataTypes.STRING,
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  authValidator(User)

  User.afterUpdate(async user => {
    if (user.dataValues.imageUrl !== user._previousDataValues.imageUrl) {
      await deleteFile(user._previousDataValues.imageUrl)
    }
  })

  return User
}
