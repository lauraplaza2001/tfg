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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import ListaEjercicios from "../../components/ListaEjercicios/ListaEjercicios";



const AdminEjercicios = () => {

    const [ejercicios,setEjercicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [nombre,setNombre] = useState("");

    const navigate = useNavigate();

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