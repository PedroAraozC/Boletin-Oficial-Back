const { Schema, model } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const archivoBoletinSchema = new Schema(
  {
    rutaArchivo: {
      type: String,
      trim: true,
      ref: "rutaArchivo",
    },
    estado: {
      //borrado logico
      type: Boolean,
      default: true,
    },
    archivoBoletin: {
      type: Schema.Types.ObjectId,
      ref: "archivoBoletin",
      required: [true, "El Boletin es requerido"],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

archivoBoletinSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} debe ser único",
});

module.exports = model("archivoBoletin", archivoBoletinSchema);
