import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, Select, MenuItem, InputLabel, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Styler } from '../../components/Styler/Styler';

const ModificarUsuario = ({ roles }) => {
  const navigate = useNavigate();
  const usuario = useLocation().state.usuario;

  const defaultValues = {
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
  };
  const [values, setValues] = useState(defaultValues);


  useEffect(() => {
   console.log(values)
  
   
     });

    const item = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setValues({ ...values, rol: value });
  };

  const eliminarUsuario = () => {
    axios.delete(`http://localhost:8000/usuarios/eliminar/${usuario._id.$oid}`)
      .then(() => {
        navigate("/AdminUsuarios");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editarUsuario = (data) => {
    console.log(values)
    console.log(values.rol)
    axios.put("http://localhost:8000/usuarios/editar", {
      "nombre": values.nombre,
      "email": values.email,
      "rol": values.rol,
    })
      .then(() => {
        navigate("/AdminUsuarios");
      })
      .catch((error) => {
        console.log(error);
        alert("Error, rellene todos los campos correctamente");
      });
  };

  const validationSchema = Yup.object().shape({
    rol: Yup.string().required('Seleccione el rol')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  return (
    <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
      <Grid item container md={3} xs={3} sx={{ margin: '40px', marginLeft: '80px' }}>
        <Button
          color="error"
          variant="outlined"
          sx={{
            backgroundColor: "black",
            fontFamily: '"Segoe UI Symbol"',
            fontSize: "20px",
            height: "60px",
            width: "150px",
            ml: 2
          }}
          onClick={() => navigate("/AdminUsuarios")}
        >
          Volver
        </Button>
      </Grid>

      <Grid item container md={5} xs={5} sx={{ marginTop: '40px' }}>
      </Grid>

      <Grid item container md={2} xs={2} sx={{ marginTop: '40px', marginLeft: '20px' }}>
        <Button
          color="error"
          variant="outlined"
          sx={{
            backgroundColor: "black",
            fontFamily: '"Segoe UI Symbol"',
            fontSize: "20px",
            height: "60px",
            width: "150px",
            ml: 2
          }}
          onClick={() => eliminarUsuario()}
        >
          Eliminar
        </Button>
      </Grid>

      <Grid item container md={12} xs={12} sx={{ margin: '40px' }} alignItems="center" justifyContent="center">
        <form onSubmit={handleSubmit(editarUsuario)} onKeyPress={(e) => { e.which === 13 && e.preventDefault() }} noValidate>
          <Grid container spacing={3} sx={{ paddingRight: '10px', paddingBottom: '10px', border: 2, borderRadius: 5, borderColor: "#FFFFF" }}>
       
            <Grid item md={12}>
              <Typography
                color="black"
                align="center"
                variant="h5"
                marked="center"
                style={Styler.textosombra}
                sx={{ mb: 2 }}
              >
                {usuario.nombre}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography
                color="black"
                align="center"
                variant="h5"
                marked="center"
                style={Styler.textosombra}
                sx={{ mb: 2 }}
              >
                {usuario.email}
              </Typography>
            </Grid>
            <Grid item md={5}></Grid>
            <Grid item md={6} alignItems="right" >
              <InputLabel id="demo-select-small"> ROL*</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                defaultValue={usuario.rol}
                label="rol"
                {...register('rol')}
                error={errors.rol ? true : false}
                helperText={errors.rol?.message}
                name='rol'
                required
                onChange={handleChange}
              >
                {roles.map((e) => (
                  <MenuItem key={e} value={e}>{e}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item md={12}>
              <Button
                type="submit"
                color="error"
                variant="outlined"
                sx={{
                  backgroundColor: "black",
                  fontFamily: '"Segoe UI Symbol"',
                  fontSize: "20px",
                  height: "60px",
                  width: "150px",
                  marginLeft: 60,
                  marginTop: 3,
                }}
              >
                Modificar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ModificarUsuario;
