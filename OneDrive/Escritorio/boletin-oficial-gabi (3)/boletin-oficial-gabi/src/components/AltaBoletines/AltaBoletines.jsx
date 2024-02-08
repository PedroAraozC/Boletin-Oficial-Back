import React, { useEffect, useRef, useState } from 'react'
import './AltaBoletines.css'
import { Alert, Box, Button, FormControl, Input, InputLabel, MenuItem, Select, Snackbar, TextField, TextareaAutosize } from '@mui/material'
import { ALTA_BOLETIN_VALUES } from '../../helpers/constantes'
import FileUp from '@mui/icons-material/FileUpload';
import File from '@mui/icons-material/UploadFileRounded';

const AltaBoletines = () => {

  const [values, setValues] = useState(ALTA_BOLETIN_VALUES)
  const [selectedFileName, setSelectedFileName] = useState('Seleccione un Archivo');
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [error, setError] = useState("error");

  const obternerLista = (inicio, fin) => {
    const inicioNum = parseInt(inicio, 10)
    const finNum = parseInt(fin, 10)

    if (!isNaN(inicioNum) && !isNaN(finNum)) {
      return Array.from({ length: finNum - inicioNum + 1 }, (_, index) => inicioNum + index)
    } else if (!isNaN(inicioNum)) {
      return [inicioNum]
    } else {
      return []
    }
  }

  const obtenerDecretos = () => {
    return obternerLista(values.nroDecretoInicial, values.nroDecretoFinal)
  };

  const obtenerOrdenanzas = () => {
    return obternerLista(values.nroOrdenanzaInicial, values.nroOrdenanzaFinal)
  };
  const obtenerResoluciones = () => {
    return obternerLista(values.nroResolucionInicial)
  };

  const handleGuardarBoletin = () => {

    const boletin = {
      decretos: obtenerDecretos(),
      ordenanzas: obtenerOrdenanzas(),
      resoluciones: values.nroResolucion,
    };

    setOpen(true)
    setMensaje("Boletin generado con éxito!")
    setError("success")
    // Aquí deberías manejar el guardado del boletín en tu backend o donde corresponda
    console.log('Boletín a guardar:', boletin);
    setValues(ALTA_BOLETIN_VALUES)
    setSelectedFileName('Seleccione un Archivo')
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    const fileName = e.target.files[0]?.name || '';
    setSelectedFileName(fileName);

    if (!fileName.toLowerCase().endsWith('.pdf')) {
      setOpen(true);
      setMensaje("El archivo solo puede ser PDF")
      setError('warning')
    } else {
      setOpen(false); // Cerrar la advertencia si el archivo es un PDF
    }
  };

  const handleResolucionChange = (e) => {
    const inputValue = e.target.value;

    // Evita que el usuario ingrese guiones manualmente
    if (inputValue.includes('-')) {
      // Puedes mostrar un mensaje de advertencia o simplemente ignorar la entrada del usuario
      return;
    } else {


      // Lógica para manejar el formato "1023-1024-1026-1027"
      const formattedValue = inputValue
        .replace(/[^\d-]/g, '')  // Elimina caracteres no numéricos ni guiones
        .replace(/-{2,}/g, '-')  // Reemplaza dos o más guiones consecutivos con solo uno
        .replace(/(\d{4})(?=\d)/g, '$1-')  // Inserta un guion solo antes de cada grupo de 4 dígitos, excepto al final

        const maxLength = 200;  // Longitud máxima del número total
        
        // Limita la longitud total
        const truncatedValue = formattedValue.slice(0, maxLength);
        handleChange({ target: { name: "nroResolucion", value: truncatedValue } });
      }
  }

  const handleMensaje = () => {
    setOpen(true)
    setMensaje("Debe llenar al menos un campo y adjuntar un archivo .pdf")
    setError("error")
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      component="form"
      // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      className='contBoxAltaBoletines container'
    >
      <div className='contAltaBoletines'>
        <Box className="formGroup flex-col ">

          <h3 className='nroBoletin'>Nro de Boletin: 4465
            {/* ´ {values.nroBoletin}´ */}
          </h3>
          {/* <TextField
          label="Nro de Boletín"
          className='inputAltaBoletin'
          type='number'
          value={values.nroBoletin}
          onChange={handleChange}
          inputProps={{ min: "10000", max: "99999" }}
          name="nroBoletin"
        /> */}

          <div className='contRango'>

            <h5>Decreto:</h5>

            <div >
              <TextField
                label="Nº de Decreto inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroDecretoInicial}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroDecretoInicial"
              />
              <TextField
                label="Nº de Decreto Final"
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroDecretoFinal}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroDecretoFinal"
              />
            </div>
          </div>

          <div className='contRango'>

            <h5>Ordenanza:</h5>

            <div>
              <TextField
                label="Nº de Ordenanza Inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroOrdenanzaInicial}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroOrdenanzaInicial"
              />
              <TextField
                label="Nº de Ordenanza Final"
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroOrdenanzaFinal}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroOrdenanzaFinal"
              />

            </div>
          </div>

          <div className='contRango'>

            <h5>Resolución:</h5>

            <div >
              <TextField
                label="Nº de Resolución"
                className='inputAltaBoletin'
                type='text'
                value={values.nroResolucion}
                onChange={handleResolucionChange}
                name="nroResolucion"
              />
            </div>
          </div>
        </Box>

        {/* <TextareaAutosize
        minRows={10} className='textAreaBoletines' /> */}

        <Box className="contInputFileBoletin col-4 W-100 pt-5 pb-4">
          <label className='fileNameDisplay flex-column'>{selectedFileName}
            <Input
              className="inputFileAltaBoletin"
              type='file'
              name="fileBoletin"
              value={values.archivoBoletin}
              onChange={handleChangeFile}
              accept="application/pdf"
              required
            />
            {selectedFileName == 'Seleccione un Archivo' ? (

              <FileUp />
            ) : (
              <File />
            )
            }
          </label>
        </Box>
      </div>
      {((selectedFileName !== 'Seleccione un Archivo') && (values.nroDecretoInicial !== "" || values.nroDecretoFinal !== "" || values.nroResolucionInicial !== "" || values.nroResolucionFinal !== "" || values.nroLicitacionInicial !== "" || values.nroLicitacionFinal !== "")) ?
        (
          (selectedFileName !== '' && (selectedFileName.toLowerCase().endsWith('.pdf'))) ? (
            <Button type="button" variant="contained" onClick={handleGuardarBoletin}>
              Guardar Boletín
            </Button>
          ) : (
            <>
              <Button type="button" variant="contained" onClick={handleMensaje}>
                Guardar Boletín
              </Button>

            </>
          )
        ) : (
          <Button type="button" variant="contained" onClick={handleMensaje}>
            Guardar Boletín
          </Button>
        )


      }
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}

      >
        <Alert
          onClose={handleClose}
          severity={error}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Box >
  )
}

export default AltaBoletines