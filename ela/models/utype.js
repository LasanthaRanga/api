/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('utype', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		utype: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'utype'
	});
};
