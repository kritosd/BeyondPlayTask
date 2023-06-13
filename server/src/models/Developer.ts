'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

export interface DeveloperAttributes {
  id: string;
  name: string;
  email: string;
  RoleId: number;
  StatusId: number;
  TeamId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Developer extends Model<DeveloperAttributes>
    implements DeveloperAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!: string;
    RoleId!: number;
    StatusId!: number;
    TeamId!: number;
    static associate(models: any) {
      // define association here
      Developer.belongsTo(models.Role);
      Developer.belongsTo(models.Status);
      Developer.belongsTo(models.Team);
    }
  }
  Developer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TeamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};