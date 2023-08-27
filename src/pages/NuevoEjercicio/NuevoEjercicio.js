import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Styler } from '../../components/Styler/Styler';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';



const NuevoEjercicio = ({user,tips,dificultades,gruposMusculares}) => {
    const navigate = useNavigate();
    useEffect(() => {
      
        if(user===undefined){
         console.log(user)
         alert("Por favor, inicie sesión")
         navigate("/")
       }
       
        
          });



    const defaultValues= {
        nombre: "",
        descripcion: "",
        video: "",
        foto: "",
        gruposMusculares: [],
        tips: [],
        dificultad: ""
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

    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    
    const handleChange = (value) =>(
        setValues(value)
    );
    


    const addEjercicio = (data) => {

        if (values.gruposMusculares.length >= 1  && values.tips.length >= 1 )
{        
            console.log(values)
            console.log(values.nombre)
            console.log(values.descripcion)
            console.log(values.dificultad)
            console.log(values.video)
            console.log(values.foto)
            console.log(values.gruposMusculares)
            console.log(values.tips)

            axios.post("http://localhost:8001/ejercicios/crear",
                {
                    "nombre" : values.nombre,
                    "descripcion" : values.descripcion,
                    "dificultad" : values.dificultad,
                    "video" : values.video,
                    "foto" : values.foto,
                    "tips" : values.tips,
                    "gruposMusculares" : values.gruposMusculares,
                }).then(() => {
                    alert("Ejercicio creado con éxito")
                    navigate("/AdminEjercicios")
                }).catch((response) =>{
                    console.log(response);
                    <Alert variant="filled" severity="error">
                    Error, rellene todos los campos correctamente
                    </Alert>
                });
            }else {
                alert("Error seleccione al menos un tip y y un grupo muscular")
            }
    
    };


    const validationSchema = Yup.object().shape({
        foto: Yup.string().required("Enlace a foto obligatorio"),
        video: Yup.string().required("Enlace a vídeo obligatorio"),
        nombre: Yup.string().required("Nombre obligatorio").min(1,"").max(20, "20 caracteres máximo"),                                                                          // eslint-disable-line
        descripcion: Yup.string().required("Descripción Obligatoria").min(20, "20 caracteres mínimo").max(400, "200 caracteres máximo"),                                              // eslint-disable-line
        dificultad: Yup.string().required('Seleccione un nivel de dificultad')
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
             <Grid item container md={3} xs={3} sx={{margin: '40px', marginLeft:'60px'}}  >
             <Button
                        color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "150px",
                        ml: 2 }}
                        onClick={() => navigate("/AdminEjercicios")}
                    >
                     Volver
                    </Button>

             </Grid>

             <Grid item container md={8} xs={8} sx={{marginTop: '40px', marginLeft:'20px'}}  >
             <Typography 
                color="black" 
                align="left"
                variant="h2"
                marked="center" 
                style={ Styler.textosombra }
                sx={{ mb: 2 }}
                >
              NUEVO EJERCICIO
            </Typography>


             </Grid>   




            <Grid item container md={12} xs={12} sx={{margin: '40px'}} alignItems="center"  justifyContent="center" >
                <Box sx={{maxWidth: '1200px' }}>
                <form onSubmit={handleSubmit(addEjercicio)} onKeyPress={e => { e.which === 13 && e.preventDefault() }} noValidate>
                    <Grid container spacing={3} sx={{  paddingRight: '10px', paddingBottom: '10px', border: 2, borderRadius: 5, borderColor: "forFFFFF"}}>
                        <Grid item md={6} sx={{mt:2.5}}><TextField placeholder='Nombre' fullWidth label="Nombre" {...register('nombre')} error={errors.nombre ? true : false} helpertext={errors.nombre?.message}  name='nombre' required onChange={(event) => handleChange({...values, nombre: event.target.value})}/></Grid>
                        <Grid item md={6} alignItems="right" > 
                        
                            <InputLabel id="demo-select-small"> Dificultad*</InputLabel>
                            <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={values.dificultad}
                            label="Dificultad"
                            {...register('dificultad')} error={errors.dificultad ? true : false} helpertext={errors.dificultad?.message}  name='dificultad' required onChange={(event) => handleChange({...values, dificultad: event.target.value})}
                            >

                            {dificultades.map((e) => (
                            <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}

                            </Select>
                         </Grid>
                        <Grid item md={12}><TextField placeholder='Descripción'fullWidth multiline rows={3} maxrows={5} label="Descripción" {...register('descripcion')} error={errors.descripcion ? true : false} helpertext={errors.descripcion?.message} name='descripcion' required onChange={(event) => handleChange({...values, descripcion: event.target.value})}/></Grid>
                        <Grid item md={6}><TextField placeholder='Enlace vídeo' fullWidth label="Enlace Vídeo" {...register('video')} error={errors.video ? true : false} helpertext={errors.video?.message}  name='video' required onChange={(event) => handleChange({...values, video: event.target.value})}/></Grid>
                        <Grid item md={6}><TextField placeholder='Enlace imagen' fullWidth label="Enlace Foto" {...register('foto')} error={errors.foto ? true : false} helpertext={errors.foto?.message}  name='foto' required onChange={(event) => handleChange({...values, foto: event.target.value})}/></Grid>
                        <Grid item md={12}>
                        <b>GRUPOS MUSCULARES*</b>
                        <FormGroup row>
                            {gruposMusculares.map((e) => (
                            <FormControlLabel
                                key={e}
                                control={
                                <Checkbox
                                    checked={values.gruposMusculares.includes(e)}
                                    onChange={(event) => {
                                    const checked = event.target.checked;
                                    setValues((prevValues) => ({
                                        ...prevValues,
                                        gruposMusculares: checked
                                        ? [...prevValues.gruposMusculares, e]
                                        : prevValues.gruposMusculares.filter((value) => value !== e),
                                    }));
                                    }}
                                />
                                }
                                label={e}
                            />
                            ))}
                        </FormGroup>
                        </Grid>


                        <Grid item md={12}>
                        <b>TIPS*</b>
                        <FormGroup row>
                            {tips.map((e) => (
                            <FormControlLabel
                                key={e}
                                control={
                                <Checkbox
                                    checked={values.tips.includes(e)}
                                    onChange={(event) => {
                                    const checked = event.target.checked;
                                    setValues((prevValues) => ({
                                        ...prevValues,
                                        tips: checked
                                        ? [...prevValues.tips, e]
                                        : prevValues.tips.filter((value) => value !== e),
                                    }));
                                    }}
                                />
                                }
                                label={e}
                            />
                            ))}
                        </FormGroup>
                        </Grid>
                        <Grid item md={12}>
                            <Button type="submit"  color="error"
                                variant="outlined"    sx={{backgroundColor:  "black",
                                fontFamily:   '"Segoe UI Symbol"',
                                fontSize: "20px",
                                height: "60px",
                                width: "150px",
                                marginLeft: 60,
                                marginRight: 60,
                                marginTop: 3,
                                }} >Crear</Button>
                        </Grid>


                       
                       </Grid>
                
                </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default NuevoEjercicio ; 