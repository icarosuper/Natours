import {Button, Box, Grid} from "@material-ui/core";
import {useHistory} from 'react-router-dom'

export const Navbar = () => {
    const history = useHistory()

    return (
        <Box  style={{backgroundColor: 'rgba(0,0,0, 0.9)'}} minHeight={'10vh'} display={'flex'} >
            <Grid  container={1}   direction={'row'}  justify={'space-between'}>
                <Button style={{backgroundColor: 'white'}} onClick={() => history.push('/tours')}>Tours</Button>
                <Button style={{backgroundColor: 'white'}} onClick={() => history.push('/')} >Home</Button>
                <Button style={{backgroundColor: 'white'}}>Entrar/Cadastrar</Button>
            </Grid>

        </Box>

    )
}