'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modules', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: { type: Sequelize.STRING(255), allowNull: false },
      order: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    })

    await queryInterface.addIndex('modules', ['course_id', 'order'], {
      name: 'modules_course_order_idx',
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('modules')
  },
}
