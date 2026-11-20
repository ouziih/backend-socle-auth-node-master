import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize'

export const COURSE_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const
export type CourseStatus = (typeof COURSE_STATUSES)[number]

export class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  declare id: CreationOptional<string>
  declare teacherId: string
  declare title: string
  declare description: string | null
  declare status: CreationOptional<CourseStatus>
  declare deletedAt: CreationOptional<Date | null>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof Course {
    Course.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        teacherId: { type: DataTypes.UUID, allowNull: false, field: 'teacher_id' },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        status: {
          type: DataTypes.ENUM(...COURSE_STATUSES),
          allowNull: false,
          defaultValue: 'DRAFT',
        },
        deletedAt: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
        createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
      },
      {
        sequelize,
        tableName: 'courses',
        modelName: 'Course',
        underscored: true,
        paranoid: true,
        deletedAt: 'deletedAt',
      },
    )
    return Course
  }

  toCourseJSON() {
    return {
      id: this.id,
      teacher_id: this.teacherId,
      title: this.title,
      description: this.description,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
