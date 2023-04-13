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



const Ejercicios = ({usuario}) => {
    const [ejercicios,setEjercicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [nombre,setNombre] = useState("");
    const [dificultad,setDificultad] = useState("");
    const [gruposMusculares,setGruposMusculares] = useState([])
    const navigate = useNavigate();
   


{/* ETSTO ES PARA LA SELECCION DE MUICHOS GRUPOS MUSCULARES */ }
const gmus = ["Piernas", "Brazos", "Espalda", "Hombros" , "Pecho", "Abdomen"]
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


    const busquedaDificultad = async () => {
      if (dificultad == "" ) {
        getEjercicios()

      }else{
        const ej = await axios.get("http://localhost:8001/ejercicios/filter/dificultad/" + dificultad)
        setEjercicios(ej.data);
        console.log(ejercicios);
        console.log(dificultad);
        setCargando(false);

      }
    }

    const busquedaGruposMusculares = async () => {
      if (gruposMusculares.length == 0  ) {
        getEjercicios()

      }else{
        const gruposMuscularesJSON= JSON.stringify(gruposMusculares)
        const ej = await axios.get("http://localhost:8001/ejercicios/filter/gruposMusculares?lista=${gruposMuscularesJSON}")
        setEjercicios(ej.data);
        console.log(ejercicios);
        console.log(dificultad);
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
  const handleChangeDificultad = (event) => {
    setDificultad(event.target.value)
  }

  const handleChangeGruposMusculares = (event) => {
    const {
      target: { value },
    } = event;
    setGruposMusculares(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



    return( 
      <Box
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#FFFFFF'}}>
        <Container sx={{ mt: 3, mb: 3, display: 'flex' }}>
          <Grid container spacing={1}>

            <Grid item xs={7} md={7}>
              <Box sx={item}>
              <Container maxWidth="false"  sx={{ mt: 2, textAlign:"left" } }>
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







            <Grid item xs={5} md={5}>
              <Box sx={item}>
                <Container maxWidth="false" >
                  <FormControl sx={{ mt: 2, minWidth: 140}} size="medium">
                    <InputLabel id="demo-select-small">Dificultad</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={dificultad}
                      label="Dificultad"
                      onChange={handleChangeDificultad}
                    >
                      <MenuItem value={"ALTA"}>Alta</MenuItem>
                      <MenuItem value={"MEDIA"}>Media</MenuItem>
                      <MenuItem value={"BAJA"}>Baja</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "60px",
                    width: "150px",
                    ml: 2,
                  mt: 2 }}
                    onClick={() => busquedaDificultad()}
                >
                  Filtrar
                </Button>
                </Container>
              </Box>
            </Grid>




            <Grid item xs={12} md={12}>
              <Box sx={item}>
              <Container maxWidth="false" >
                <FormControl sx={{  mt: 2, minWidth: 240 }}size="medium">
                  <InputLabel id="demo-multiple-chip-label">Grupos Musculares</InputLabel>
                    <Select
                       labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={gruposMusculares}
                      onChange={handleChangeGruposMusculares}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                     {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                   ))}
                                   
                                </Box>
                               )}
                       MenuProps={MenuProps}
                       >
                      {gmus.map((gm) => (
                        <MenuItem
                          key={gm}
                          value={gm}
                          style={getStyles(gm, gruposMusculares, theme)}
                        >
                          {gm}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "60px",
                    width: "150px",
                    ml: 2 ,
                    mt: 2}}
                    onClick={() => busquedaGruposMusculares()}
                >
                  Filtrar
                </Button>


                  
                </Container>
              </Box>
            </Grid>





            
           




        
          
        




            



      
          </Grid>
        </Container>
      </Box>


       
    );

}

export default Ejercicios ; 