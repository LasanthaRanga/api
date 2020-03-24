/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('status_change', {
		idStchange: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'status_student',
				key: 'idStatus'
			}
		},
		temp_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'temp_student',
				key: 'idStudent'
			}
		},
		student_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		other: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
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
		tableName: 'status_change'
	});
};
