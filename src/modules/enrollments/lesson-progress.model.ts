import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize'

export class LessonProgress extends Model<
  InferAttributes<LessonProgress>,
  InferCreationAttributes<LessonProgress>
> {
  declare id: CreationOptional<string>
  declare userId: string
  declare lessonId: string
  declare isCompleted: CreationOptional<boolean>
  declare completedAt: CreationOptional<Date | null>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof LessonProgress {
    LessonProgress.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
        lessonId: { type: DataTypes.UUID, allowNull: false, field: 'lesson_id' },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'is_completed',
        },
        completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
        createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
      },
      { sequelize, tableName: 'lesson_progress', modelName: 'LessonProgress', underscored: true },
    )
    return LessonProgress
  }

  toProgressJSON() {
    return {
      id: this.id,
      user_id: this.userId,
      lesson_id: this.lessonId,
      is_completed: this.isCompleted,
      completed_at: this.completedAt,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
