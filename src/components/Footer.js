import { Typography, Grid } from "@mui/material";

const Footer = () => {

    return (
        <Grid container sx={{ justifyContent: 'center', textAlign: 'center', }}>
            <Grid item xs={8}>
                <Typography variant="subtitle2" sx={{position: "absolute", bottom: '16px', left: 0, right: 0, color: 'primary.dark'}}>
                    Copyright &copy; Sanja Miloradovic 2024
                </Typography>
            </Grid>
        </Grid>
    )
};

export default Footer;