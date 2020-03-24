/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		nic: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		fullname: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'utype',
				key: 'id'
			}
		},
		isactive: {
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
		tableName: 'user'
	});
};
