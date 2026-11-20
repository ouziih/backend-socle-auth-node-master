'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      teacher_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      status: {
        type: Sequelize.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED'),
        allowNull: false,
        defaultValue: 'DRAFT',
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    })

    await queryInterface.addIndex('courses', ['teacher_id'], { name: 'courses_teacher_idx' })
    await queryInterface.addIndex('courses', ['status'], { name: 'courses_status_idx' })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('courses')
  },
}
