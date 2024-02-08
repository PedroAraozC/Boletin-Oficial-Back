import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./Buscador.css";
import { BUSCADOR_VALUES } from "../../helpers/constantes";
import FormAvanzada from "../Form/FormAvanzada.jsx";

const Buscador = () => {
  const formRef = useRef(null);
  const [values, setValues] = useState(BUSCADOR_VALUES);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center">
      <Box className="buscador ">
        <h3 className="tituloBuscador">BUSCAR BOLETINES ANTERIORES</h3>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          className="inputCont container"
        >
          <TextField
            label="Nro de Boletín"
            variant="outlined"
            className="inputBuscador"
            type="number"
            value={values.nroBoletin}
            onChange={handleChange}
            inputProps={{ min: "0" }}
            name="nroBoletin"
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
      
          <Button variant="contained" className="btnBuscador" type="submit">
            Buscar
          </Button>
          <Button variant="contained" className="btnBuscador">
          <FormAvanzada />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Buscador;
