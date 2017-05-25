/**
 * Created by Greg on 22/05/2017.
 * Init table User
 */

'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        pseudo: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {},
        instanceMethods: {}
    });
    return User;
};

