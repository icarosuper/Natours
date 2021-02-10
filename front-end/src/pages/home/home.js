import {Box, Button, Grid, Typography} from "@material-ui/core";


export const Home = () => {


    return (
        <Grid container={1} direction={"column"} style={{backgroundColor: 'rgba(33,33,33, 0.6)'}}>
            <Box my={'auto'} alignSelf={'center'} display={'flex'} flexDirection={'column'}>
                <Box mx={'auto'} >
                    <Typography style={{color: 'white', fontSize: '40px'}}>Natours</Typography>
                </Box>
                <Box >
                    <Typography style={{color: 'white', fontSize: '20px'}}>Venha explorar com seus amigos!</Typography>
                </Box>
            </Box>

        </Grid>

    )
}