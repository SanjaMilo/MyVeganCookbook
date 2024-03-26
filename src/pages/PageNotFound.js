import useHeaderHeight from "../hooks/useHeaderHeight";
import { Container, Grid, Typography } from "@mui/material";

const PageNotFound = () => {
    const headerHeight = useHeaderHeight();
    const viewPortHeight = window.innerHeight - headerHeight - 120;

  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{
          mt: `${headerHeight}px`,
          pt: '50px',
          justifyContent: "center",
          pb: "70px",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} sx={{ textAlign: "center", minHeight: `${viewPortHeight}px`}}>
          <Typography
            variant="h2"
            component="div"
            sx={{
              fontFamily: '"Ephesis"',
              color: "secondary.dark",
              mb: "3rem",
            }}
          >
            Oops, no such page. Go back to home page.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PageNotFound;
