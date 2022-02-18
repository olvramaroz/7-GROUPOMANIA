const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {}
    Message.init({
        message: {
            type: DataTypes.TEXT
        },
        messageUrl: {
            type: DataTypes.STRING
        },
        UserId: {
            type: DataTypes.INTEGER
        },
    }, 
    {
        sequelize,
        modelName: "Message"
    })
    return Message
}