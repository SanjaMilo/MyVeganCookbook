import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useCookies } from "react-cookie";
//import { useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';


const Navbar = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['access_token']);
  // Global state: (we can also use state to check if we have user logged in or not, in order to show or hide log in or sign up links or the log out link)
  //const user = useSelector((state) => state.user.user); 
  const { logout } = useLogout();
  
  // Menu links
  const pages = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Create Recipe',
      link: '/create-recipe'
    },
    {
      title: 'Saved Recipes',
      link: '/saved-recipes'
    },
  ]

  // Menu
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: "floralwhite", color: "primary.main" }}
        position="fixed"
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Link to="/">
              <Typography
                variant="h3"
                noWrap
                className="logo"
                sx={{
                  marginRight: "3rem",
                  flexGrow: 1,
                  fontFamily: "Ephesis",
                  textDecoration: "none",
                  color: "primary.main",
                  cursor: "pointer",
                  maxWidth: "fit-content",
                }}
              >
                My Vegan
                <span
                  style={{ fontSize: "2rem" }}
                  className="material-symbols-outlined"
                >
                  eco
                </span>
                Cookbook
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <Button sx={{ my: 2, display: "block" }}>Home</Button>
            </Link>
            <Link to="/create-recipe">
              <Button sx={{ my: 2, display: "block" }}>Create Recipe</Button>
            </Link>
            <Link to="/saved-recipes">
              <Button sx={{ my: 2, display: "block" }}>Saved Recipes</Button>
            </Link>
          </Box>
          {!cookies.access_token ? (
            <>
              <Link to="/login">
                <Button className="user-btn" sx={{ my: 2, display: "block" }}>Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="user-btn" sx={{ my: 2, display: "block" }}>Sign Up</Button>
              </Link>
            </>
          ) : (
            (
              <Button className="user-btn" onClick={logout} sx={{ my: 2, display: "block" }}>
                Log Out
              </Button>
            )
          )}
         
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link to={page.link}>
                    <Typography sx={{textAlign: 'center', color: 'primary.main'}}>{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
