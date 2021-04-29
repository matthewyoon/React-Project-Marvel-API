import React from 'react';

// New Styles Import for Material-UI
import { makeStyles, Button } from '@material-ui/core'
// import Button from '@material-ui/core/Button';   --> This is using the default export. See above for the one line
import marvel_homepage from '../../assets/images/marvel_homepage.jpg' // Won't know how to source the image
import { Link } from 'react-router-dom'
import { AuthCheck } from 'reactfire'

interface Props {
    title: string;
}

// New Make Styles CSS Object
const useStyles = makeStyles({
    root:{
        padding: '0',
        margin: '0'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        margin: '0 0 0 0.45em'
    },
    logo_a: {
        color: 'rgb(28,24,22)'
    },
    logo_navigation: {
        listStyle: 'none',
        textTransform: 'uppercase',
        textDecoration: 'none;',
        fontFamily: 'sans-serif'
    },
    navigation: {
        display: 'flex'
    },
    nav_a: {
        display: 'flex',
        padding: '1em',
        color: 'black',
        fontFamily: 'sans-serif',
        textDecoration: 'none'
    },
    credit:{
        fontSize: '8px'
    },
    main: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${marvel_homepage})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute'
    },
    main_text: {
        textAlign: 'center',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        paddingBottom: '2px'
    }
})

export const Home = ( props:Props) => {
    
    // New Classes variable
    const classes = useStyles();
    return (
        <div className = {classes.root}>
            { /* Nav Bar Code Here */ }
            <nav>
                <div className={classes.navbar_container}>
                    <h1 className={classes.logo}>
                        <Link to="/" className={ `${classes.logo_a} ${classes.logo_navigation}`}>{props.title}</Link>
                    </h1>
                    <ul className={ `${classes.navigation} ${classes.logo_navigation}`}>
                        <li>
                            <Link to="/" className={classes.nav_a}>Home</Link>
                        </li>
                        
                        <AuthCheck fallback={
                            <li>
                                <Link to="/signin" className={classes.nav_a}>Sign In</Link>
                            </li>
                        }>                       
                        <li>
                            <Link to="/dashboard" className={classes.nav_a}>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/signin" className={classes.nav_a}>Sign Out</Link>
                        </li>
                        </AuthCheck>
                    </ul>
                </div>
            </nav>

            <main className={classes.main}>
            <p className={classes.credit}>Photo By: Erik Mclean</p>
                <div className={classes.main_text}>
                    <h1> { props.title }</h1>
                    <p>I Like Drones!</p>
                    <Link to = '/signin'>
                        <Button color = 'primary' variant = 'contained'>Sign In</Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}