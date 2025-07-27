import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Avatar,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Snackbar
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PhotoCamera, Visibility, VisibilityOff, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(4) },
  avatar: { width: 120, height: 120, margin: '0 auto' },
  inputFile: { display: 'none' },
  form: { marginTop: theme.spacing(3) },
  submit: { marginTop: theme.spacing(2) },
  tabs: { marginTop: theme.spacing(2) }
}));

const specialties = ['Data Science', 'Ingénierie Informatique', 'BI', 'Systèmes Embarqués'];
const genders = ['Homme', 'Femme', 'Autre'];

export default function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstname: '', lastname: '', email: '', tel: '', dateNaiss: '', sexe: '', specialite: '',img:''
  });
  const [avatarPreview, setAvatarPreview] = useState('');

  const [tabIndex, setTabIndex] = useState(0);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}api/v1/profil`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      setProfile(res.data);
      setAvatarPreview(res.data.img || '');
    })
    .catch(() => navigate('/login'));
  }, [navigate]);

  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {console.log(reader.result);setProfile(prev => ({ ...prev, img:reader.result}))});
      reader.readAsDataURL(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/v1/update`, profile, {
        headers: {  Authorization: localStorage.getItem('token') }
      });
      setMessage('Profil mis à jour !');
      setSnackOpen(true);
    }
     catch (err) {
      setMessage(err.response.data.message || 'Erreur lors de la mise à jour');
      setSnackOpen(true);
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/v1/reset-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setMessage('Mot de passe mis à jour !');
      setSnackOpen(true);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage((err.response && err.response.data.message) || 'Erreur mot de passe');
      setSnackOpen(true);
    }
  };

  return (<>
    <Navbar />
    <Container maxWidth="sm" className={classes.root}>
      <Tabs
        value={tabIndex}
        onChange={(e, v) => setTabIndex(v)}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
        centered
      >
        <Tab label="Mon Profil" />
        <Tab label="Changer mot de passe" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
          <Avatar src={avatarPreview} className={classes.avatar} />
          <input accept="image/*" className={classes.inputFile} id="avatar-upload" type="file" onChange={handleAvatar} />
          <label htmlFor="avatar-upload">
            <IconButton component="span"><PhotoCamera /></IconButton>
          </label>

          <form className={classes.form} onSubmit={handleProfileSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Prénom" name="firstname" variant="outlined" fullWidth
                  value={profile.firstname} onChange={handleProfileChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Nom" name="lastname" variant="outlined" fullWidth
                  value={profile.lastname} onChange={handleProfileChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email" name="email" variant="outlined" fullWidth
                  value={profile.email} onChange={handleProfileChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Téléphone" name="tel" variant="outlined" fullWidth
                  value={profile.tel} onChange={handleProfileChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Date de naissance" name="dateNaiss" type="date" variant="outlined" fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={profile.dateNaiss.split('T')[0] || ''}
                  onChange={handleProfileChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Genre" name="sexe" variant="outlined" fullWidth
                  value={profile.sexe} onChange={handleProfileChange}>
                  {genders.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={specialties}
                  value={profile.specialite}
                  onChange={(e, v) => setProfile({ ...profile, specialite: v })}
                  renderInput={params => <TextField {...params} label="Spécialité" variant="outlined" fullWidth />} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                  Enregistrer mon profil
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <form className={classes.form} onSubmit={handlePasswordSubmit}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Ancien mot de passe</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Ancien mot de passe"
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Nouveau mot de passe</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Nouveau mot de passe"
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
              Changer mon mot de passe
            </Button>
          </form>
        </Box>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackOpen}
        message={message}
        action={<IconButton size="small" color="inherit" onClick={() => setSnackOpen(false)}><Close fontSize="small" /></IconButton>}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={3000}
      />
    </Container>
  </>);
}
