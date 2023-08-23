import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Styler } from '../../components/Styler/Styler';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';


const ModificarEjercicio = ({tips,dificultades,gruposMusculares,user}) => {
    const navigate = useNavigate();
    const ejercicio = useLocation().state.ejercicio

    const defaultValues= {
        nombre: ejercicio.nombre,
        descripcion: ejercicio.descripcion,
        video: ejercicio.video,
        foto: ejercicio.foto,
        gruposMusculares: ejercicio.gruposMusculares,
        tips: ejercicio.tips,
        dificultad: ejercicio.dificultad
    }
    const [values, setValues] = useState(defaultValues);
    useEffect(() => {
        console.log(values)
        if(user==undefined){
            console.log(user)
            alert("Por favor, inicie sesión")
            navigate("/")
          }
          });



    

      const handleChangeDificultad = (event) => {
        const value = event.target.value;
        setValues({ ...values, dificultad: value });
      };
      

      
      
      


    const eliminarEjercicio = (data) => {
        console.log(ejercicio.nombre)
        console.log(ejercicio.descripcion)
            axios.delete("http://localhost:8001/ejercicios/eliminar/" + ejercicio.descripcion + "/" + ejercicio.nombre ,
              ).then(() => {
                    alert("Ejercicio eliminado con éxito")
                    navigate("/AdminEjercicios")
                }).catch((response) =>{
                    console.log(response);
                    
                });
           
    
    };

    


    const editarEjercicio = (data) => {
        console.log("hola")

        if (values.gruposMusculares.length >= 1  && values.tips.length >= 1 )
            {        
            console.log(values)
 

            axios.put("http://localhost:8001/ejercicios/editar",
                {
                    "nombre" : values.nombre,
                    "descripcion" : values.descripcion,
                    "dificultad" : values.dificultad,
                    "video" : values.video,
                    "foto" : values.foto,
                    "tips" : values.tips,
                    "gruposMusculares" : values.gruposMusculares,
                }).then(() => {
                    alert("Ejercicio modificado correctamente")
                    navigate("/AdminEjercicios")
                    
                }).catch((response) =>{
                    console.log(response);
                    alert("Error, rellene todos los campos correctamente")
               
                });
            }else {
                alert("Error seleccione al menos un tip y y un grupo muscular")
            }
    
    };


    const validationSchema = Yup.object().shape({
        foto: Yup.string().required("Enlace a foto obligatorio"),
        video: Yup.string().required("Enlace a vídeo obligatorio"),
        nombre: Yup.string().required("Nombre obligatorio").min(1,"").max(20, "20 caracteres máximo"),                                                                          // eslint-disable-line
        descripcion: Yup.string().required("Descripción Obligatoria").min(20, "20 caracteres mínimo"),                                              // eslint-disable-line
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
        <Grid container spacing={2} sx={{paddingTop: '10px' }}>
             <Grid item container md={3} xs={3} sx={{margin: '40px', marginLeft:'80px'}}  >
             <Button
                        color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "150px",
                        ml: 8 }}
                        onClick={() => navigate("/AdminEjercicios")}
                    >
                     Volver
            </Button>


             </Grid>

             <Grid item container md={4} xs={4} sx={{marginTop: '40px', ml:5}}  >
             <Typography 
                color="black" 
                align="center"
                variant="h2"
                marked="center" 
                style={ Styler.textosombra }
                sx={{ mb: 2 ,ml:8, mr:8}}
                >
             {ejercicio.nombre}
            </Typography>
             </Grid>   
             <Grid item container md={3} xs={3} sx={{marginTop: '40px', marginLeft:'20px'}}  >
             <Button
                        color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "150px",
                        ml: 15 }}
                        onClick={() => eliminarEjercicio()}
                    >
                     Eliminar
            </Button>

            </Grid>




            <Grid item container md={10} xs={10} sx={{margin: '40px', ml: 20, mr: 20}} alignItems="center"  justifyContent="center" >
               
                <form onSubmit={handleSubmit(editarEjercicio)} onKeyPress={e => { e.which === 13 && e.preventDefault() }} noValidate>
                    <Grid container spacing={3} sx={{  paddingRight: '10px', paddingBottom: '10px', border: 2, borderRadius: 5, borderColor: "forFFFFF"}}>
                        
                        <Grid item md={6} alignItems="right" > 
                        
                        <InputLabel id="demo-select-small"> Dificultad*</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            defaultValue={ejercicio.dificultad}
                            label="dificultad"
                            {...register('dificultad')}
                            error={errors.dificultad ? true : false}
                            helperText={errors.dificultad?.message}
                            name='dificultad'
                            required
                            onChange={handleChangeDificultad}
                        >
                            {dificultades.map((e) => (
                            <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}
                        </Select>
                         </Grid>
                       
                        <Grid item md={10}><TextField defaultValue={ejercicio.descripcion} fullWidth multiline rows={3} maxrows={5} label="Descripción" {...register('descripcion')} error={errors.descripcion ? true : false} helpertext={errors.descripcion?.message} name='descripcion' required  onChange={(event) =>setValues({ ...values, descripcion: event.target.value })}/></Grid>
                        <Grid item md={5}><TextField defaultValue={ejercicio.video}  fullWidth label="Enlace Vídeo" {...register('video')} error={errors.video ? true : false} helpertext={errors.video?.message}  name='video' required onChange={(event) =>setValues({ ...values, video: event.target.value })}/></Grid>
                        <Grid item md={5}><TextField defaultValue={ejercicio.foto}  fullWidth label="Enlace Foto" {...register('foto')} error={errors.foto ? true : false} helpertext={errors.foto?.message}  name='foto' required  onChange={(event) =>setValues({ ...values, foto: event.target.value })}/></Grid>
                        <Grid item md={10}>
                        <b>GRUPOS MUSCULARES*</b>
                        <FormGroup row>
                        {gruposMusculares.map((e) => (
                            <FormControlLabel
                            key={e}
                            control={
                                <Checkbox
                                defaultChecked={ejercicio.gruposMusculares.includes(e)}
                                onChange={(event) => {
                                    const checked = event.target.checked;
                                    setValues((prevValues) => {
                                    if (checked) {
                                        // Agregar el grupo muscular seleccionado si no existe
                                        if (!prevValues.gruposMusculares.includes(e)) {
                                        return {
                                            ...prevValues,
                                            gruposMusculares: [...prevValues.gruposMusculares, e],
                                        };
                                        }
                                    } else {
                                        // Eliminar el grupo muscular deseleccionado
                                        return {
                                        ...prevValues,
                                        gruposMusculares: prevValues.gruposMusculares.filter((value) => value !== e),
                                        };
                                    }
                                    return prevValues; // Retornar el estado sin cambios si no hay modificaciones
                                    });
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
                                defaultChecked={ejercicio.tips.includes(e)}
                                onChange={(event) => {
                                    const checked = event.target.checked;
                                    setValues((prevValues) => {
                                    if (checked) {
                                        // Agregar el tip seleccionado si no existe
                                        if (!prevValues.tips.includes(e)) {
                                        return {
                                            ...prevValues,
                                            tips: [...prevValues.tips, e],
                                        };
                                        }
                                    } else {
                                        // Eliminar el tip deseleccionado
                                        return {
                                        ...prevValues,
                                        tips: prevValues.tips.filter((value) => value !== e),
                                        };
                                    }
                                    return prevValues; // Retornar el estado sin cambios si no hay modificaciones
                                    });
                                }}
                                />
                            }
                            label={e}
                            />
                        ))}
                        </FormGroup>
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
                            marginRight: 60,
                            marginTop: 3,
                        }}
                        onClick={() => editarEjercicio()} // Agrega el evento de clic aquí
                        >  Modificar
                        </Button>
                        </Grid>
                       </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default ModificarEjercicio ; 