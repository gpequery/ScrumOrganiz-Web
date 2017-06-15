'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                User.belongsToMany(
                    models.Project, {through: 'User_Projects'}
                );
            }
        },
        instanceMethods: {}
    });
    return User;
};

