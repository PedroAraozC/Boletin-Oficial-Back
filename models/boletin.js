const { Schema, model } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const BoletinSchema = new Schema(
  {
    fechaBoletin: {
      type: String,
      required: [true, "La fecha es requerida"],
    },
    estado: {
      //borrado logico
      type: Boolean,
      default: true,
    },
    nroBoletin: {
      type: Number,
      unique: [true, "Ya existe un Boletin con ese número"],
      required: [true, "El Nº de Boletin es requerido"],
    },
    // rutaPdf: {
    //   type: String,
    //   trim: true,
    // },
    archivoBoletin:{
      type: Buffer,
      ref: "archivoBoletin",
    },
    nroDecreto: [
      {
        type: Number,
        ref: "Decreto",
      },
    ],
    nroOrdenanza: [
      {
        type: Number,
        ref: "Ordenanza",
        // required: [true, "El numero de ordenanza es requerido"],
      },
    ],
    nroResolucion: [
      {
        type: Number,
        ref: "Resolucion",
        // required: [true, "El numero de resolucion es requerido"],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

BoletinSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} debe ser único",
});

module.exports = model("boletin", BoletinSchema);
