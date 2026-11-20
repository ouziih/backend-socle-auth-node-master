'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lesson_progress', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'lessons', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    })

    await queryInterface.addIndex('lesson_progress', ['user_id', 'lesson_id'], {
      unique: true,
      name: 'lesson_progress_user_lesson_uq',
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('lesson_progress')
  },
}
