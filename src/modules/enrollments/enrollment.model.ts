import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize'

export class Enrollment extends Model<
  InferAttributes<Enrollment>,
  InferCreationAttributes<Enrollment>
> {
  declare id: CreationOptional<string>
  declare userId: string
  declare courseId: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof Enrollment {
    Enrollment.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
        courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id' },
        createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
      },
      { sequelize, tableName: 'enrollments', modelName: 'Enrollment', underscored: true },
    )
    return Enrollment
  }

  toEnrollmentJSON() {
    return {
      id: this.id,
      user_id: this.userId,
      course_id: this.courseId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
