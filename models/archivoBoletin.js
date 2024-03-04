const { Schema, model } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const ArchivoBoletinSchema = new Schema(
  {
    rutaArchivo: {
      type: String,
      trim: true,
      required: [true, "La ruta del archivo es requerida"],
    },
    estado: {
      // Borrado lógico
      type: Boolean,
      default: true,
    },
    archivoBoletin: {
      type: Schema.Types.ObjectId,
      ref: "archivoBoletin", // Referencia a sí mismo (para relaciones entre archivos)
      required: [true, "El archivo del boletín es requerido"],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

ArchivoBoletinSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} debe ser único",
});

module.exports = model("ArchivoBoletin", ArchivoBoletinSchema);
