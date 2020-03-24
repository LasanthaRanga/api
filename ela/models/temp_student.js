/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('temp_student', {
		idStudent: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		nic: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		mob1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		mob2: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		city: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		other1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		other2: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		course: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'course',
				key: 'idCourse'
			}
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'status_student',
				key: 'idStatus'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'temp_student'
	});
};
