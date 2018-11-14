const Sequelize = require('sequelize')
const sequelize = require('../db')
const Company = require('../companies/model')


const Customer = sequelize.define('customers', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
    allowNull: false
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: false
  },
  addressLine1: {
    type: Sequelize.STRING,
    field: 'address_line_1'
  },
  addressLine2: {
    type: Sequelize.STRING,
    field: 'address_line_2'
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'customers'
})


Customer.belongsTo(Company)

module.exports = Customer