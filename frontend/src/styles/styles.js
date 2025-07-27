import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const mingColor = '#f34f02';
const dartmouthGreenColor = '#02749d';
const emeraldGreenColor = '#f34f02';

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: mingColor,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: dartmouthGreenColor,
    },
    '&$checked': {
      color: '#3D70B2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: dartmouthGreenColor,
      },
      '&:hover fieldset': {
        borderColor: emeraldGreenColor,
      },
      '&.Mui-focused fieldset': {
        borderColor: mingColor,
      },
    },
  },
})(TextField);

export const useStyles = makeStyles(theme => {
  return {
    paper: {
      margin: theme.spacing(2, 0),
      display: 'flex',
      color: '#387780',
      flexDirection: 'column',
      alignItems: 'center',
      border: `1px solid ${dartmouthGreenColor}`,
      borderRadius: '2rem',
      padding: '1.5rem 2.5rem',
    },
    form: {
      marginTop: theme.spacing(4),
      width: '100%',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: emeraldGreenColor,
      color: 'white',
      padding: '50 50',
      marginRight : '50'
    },
    link: {
      
      textDecoration: 'none !important',
    },
    checkBox: {
      color: `${emeraldGreenColor} !important`,
    },
    error: {
      color: 'red',
    },
    button :{
      marginRight : '100%'
    },
    TextareaAutosize:{
      margin  : '100%'
    }
  };
});