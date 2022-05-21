import React, { Component } from 'react';
import { Container, Avatar, Typography, withStyles, Card, List, ListItem, Divider, ListItemText, ListItemAvatar } from '@material-ui/core';
import PropTypes from 'prop-types'
import { Person, CardTravelOutlined, LaptopChromebook, CreditCard, ExitToApp } from '@material-ui/icons';
import apiService from '../../api-service';

const styles= theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    margin: '0 5%',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      margin: '0 10%',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
      margin: '0 15%',
    },
  },
  list: {
    width: '100%',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    marginTop: '5%',
  }

});

class UserProfile extends Component {

  navigate(path) {
    this.props.history.push({
      pathname: path,
    });
  }

  handleLogout() {
    const logOutBody = {
      accessToken: localStorage.getItem('accessToken')
    }
    apiService.putRequest('signOut', logOutBody).then(response => {
      console.log(response.stringify)
      if (response.status === 200) {
        alert('loggedOut successfully');
        localStorage.removeItem('accessToken');
        this.props.history.push({
          pathname: `/home`,
        })
        window.location.reload();
      } else {
        alert("Something went wrong. Please Try Again.");
      }
    }).catch((e) => {
      alert("Something went wrong. Please Try Again.");
      console.log(e)
    })
  }
  render(props){
    const { classes } = this.props;
    if (localStorage.getItem('accessToken') === undefined) {
      this.props.history.push({
        pathname: `/signin`,
      })
      window.location.reload();
    }
    return (
      <Container className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Person />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <List className={classes.list}>
              <ListItem button onClick={() => {this.navigate('/user-details')}}>
                <ListItemAvatar>
                  <Avatar>
                    <CardTravelOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="My Details" />
              </ListItem>
              <Divider light />
              <ListItem button onClick={() => {this.navigate('/user-devices')}}>
                <ListItemAvatar>
                  <Avatar>
                    <LaptopChromebook />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="My Devices" />
              </ListItem>
              <Divider light />
              <ListItem button onClick={() => {this.navigate('/user-bookings')}}>
                <ListItemAvatar>
                  <Avatar>
                    <CreditCard />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="My Bookings" />
              </ListItem>
              <Divider light />
              <ListItem button onClick={() => {this.handleLogout()}}>
                <ListItemAvatar>
                  <Avatar>
                    <ExitToApp />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Logout"/>
              </ListItem>
            </List>
          </div>
        </Card>
      </Container>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserProfile);
