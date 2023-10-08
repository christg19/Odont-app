'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proveedorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Suppliers', // Nombre de la tabla a la que hace referencia
          key: 'id', // Clave primaria de la tabla a la que hace referencia
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costToBuy: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      priceToSell: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      units: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Agregar una clave foránea a Supplier si aún no existe
    await queryInterface.addConstraint('Products', {
      fields: ['proveedorId'],
      type: 'foreign key',
      references: {
        table: 'Suppliers',
        field: 'id',
      },
      onDelete: 'CASCADE', // Acción a realizar cuando se elimina un proveedor (también puedes usar 'SET NULL' u otras opciones)
      onUpdate: 'CASCADE', // Acción a realizar cuando se actualiza un proveedor (también puedes usar 'SET NULL' u otras opciones)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
