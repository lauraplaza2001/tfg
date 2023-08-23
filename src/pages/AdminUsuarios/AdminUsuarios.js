import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const AdminUsuarios = ({tips,dificultades,gruposMusculares, user}) => {
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