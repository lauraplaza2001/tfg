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
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const AdminUsuarios = ({tips,dificultades,gruposMusculares}) => {
    const [usuarios,setUsuarios] = useState([])
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);
    const [nombre,setNombre] = useState("");
    const item = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
      
    };

    const getUsuarios = async () => {
        const ej = await axios.get("http://localhost:8000/usuarios/")
        setUsuarios(ej.data);
        console.log(usuarios);
        setCargando(false);
   
    }

    const busquedaNombre = async () => {
        if (nombre == "") {
          getUsuarios()
  
        }else{
          const ej = await axios.get("http://localhost:8000/usuarios/filter/nombre/" + nombre)
          setUsuarios(ej.data);
          console.log(usuarios);
          setCargando(false);
  
        }
      }
    

  useEffect(() => {
    getUsuarios()
   
     }, [cargando]);

     const handleChangeNombre = (event) => {
        setNombre(event.target.value)
    };



return(
    <Box
    sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#FFFFFF'}}>
      <Container sx={{ mt: 3, mb: 3, display: 'flex' }}>
        <Grid container spacing={1}>

          <Grid item xs={8} md={9}>
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

          <Grid item xs={4} md={3}>
            <Button
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "60px",
                    width: "200px",
                    mt: 2 }}
                    onClick={() => navigate("/NuevoUsuario")}
                >
                   Crear Usuario
              </Button>
          </Grid>
          
          <Grid item xs={12} md={12}>
          <TableContainer component={Paper} sx={{ marginTop: 6 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell><b>NOMBRE</b></TableCell>
                    <TableCell align="right"><b>CORREO ELECTRÓNICO</b></TableCell>
                    <TableCell align="right"><b>ROL</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {usuarios.map((usuario) => (
                    <TableRow
                    key={usuario._id.$oid}
                    onClick={() => navigate("/ModificarUsuario/" + usuario._id.$oid, { state: { usuario } })}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {usuario.nombre}
                    </TableCell>
                    <TableCell align="right">{usuario.email}</TableCell>
                    <TableCell align="right">{usuario.rol}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>






          </Grid>








   



        </Grid>
      </Container>
    </Box>

    
)

}
export default AdminUsuarios;