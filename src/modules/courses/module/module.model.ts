import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize'

export class CourseModule extends Model<
  InferAttributes<CourseModule>,
  InferCreationAttributes<CourseModule>
> {
  declare id: CreationOptional<string>
  declare courseId: string
  declare title: string
  declare order: CreationOptional<number>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof CourseModule {
    CourseModule.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id' },
        title: { type: DataTypes.STRING(255), allowNull: false },
        order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
      },
      { sequelize, tableName: 'modules', modelName: 'CourseModule', underscored: true },
    )
    return CourseModule
  }

  toModuleJSON() {
    return {
      id: this.id,
      course_id: this.courseId,
      title: this.title,
      order: this.order,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
