import {React} from 'react';
import {AppBar, Typography} from "@material-ui/core";
import styles from './Header.css'

export default function MobileHeader(props){



    return(
        <AppBar position='static' classesName={styles.}>
            <Typography variant="h6" >
                Rentix
            </Typography>
        </AppBar>
    )
}
