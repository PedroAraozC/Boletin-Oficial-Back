const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const BoletinSchema = new Schema(
  {
    fechaBoletin: {
      type: String,
      required: [true, "La fecha es requerida"],
    },
    // detalle: {
    //   type: String,
    //   required: [true, "El detalle es requerido"],
    //   trim: true,
    // },
    estado: {
      //borrado logico
      type: Boolean,
      default: true,
    },
    numeroBoletin: { 
      type: Number ,
      unique: true,
    },
    rutaPdf: {
      type: String,
      trim: true,
    },
    archivoBoletin:{
      type: Buffer,
      ref: "archivoBoletin",
    },
    nroDecreto: [{
      type: Schema.Types.ObjectId,
      ref: "Decreto",
    }],
    nroOrdenanza: [{
      type: Schema.Types.ObjectId,
      ref: "Ordenanza",
      // required: [true, "El numero de ordenanza es requerido"],
    }],
    nroResolucion:[ {
      type: Schema.Types.ObjectId,
      ref: "Resolucion",
      // required: [true, "El numero de resolucion es requerido"],
    }],
    // norma: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Norma",
    //   required: [true, "La norma es requerida"],
    // },
    // subcategoria: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Subcategoria",
    // },
    // dispositivo: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Dispositivo",
    //   required: [true, "El dispositivo es requerido"],
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

BoletinSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  


module.exports = model('boletin',BoletinSchema);