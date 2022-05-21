import React, { Component } from 'react';
import { Container, withStyles, Card, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, CardContent, Tooltip, Fab, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import PropTypes from 'prop-types'
import { LaptopChromebook, AddCircle, Delete } from '@material-ui/icons';
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
      marginTop: '5%',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
      margin: '0 15%',
      marginTop: '5%',
    },
    marginTop: '5%',
  },
  list: {
    width: '100%',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    marginTop: '5%',
  },
  addButton: {
    'position': 'absolute',
    'right': '10%',
    'width': '2%',
    'height': '2%',
    [theme.breakpoints.down('sm')]: {
      'position': 'absolute',
      'width': '10%',
      'right': '10%',
    },
    [theme.breakpoints.up('sm')]: {
      'position': 'absolute',
      'right': '20%',
    },
    [theme.breakpoints.up('md')]: {
      'position': 'absolute',
      'right': '25%',
    },
    [theme.breakpoints.up('lg')]: {
      'position': 'absolute',
      'right': '30%',
    },
  },
});

class UserDevices extends Component {
  constructor() {
    super();
    // this.state = { devices: [
    //   {
    //     'name': 'Dell',
    //     'id': '1'
    //   },
    //   {
    //     'name': 'Dell',
    //     'id': '1'
    //   },
    // ]};
    this.state = {devices: []}
  }
  navigate(path) {
    this.props.history.push({
      pathname: path,
    });
  }

  handleDelete(id) {
    const deleteBody = {
      accessToken: localStorage.getItem('accessToken'),
      deviceId: id,
    }
    console.log("Handling Delete for device: ",id)
    apiService.deleteRequest('/delete-device', deleteBody).then((response) => {
      if (response.status === 200) {
        this.props.history.push(`/user-devices`)
        window.location.reload();
      } else {
        alert("Delete Failed, Please try again");
        window.location.reload();
      }
    }).catch((e) => {
      alert("Something went wrong. Please try again!")
      console.log(e)
    })
  }

  componentDidMount() {
    apiService.getRequest('/user-devices', {accessToken: localStorage.getItem('accessToken')}).then((response) => {
      this.setState({ devices: response.json() });
    }).catch((exe) => {
      alert("Something Went Wrong. Please try agian!")
    })
  }

  render(props) {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <Card className={classes.card}>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LaptopChromebook />
            </Avatar>
            <Typography component="h1" variant="h5">
              My Devices
            </Typography>
            <Tooltip title="Add Devices" aria-label="add"
              onClick={() => {
                this.props.history.push({
                  pathname: 'user-device',
                });
              }}>
              <Fab color="primary" className={classes.addButton}>
                <AddCircle />
              </Fab>
            </Tooltip>
            <List style={this.state.devices.length === 0 ? { display : 'none' } :{ display : 'visible' } }  className={classes.list}>
              { this.state.devices.map(device => (
                <ListItem divider button onClick={() => {this.navigate(`/device/${device.id}`)}}>
                  <ListItemAvatar>
                    <Avatar>
                      <LaptopChromebook />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary= {`${device.name}`} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete">
                      <IconButton aria-label="delete" onClick={() => {
                        this.handleDelete(`${device.id}`);
                        console.log("Clicked delete!");
                        }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Card>
        <Card style={this.state.devices.length === 0 ? { display : 'visible' } :{ display : 'none' } } className={classes.card}>
          <CardContent className={classes.cardContent} >
            <center>
              No Devices Present
            </center>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

UserDevices.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserDevices);
