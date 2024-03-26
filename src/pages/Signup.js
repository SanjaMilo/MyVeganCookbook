import { useState } from "react";
import useHeaderHeight from "../hooks/useHeaderHeight";
import { Container, Grid, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import { useLoginSignup } from "../hooks/useLoginSignup";


const Signup = () => {
  const headerHeight = useHeaderHeight();

  const url = '/api/user/signup';

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
        <Grid item xs={8} sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "primary.main",
              mb: "1.5rem",
            }}
          >
            Sign Up:
          </Typography>
        </Grid>
        <Grid item xs={6}>
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

export default Signup;
