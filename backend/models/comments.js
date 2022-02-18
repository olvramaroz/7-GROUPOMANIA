const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {}
    Comment.init({
        comment: {
            type: DataTypes.TEXT
        },
        UserId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        MessageId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
    }, 
    {
        sequelize,
        modelName: "Comment"
    })
    return Comment
}
