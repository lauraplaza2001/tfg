import { useLocation} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { TextField } from "@mui/material";
import { Styler } from '../../components/Styler/Styler'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';

import Chip from '@mui/material/Chip';
import ListaEjercicios from "../../components/ListaEjercicios/ListaEjercicios";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';




const NuevoUsuario = ({roles}) => {
    const navigate = useNavigate();

    const defaultValues= {
        id: "",
        nombre: "",
        email: "",
        rol: "",
    }
    const [values, setValues] = useState(defaultValues);
    



   
   
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme();
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        };


        const handleChange = (value) =>(
            setValues(value)
        );
        
    
    
        const nuevoUsuario = (data) => {
    
             
                console.log(values)
                console.log(values.nombre)
                console.log(values.email)
                console.log(values.rol)

    
                axios.post("http://localhost:8000/usuarios/crear2",
                    {
                        "nombre" : values.nombre,
                        "email" : values.email,
                        "rol" : values.rol,

                    }).then(() => {
                        <Alert variant="filled" severity="success">
                        Usuario creado con éxito
                        </Alert>
                        navigate("/AdminUsuarios")
                    }).catch((response) =>{
                        console.log(response);
                        <Alert variant="filled" severity="error">
                        Error, rellene todos los campos correctamente
                        </Alert>
                    });
               
        };
    
    
        const validationSchema = Yup.object().shape({
            nombre: Yup.string().required("Nombre obligatorio"),
            email: Yup.string().required("Email obligatorio"),                                           // eslint-disable-line
            rol: Yup.string().required('Seleccione un rol')
        });
    
        const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm({
            mode: 'onChange',
            resolver: yupResolver(validationSchema),
        });
    
    
    


    <Typography 
    color="black" 
    align="left"
    variant="h4"
    marked="center" 
    style={ Styler.textosombra }
    sx={{ mb: 2 }}
    >
  Functional Training Assistance
  </Typography>




    return (
        <Grid container spacing={2} sx={{paddingTop: '10px'}}>
             <Grid item container md={3} xs={3} sx={{margin: '40px', marginLeft:'80px'}}  >
             <Button
                        color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "150px",
                        ml: 2 }}
                        onClick={() => navigate("/AdminUsuarios")}
                    >
                     Volver
            </Button>


             </Grid>

             <Grid item container md={5} xs={5} sx={{marginTop: '40px'}}  >
        
             </Grid>   
   




            <Grid item container md={12} xs={12} sx={{margin: '40px'}} alignItems="center"  justifyContent="center" >
                <Box sx={{maxWidth: '1200px' }}>
                <form onSubmit={handleSubmit(nuevoUsuario)} onKeyPress={e => { e.which === 13 && e.preventDefault() }} noValidate>
                    <Grid container spacing={3} sx={{  paddingRight: '10px', paddingBottom: '10px', border: 2, borderRadius: 5, borderColor: "forFFFFF"}}>
                        <Grid item md={8} sx={{mt:2.5}}><TextField placeholder='Nombre' fullWidth label="Nombre" {...register('nombre')} error={errors.nombre ? true : false} helpertext={errors.nombre?.message}  name='nombre' required onChange={(event) => handleChange({...values, nombre: event.target.value})}/></Grid>
                        <Grid item md={8} sx={{mt:2.5}}><TextField placeholder='Email' fullWidth label="Email" {...register('email')} error={errors.email ? true : false} helpertext={errors.email?.message}  name='email' required onChange={(event) => handleChange({...values, email: event.target.value})}/></Grid>
                        <Grid item md={8}  alignItems="right" > 
                        
                            <InputLabel id="demo-select-small"> ROL*</InputLabel>
                            <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={values.rol}
                            label="Rol"
                            {...register('rol')} error={errors.rol ? true : false} helpertext={errors.rol?.message}  name='rol' required onChange={(event) => handleChange({...values, rol: event.target.value})}
                            >

                            {roles.map((e) => (
                            <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}

                            </Select>
                         </Grid>
                         <Grid item md={6} sx={{mb:2.5}} alignItems="right" >
                       <Button type="submit"  color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "150px",
                         mt:3 }} >Crear</Button>
                        
                      </Grid>
                       
                      



                       
                       </Grid>
        
                   
                </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default NuevoUsuario ; 