import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(props){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              href="/home"
            >
              <HomeIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Rent-O-Laptop
            </Typography>
            {localStorage.getItem('accessToken')?(
              <div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  href="/profile"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>):(
              <div>
                 <Button color="inherit" href="/signin">SignIn</Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavBar);
