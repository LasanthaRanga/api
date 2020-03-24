/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_has_privilages', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		privid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'privilages',
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
		tableName: 'user_has_privilages'
	});
};
