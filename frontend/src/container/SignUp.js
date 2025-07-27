import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Link as MuiLink,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  MenuItem,
  Avatar
} from '@material-ui/core';
import { Visibility, VisibilityOff, PhotoCamera } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Signup.css';

const specialties = ['Data Science', 'Ingénierie Informatique', 'BI', 'Systèmes Embarqués'];
const roles = ['candidat', 'recruteur'];
const genders = ['Homme', 'Femme'];

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('candidat');
  const [specialty, setSpecialty] = useState(null);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setAvatarPreview(URL.createObjectURL(file));
      const reader = new FileReader();
  reader.onload = () => {
    setAvatar(reader.result);
  };
  reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('specialite', specialty);
      formData.append('sexe', gender);
      formData.append('dateNaiss', dob);
      formData.append('tel', phone);
      if (avatar) formData.append('img', avatar);

      await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/user/register`,
        formData,
         { headers: { 'Content-Type': 'application/json' } }
       
      );
      navigate('/login');
    } catch (err) {
      const msg = err.response.data.message || "Erreur lors de l'inscription.";
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" className="signup-container">
      <img src="assets/image/logo-skillmatch.png" alt="SkillMatch" className="signup-logo" />
      <Typography variant="h4" align="center" gutterBottom>
        Créer un compte
      </Typography>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="signup-form">
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: 'center' }} >
            <input 
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton component="span"  >
                {avatarPreview ? (
                  <Avatar src={avatarPreview} className="signup-avatar"    style={{ width: 100, height: 100 }}

 />
                ) : (
                  <Avatar className="signup-avatar"    style={{ width: 100, height: 100 }}

>
                    <PhotoCamera />
                  </Avatar>
                )}
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prénom"
              variant="outlined"
              fullWidth
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Genre"
              variant="outlined"
              fullWidth
              required
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              {genders.map(g => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel htmlFor="pwd">Mot de passe</InputLabel>
              <OutlinedInput
                id="pwd"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel htmlFor="confirm">Confirmer mot de passe</InputLabel>
              <OutlinedInput
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
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
                label="Confirmer mot de passe"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date de naissance"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              value={dob}
              onChange={e => setDob(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Téléphone"
              variant="outlined"
              type="tel"
              fullWidth
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={specialties}
              value={specialty}
              onChange={(e, val) => setSpecialty(val)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Spécialité"
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>

          

            <Grid item xs={12} sm={6}>
            <Autocomplete
              options={roles}
              value={role}
              onChange={(e, val) => setRole(val)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Vous êtes"
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>
    
          <Grid item   xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="signup-submit"
            >
              S'inscrire
            </Button>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: 16 }}>
            <Typography variant="body2">
              Déjà un compte ?{' '}
              <MuiLink href="/login" color="primary">
                Se connecter
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Signup;
