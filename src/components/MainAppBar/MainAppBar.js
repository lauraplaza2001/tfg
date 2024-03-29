import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'mui-image';
import { useNavigate } from 'react-router-dom';
import { Styler } from '../Styler/Styler';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

const MainAppBar = ({ login }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [log, setLog] = useState(false);
  const [photo, setPhoto] = useState("");
  const [user, setUser] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logIn = (token) => {
    axios.get("http://localhost:8000/usuarios/logIn/" + token.credential).then((response) => {
      setPhoto(response.data.foto);
      login(response.data.usuario);
      setLog(true);
      console.log(response.data.usuario);
      setUser(response.data.usuario);
    });
  };

  const logOut = () => {
    setPhoto("");
    login();
    setLog(false);
  };

  const LogButton = () => {
    if (log) {
      return (
        <Button variant="contained" sx={Styler.logoutbutton}>
          <Image
            src={photo}
            height="50px"
            width="50px"
            onClick={() => {
              logOut();
              console.log('Logout correcto');
            }}
          />
        </Button>
      );
    } else {
      return (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            logIn(credentialResponse);
            console.log('Login correcto');
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      );
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#B84E4E" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenterIcon onClick={() => navigate("/")} sx={{ display: { color: 'black', xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Segoe UI Symbol"',
              fontWeight: 'bold',
              color: 'black',
              align: 'right'
            }}
          >
            Functional Training Assistance
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key="Ejercicios" onClick={handleCloseNavMenu}>
                <Link
                  sx={{
                    textAlign: "center",
                    color: "black",
                  }}
                  onClick={() => navigate("/Ejercicios")}
                  underline="none"
                >
                  Ejercicios
                </Link>
              </MenuItem>

              {user && user.rol === 'ADMIN' && (
                <>
                  <MenuItem key="AdminEjercicios" onClick={handleCloseNavMenu}>
                    <Link
                      sx={{
                        textAlign: 'center',
                        color: 'black',
                      }}
                      onClick={() => navigate('/AdminEjercicios')}
                      underline="none"
                    >
                      Ejercicios Admin
                    </Link>
                  </MenuItem>
                  <MenuItem key="AdminUsuarios" onClick={handleCloseNavMenu}>
                    <Link
                      sx={{
                        textAlign: 'center',
                        color: 'black',
                      }}
                      onClick={() => navigate('/AdminUsuarios')}
                      underline="none"
                    >
                      Usuarios
                    </Link>
                  </MenuItem>
                </>
              )}

              {/* ...otros elementos del menú... */}

            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Functional Training Assistance
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="Ejercicios"
              onClick={() => navigate("/Ejercicios")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Ejercicios
            </Button>

            {user && user.rol === 'ADMIN' && (
              <>
                <Button
                  key="AdminEjercicios"
                  onClick={() => navigate('/AdminEjercicios')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Ejercicios Admin
                </Button>
                <Button
                  key="AdminUsuarios"
                  onClick={() => navigate('/AdminUsuarios')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Usuarios
                </Button>
              </>
            )}

  

          </Box>
          <LogButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainAppBar;
