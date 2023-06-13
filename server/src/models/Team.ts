'use strict';
import {
  Model
} from 'sequelize';

export interface TeamAttributes {
  id: number;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Team extends Model<TeamAttributes>
  implements TeamAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    static associate(models: any) {
      // define association here
      Team.hasMany(models.Developer);
    }
  }
  Team.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};