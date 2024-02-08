import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { BUSCADOR_AVANZADA_VALUES } from "../../helpers/constantes";
import "./FormAvanzada.css"

export default function FormAvanzada(algo) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState(BUSCADOR_AVANZADA_VALUES);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  
  return (
    <div>
      <Button className="text-light" onClick={handleOpen}>
        Busqueda Avanzada
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
       
      >
        <Box className="modal-busqueda-avanzada">
          <h3 className="tituloBuscador">Búsqueda Avanzada</h3>
          <Box className="modal-content"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
           
          >
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Tipo de Norma
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={values.tipo}
                onChange={handleChange}
                autoWidth
                label="Tipo de Norma"
                name="tipo"
              >
                <MenuItem value="">
                  <em>--Seleccione--</em>
                </MenuItem>
                <MenuItem value={10}>Decreto</MenuItem>
                <MenuItem value={21}>Resolución</MenuItem>
                <MenuItem value={22}>Ordenanza</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nro de Norma"
              variant="outlined"
              className="inputBuscador"
              type="number"
              value={values.nroNorma}
              onChange={handleChange}
              inputProps={{ min: "0" }}
              name="nroNorma"
            />

            <TextField
              label="Fecha"
              variant="outlined"
              name="fecha"
              type="date"
              className="inputBuscador"
              value={values.fecha}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <Button variant="contained" className="btnAvanzada" type="submit">
              Limpiar
            </Button>
            <Button variant="contained" className="btnAvanzada" type="submit">
              Buscar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
