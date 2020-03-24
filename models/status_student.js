/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('status_student', {
		idStatus: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		comments: {
			type: DataTypes.STRING(255),
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
		tableName: 'status_student'
	});
};
