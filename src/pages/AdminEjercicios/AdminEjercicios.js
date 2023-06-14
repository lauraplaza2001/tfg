import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListaEjercicios from "../../components/ListaEjercicios/ListaEjercicios";



const AdminEjercicios = ({user}) => {

    const [ejercicios,setEjercicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [nombre,setNombre] = useState("");

    const navigate = useNavigate();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;





    const getEjercicios = async () => {
    const ej = await axios.get("http://localhost:8001/ejercicios/")
    setEjercicios(ej.data);
    console.log(ejercicios);
    setCargando(false);

    }

    const busquedaNombre = async () => {
    if (nombre == "") {
        getEjercicios()

    }else{
        const ej = await axios.get("http://localhost:8001/ejercicios/filter/nombre/" + nombre)
        setEjercicios(ej.data);
        console.log(ejercicios);
        setCargando(false);

    }
    }


    useEffect(() => {
        getEjercicios()
       
         }, [cargando]);
    
        const item = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        
      };
    
      const handleChangeNombre = (event) => {
        setNombre(event.target.value)
    };



    if (cargando) {
        return <CircularProgress />;
    }
        return( 
          <Box
          sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#FFFFFF'}}>
            <Container sx={{ mt: 3, mb: 3, display: 'flex' }}>
              <Grid container spacing={1}>
    
                <Grid item xs={3} md={6}>
                  <Box sx={item}>
                  <Container maxWidth="false"  sx={{ mt: 2, mb:2, textAlign:"left" } }>
                    <TextField value={nombre} placeholder="Nombre" name="Nombre" label="Nombre" sx={{ width: 300 }} onChange={handleChangeNombre}/>
                    <Button
                        color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "150px",
                        ml: 2 }}
                        onClick={() => busquedaNombre()}
                    >
                      Filtrar
                    </Button>
                  </Container>
                  </Box>
                </Grid>

                <Grid item xs={3} md={6}>
                  <Box sx={item}>
                  <Container maxWidth="false"  sx={{ mt: 2, mb:2, textAlign:"left" } }>
                  
                    <Button
                        color="error"
                        variant="outlined"    sx={{backgroundColor:  "black",
                        fontFamily:   '"Segoe UI Symbol"',
                        fontSize: "20px",
                        height: "60px",
                        width: "200px",
                        ml: 2 }}
                        onClick={() => navigate("/NuevoEjercicio")}
                    >
                      Crear Ejercicio
                    </Button>
                  </Container>
                  </Box>
                </Grid>
    
    
    
    
    
    
    
    
    
    
    
    
    
                <ListaEjercicios admin={true} locations={ejercicios}></ListaEjercicios>
    
    
              </Grid>
            </Container>
          </Box>
    
    
           
        );
    
    }


  export default AdminEjercicios;