import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";


const Navbar = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['access_token']);
  // Global state: (we can also use state to check if we have user logged in or not, in order to show or hide log in or sign up links or the log out link)
  //const user = useSelector((state) => state.user.user); 
  const { logout } = useLogout();


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
                <Button sx={{ my: 2, display: "block" }}>Log In</Button>
              </Link>
              <Link to="/signup">
                <Button sx={{ my: 2, display: "block" }}>Sign Up</Button>
              </Link>
            </>
          ) : (
            (
            <Button onClick={logout} sx={{ my: 2, display: "block" }}>
              Log Out
            </Button>
          )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
