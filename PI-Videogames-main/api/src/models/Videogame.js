const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaulValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripción:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rating:{
      type: DataTypes.STRING
    },
    ratings:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    released:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createinBD:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaulValue: true,
    },
    genero:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });
};
