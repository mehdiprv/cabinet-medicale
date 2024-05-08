import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';// ... Autres importations ...
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: 'calc(100% - ${drawerWidth}px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    // Ajoutez le code de déconnexion ici, par exemple, redirection vers la page de connexion.
    navigate('/SignIn'); // Utilisez navigate pour rediriger vers la page de connexion.
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Cabinet Medicale
            </Typography>
            <IconButton >
              <Link to="/Profille">
              <AccountCircleIcon color='dark'/>
              </Link>
            </IconButton>
            <Link to="/Login" color="inherit" style={{ textDecoration: 'none' }}>
  <IconButton color="inherit">
    <ExitToAppIcon />
  </IconButton>
</Link>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">

            <Divider sx={{ my: 1 }} />
            <ListItem component={RouterLink} to="/principale/patientlist" button>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Patients" />
            <Button component={RouterLink} to="/principale/addpatient" color="primary">
               ADD
            </Button> 
            </ListItem>
            <ListItem component={RouterLink} to="/principale/MedcinList " showDeleteButton={true}  button>
            <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary="Medcins" />
              <Button component={RouterLink} to="/principale/addmedcins" color="primary">
               ADD
            </Button> 
            </ListItem>
            <ListItem component={RouterLink} to="/principale/DossierMedicauxList" button>
              <ListItemIcon>
                {/* Remplacez AssignmentIndIcon par l'icône de votre choix, par exemple EventNoteIcon */}
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Dossier-médical" />
              <Button component={RouterLink} to="/principale/adddossier" color="primary">
               ADD
            </Button> 
            </ListItem>
            <ListItem component={RouterLink} to="/principale/Rendez-vous" button>
              <ListItemIcon>
                {/* Remplacez AssignmentIndIcon par l'icône de votre choix, par exemple EventNoteIcon */}
                <AssignmentIndIcon  />
              </ListItemIcon>
              <ListItemText primary="Rendez-vous" />
              <Button component={RouterLink} to="/principale/addrdv" color="primary">
               ADD
            </Button> 
            </ListItem>
          </List>
          
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {props.children}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}