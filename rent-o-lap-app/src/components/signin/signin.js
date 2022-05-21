import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types'
import apiService from '../../api-service';

const styles= theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  grid : {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },

});

class SignIn extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      form: {
        mobileNumber: '',
        password:''
      },
      fields: {},
      errors: {},
      accessToken: '',
      mobileNumberIsValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
    if(e.target.name === 'mobileNumber'){
      this.validateMobileNumber();
    }
  }

  validateMobileNumber() {

    let fields = this.state.fields;
    let errors = {};
    let mobileNumberIsValid = true;
    let isotpDisabled = true;

    if (typeof fields["mobileNumber"] !== "undefined") {
      if (fields["mobileNumber"].length===0) {
        mobileNumberIsValid = true;
        isotpDisabled = true;
        //errors["mobileNumber"] = "*Please enter your mobile no.";
      }
      else if (!fields["mobileNumber"].match(/^[0-9]{10}$/)) {
        mobileNumberIsValid = false;
        isotpDisabled = true;
        errors["mobileNumber"] = "*Please enter valid mobile no.";
      }
      else{
        mobileNumberIsValid = true;
        isotpDisabled = false;
        errors={};
      }
    }

      this.setState({
        mobileNumberIsValid: mobileNumberIsValid,
        isotpDisabled: isotpDisabled,
        errors: errors
      });
    // console.log(this.state);
    return mobileNumberIsValid;
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["mobileNumber"] = "";
      fields["otp"] = "";
      this.setState({fields:fields});
      let store = this.state;
      store.form.mobileNumber = this.state.fields["mobileNumber"];
      store.form.password = this.state.fields["password"];
      this.setState(store);
      console.log("Form mobileNumber : "+this.state.form.mobileNumber);
      console.log("Form password : "+this.state.form.password);

      apiService.putRequest('signIn', this.state.form).then(response => {
        console.log("in signin request: "+ JSON.stringify(response));
        if (response.status === 200) {
          localStorage.setItem('accessToken',response.accessToken)
          console.log("accessToken:"+localStorage.getItem('accessToken'))

          this.nextPath = window.location.search ;
          console.log(this.nextPath);
          console.log(`/`+this.nextPath.split('=')[1]);
          if (this.nextPath !== '') {
            this.props.history.push(`/`+this.nextPath.split('=')[1])
          } else {
            this.props.history.push(`/home`)
          }
          window.location.reload() 
          
        } else {
          alert("Login Failed, Please try again");
        }
      }).catch((e) => {
        alert("Something went wrong. Please try again!")
        console.log(e)
      })
    }
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["mobileNumber"] || !fields["mobileNumber"].match(/^[6-9]{1}\d{9}$/)) {
      formIsValid = false;
      this.setState({mobileNumberIsValid: false});
      errors["mobileNumber"] = "*Please enter valid mobile no.";
    }

    // if (!fields["mobileNumber"] !== "undefined" || !fields["mobileNumber"].match(/^[6-9]{1}\d{9}$/)) {
    //   formIsValid = false;
    //   errors["mobileNumber"] = "*Please enter valid mobile no.";
    //   this.setState({mobileNumberIsValid: false});
    // }
    if (!fields["password"] || !fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors["password"] = "*Please enter valid password.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
 render(props){
  const { classes } = this.props;
   return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="mobileNumber"
            autoFocus
            value={this.state.fields.mobileNumber || ''} onChange={this.handleChange}
          />
          {(!this.state.mobileNumberIsValid)?<div className="errorMsg">{this.state.errors.mobileNumber}</div>:null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.fields.password || ''}
            onChange={this.handleChange}
          />
          <div className="errorMsg">{this.state.errors.password}</div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
   
    </Container>

   );
 }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);