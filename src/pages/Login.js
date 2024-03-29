import { useState } from "react";
import useHeaderHeight from "../hooks/useHeaderHeight";
import { Container, Grid, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import { useLoginSignup } from "../hooks/useLoginSignup";


const Login = () => {
  const headerHeight = useHeaderHeight();

  const url = 'https://myvegancookbook-api.onrender.com/api/user/login';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error, login } = useLoginSignup();

  const submitForm = async (e) => {
    e.preventDefault();
    await login(email, password, url);
  };

  return (
    <Container>
      <Grid
        container
        sx={{
          mt: `${headerHeight + 50}px`,
          justifyContent: "center",
          pb: "70px",
        }}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "primary.main",
              mb: "1.5rem",
            }}
          >
            Log In:
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <UserForm
            submitForm={submitForm}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            error={error}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
