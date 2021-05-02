import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../sharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar,  } from '@material-ui/core';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom'
import sign_in from '../../assets/images/sign_in.jpg'

// Functional component created inside of this component
// Will only be used to close snackbar
const Alert = (props:AlertProps) =>{
    return<MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles({
    googleButton:{
        backgroundColor: 'rgb(66,133,244)',
        marginTop: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px, 2px, 4px, 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle:{
        fontFamily: 'Roboto, arial, sans-serif',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle:{
        marginTop: '15vh',
        border: '1px solid black',
        color: 'white',
        textShadow: '1px 1px 4px black',
        maxWidth: '550px',
        padding: '30px 10px 30px 10px',
        backgroundColor: 'rgba(255,255,255,0.5)',
        fontFamily: 'sans-serif'
    },
    snackBar:{
        color: 'white',
        backgroundColor: '#4caf50'
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
        color: 'white',
        textShadow: '1px 1px 4px black'
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
        textShadow: '1px 1px 4px black',
        fontFamily: 'sans-serif',
        textDecoration: 'none'
    },
    main: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${sign_in})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute'
    },
    topspace:{
        marginTop: '1.5vh'
    }
})

interface SignInProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
    title: string;
}

export const SignIn = withRouter( (props:SignInProps) => {

    const auth = useAuth();
    const classes = useStyles();
    const { history } = props
    const [open, setOpen] = useState(false);

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = (event?: React.SyntheticEvent, reason?:string) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false)
        history.push('/')
    }

    const sign_in = async () => {
        const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
        if(response.user){
            handleSnackOpen()
        }
    };

    const sign_out = async () => {
        await auth.signOut();
    }


    return (
        <div>
            <main className={classes.main}>
            <nav>
                {/* NavBar Code within the background image */}
                <div className={classes.navbar_container}>
                    <h1 className={classes.logo}>
                        <Link to="/" className={ `${classes.logo_a} ${classes.logo_navigation}` }>{props.title}</Link>
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
            <Container maxWidth = 'sm' className={classes.containerStyle}>
                <Typography className={classes.typographyStyle}>Sign In Below</Typography>
                <form>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <Input name='email' placeholder='Enter Email Here' />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input name='password' placeholder='Enter Password Here' />
                    </div>
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </form>

                <AuthCheck fallback={
                    <Button className={classes.googleButton} onClick = {sign_in}>Sign In With Google</Button>
                }>
                    <Button variant='contained' color='secondary' className={classes.topspace} onClick={sign_out}>Sign Out</Button>
                </AuthCheck>
                <Snackbar message={'Success!'} open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity='success'>
                        Successful Sign In = Redirect in 6 seconds
                    </Alert>
                </Snackbar>
            </Container>
            </main>
        </div>
    )
})