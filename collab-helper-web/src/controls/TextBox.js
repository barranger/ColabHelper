import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    width: '100%',
    padding: '10px 8px 11px',
    border: '1px solid #999',
    borderRadius: '4px',
    '&:focus': {
      borderColor: theme.palette.primary.main,
      outline: 'none',
      '& + label': {
        color: theme.palette.primary.main,
      },
    },
  },
  label: {
    display: 'flex',
  },
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
}));

const TextBox = (props) => {
  const classes = useStyles();
  const {
    className, onChange, value, label,
  } = props;
  return (
    <div className={[className, classes.root].join(' ')}>
      <input className={classes.text} onChange={onChange} value={value} />
      <label className={classes.label}>{label}</label>
    </div>
  );
};

export default TextBox;
