// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './Login.css';
import { useDispatch } from 'react-redux';
import ProblemsAction from '../action/ProblemsAction';
import testAvenir from "../action/testAvenir";


function Log() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/user/login`,
         { email, password ,role}
      );
      console.log("ollla bb",res.data)
      const token = res.data.token;
      localStorage.setItem('token', "Bearer "+token);
      dispatch({ type: "initilaiserUser", payload:res.data.user  });
      dispatch(testAvenir())
      dispatch(ProblemsAction.GetProblems());
       navigate('/');
      
    } catch (err) {
        console.log(err)
      const msg =  "Erreur lors de la connexion";
      setError(msg);
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <img src="assets/image/logo-skillmatch.png" alt="SkillMatch" className="login-logo" />
      <Typography variant="h4" align="center" gutterBottom>
        Connexion
      </Typography>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl variant="outlined" fullWidth required margin="normal">
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mot de passe"
          />
        </FormControl>
        <div className="login-role">
          <Button
            variant={role === 'candidat' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setRole('candidat')}
          >
            Candidat
          </Button>
          <Button
            variant={role === 'recruteur' ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => setRole('recruteur')}
          >
            Recruteur
          </Button>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="login-submit"
        >
          Se connecter
        </Button>
        <Grid container justifyContent="flex-end" style={{ marginTop: 16 }}>
          <Grid item>
            <Link href="/signup" variant="body2">
              Pas encore de compte ? Inscription
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Log;
