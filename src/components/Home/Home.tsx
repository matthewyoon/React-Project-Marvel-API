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
        color: 'white'
    },
    logo_navigation: {
        listStyle: 'none',
        textTransform: 'capitalize',
        textDecoration: 'none;',
        fontFamily: 'sans-serif'
    },
    navigation: {
        display: 'flex'
    },
    nav_a: {
        display: 'flex',
        padding: '1em',
        color: 'white',
        fontFamily: 'sans-serif',
        textDecoration: 'none'
    },
    credit:{
        fontSize: '9px',
        color: 'white',
        fontFamily: 'sans-serif',
        margin: '0 0 0 .8vw'

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
        border: '1px solid black',
        position: 'relative',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textShadow: '1px 1px 4px black',
        maxWidth: '500px',
        padding: '30px 10px 30px 10px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        fontFamily: 'sans-serif'
    },
    transparent:{
        backgroundColor: 'rgba(255,255,255,0.8)',
    }
})

export const Home = ( props:Props) => {
    
    // New Classes variable
    const classes = useStyles();
    return (
        <div className = {classes.root}>
            <main className={classes.main}>
            <nav>
                {/* NavBar Code within the background image */}
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
            <p className={classes.credit}>Photo By: Erik Mclean</p>
                <div className={classes.main_text}>
                    <h1> { props.title }</h1>
                    

                    <AuthCheck fallback={
                            
                        <Link to="/signin">
                            <Button color = 'primary' variant = 'contained'>Sign In</Button>
                        </Link>
                            
                        }>     

                        <Link to="/dashboard">
                            <Button color = 'primary' variant = 'contained'>Dashboard</Button>
                        </Link>
                        </AuthCheck>

                    {/* <Link to = '/signin'>
                        <Button color = 'primary' variant = 'contained'>Sign In</Button>
                    </Link> */}
                </div>
            </main>
        </div>
    )
}