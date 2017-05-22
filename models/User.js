/**
 * Created by Greg on 22/05/2017.
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        pseudo: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        firstname: {
            type: DataTypes.STRING
        },
        mail: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {

        },
        instanceMethods: {

        }
    });
    return User;
};

