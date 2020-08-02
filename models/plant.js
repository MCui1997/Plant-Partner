module.exports = function (sequelize, DataTypes) {
  var Plant = sequelize.define("Plant", {
    //Plant name
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        min: 1,
      }
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    buyerId: {
      type: DataTypes.STRING
    }
  });

  Plant.associate = function(models) {
    Plant.belongsTo(models.User), {
      foreignKey: {
        allowNull: false
      }
    };
  };
  return Plant;
};
