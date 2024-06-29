"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Contact extends sequelize_1.Model {
}
Contact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
            isEmail: true,
        },
    },
    linkedId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    linkedPrecedence: {
        type: sequelize_1.DataTypes.ENUM('primary', 'secondary'),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: 'Contacts'
});
exports.default = Contact;
