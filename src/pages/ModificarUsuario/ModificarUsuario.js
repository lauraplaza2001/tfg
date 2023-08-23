import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, Select, MenuItem, InputLabel, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Styler } from '../../components/Styler/Styler';

const ModificarUsuario = ({ roles, user }) => {
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
   if(user==undefined){
    console.log(user)
    alert("Por favor, inicie sesión")
    navigate("/")
  }
  
   
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
        alert("Usuario eliminado correctamente")
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
        alert("Usuario modificado correctamente")
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
            ml: 7
          }}
          onClick={() => navigate("/AdminUsuarios")}
        >
          Volver
        </Button>
      </Grid>

      <Grid item container md={3} xs={3} sx={{ marginTop: '40px' }}>
      </Grid>

      <Grid item container md={4} xs={4} sx={{ marginTop: '40px', marginLeft: '90px' }}>
        <Button
          color="error"
          variant="outlined"
          sx={{
            backgroundColor: "black",
            fontFamily: '"Segoe UI Symbol"',
            fontSize: "20px",
            height: "60px",
            width: "150px",
            ml : 22
          }}
          onClick={() => eliminarUsuario()}
        >
          Eliminar
        </Button>
      </Grid>

      <Grid item container md={9} xs={9} sx={{ margin: '40px' , marginLeft:'160px'}} alignItems="center" justifyContent="center">
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
            <Grid item md={6} alignItems="left" sx={{ml:4}}  >
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

            <Grid item md={12}  xs={12} alignItems="left"   marginLeft={65}  >
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
