import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        
        <div className = "mt-5">
        <Grid container justify='center' alignContent='center'>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '100px' }}>
                        <Typography variant="headline" gutterBottom>
                            Signup
                        </Typography>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Username</InputLabel>
                            <Input  onChange={handleChange('name')}  value={name}  name='username' fullWidth />
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Email</InputLabel>
                            <Input  onChange={handleChange('email')} value={email}  name='email' fullWidth />
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Password</InputLabel>
                            <Input  value={password}  onChange={handleChange('password')}  fullWidth name='password' type='password' />
                        </FormControl>
                        
                        
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={clickSubmit}
                            >
                                OK
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
           
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
