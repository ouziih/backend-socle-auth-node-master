import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize'

export class Lesson extends Model<InferAttributes<Lesson>, InferCreationAttributes<Lesson>> {
  declare id: CreationOptional<string>
  declare moduleId: string
  declare title: string
  declare content: string
  declare order: CreationOptional<number>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof Lesson {
    Lesson.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        moduleId: { type: DataTypes.UUID, allowNull: false, field: 'module_id' },
        title: { type: DataTypes.STRING(255), allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
      },
      { sequelize, tableName: 'lessons', modelName: 'Lesson', underscored: true },
    )
    return Lesson
  }

  toLessonJSON() {
    return {
      id: this.id,
      module_id: this.moduleId,
      title: this.title,
      content: this.content,
      order: this.order,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
