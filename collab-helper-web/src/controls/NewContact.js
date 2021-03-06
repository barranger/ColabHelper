import React, { useState, useContext } from 'react';
import { ListItem, Grid, Button } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { UserContext } from '../providers/UserProvider';
import { saveNewContact } from '../services/contactService';

import TextBox from './TextBox';


const NewContact = ({ onAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const user = useContext(UserContext);
  const addNewContact = (e) => {
    e.preventDefault();
    saveNewContact(user, name, email, phone);
    setName('');
    setEmail('');
    setPhone('');


    if (onAdded) {
      onAdded();
    }
  };

  return (

    <form onSubmit={addNewContact}>
      <ListItem>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextBox fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextBox fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <InputMask
              value={phone}
              onChange={(e) => {
                const newVal = e.target.value;
                setPhone(newVal);
              }}
              maskChar=" "
              alwaysShowMask
            >
              {() => (
                <TextBox
                  fullWidth
                  label="Phone Number"
                  type="text"
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || (!/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) && !/^(\()?\s{3}(\))?(-|\s)?\s{3}(-|\s)\s{4}$/.test(phone) && phone !== '')}
              color="primary"
            >
              Add Contact
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    </form>
  );
};

export default NewContact;
