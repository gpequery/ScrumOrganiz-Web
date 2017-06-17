'use strict';

module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Project.belongsToMany(
                    models.User, { through: 'User_Projects' }
                );
            }
        },
        instanceMethods: {}
    });
    return Project;
};

