/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('course', {
		idCourse: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		course_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		isactive: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
		tableName: 'course'
	});
};
