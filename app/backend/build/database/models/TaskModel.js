"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const _1 = __importDefault(require("."));
const UserModel_1 = __importDefault(require("./UserModel"));
class Tasks extends sequelize_2.Model {
}
Tasks.init({
    id: {
        type: sequelize_2.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_2.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.BOOLEAN,
        allowNull: false
    },
    description: {
        type: (0, sequelize_2.STRING)(1000),
        allowNull: false
    }
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'tasks',
    timestamps: false
});
UserModel_1.default.hasMany(Tasks);
Tasks.belongsTo(UserModel_1.default);
exports.default = Tasks;
