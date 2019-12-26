'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        name: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        checked: DataTypes.BOOLEAN,
        idCategory: DataTypes.INTEGER
    }, {});
    Todo.associate = function (models) {
        // associations can be defined here

        models.Todo.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        })
    };
    return Todo;
};
