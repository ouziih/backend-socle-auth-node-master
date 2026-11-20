'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lessons', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      module_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'modules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: { type: Sequelize.STRING(255), allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      order: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    })

    await queryInterface.addIndex('lessons', ['module_id', 'order'], {
      name: 'lessons_module_order_idx',
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('lessons')
  },
}
