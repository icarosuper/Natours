import {Box, Button, Grid} from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import {TourCard} from "../../components/tours/TourCard";
import {useEffect, useState} from "react";


export const Tours = () => {
    const [tours,setTours] = useState([])
    const history = useHistory()
    useEffect(() => {
        setTours([{teste:'eae'}, {teste:'eae gay'}, {teste: 'ta tao serio pq?'}])
    },[])

    return(
            <Grid container={1} direction={"column"}  alignItems={"center"}  style={{backgroundColor:'rgba(33,33,33, 0.6)'}}>
                <Grid alignContent={'center'} direction={'row'} wrap={1}  xs={6} md={6} lg={6} xl={12} item={1} style={{backgroundColor:'rgba(0,0,0, 0.8)'}}>

                    {tours.map( tour => <TourCard tour={tour}/> )}
                </Grid>
            </Grid>
    )
}