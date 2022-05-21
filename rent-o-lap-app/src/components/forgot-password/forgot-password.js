import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types'
import ApiService from '../../api-service';

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

class ForgotPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      form: {
        mobileNumber: '',
        otp: '',
        password:'',
        confirmpassword:''
      },
      fields: {},
      errors: {},
      mobileNumberIsValid: true,
      isotpDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.getotp = this.getotp.bind(this);
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

  handleSubmit(e){
    e.preventDefault();
    if (this.validateForm()) {      
      let fields = {};
      fields["mobileNumber"] = "";
      fields["otp"] = "";
      fields["password"] = "";
      fields["confirmpassword"] = "";
      this.setState({fields:fields});
      let store = this.state;
      store.form.mobileNumber = this.state.fields["mobileNumber"];
      store.form.password = this.state.fields["password"];
      store.form.confirmpassword = this.state.fields["confirmpassword"]
      store.form.otp = this.state.fields["otp"]
      this.setState(store);
      console.log("Form data : " + JSON.stringify(this.state.form));
      const resetPasswordBody = {
        mobileNumber: this.state.form.mobileNumber,
        otp: this.state.form.otp,
        password: this.state.form.password,
        confirmpassword: this.state.form.confirmpassword
      };

      ApiService.postRequest('reset-password', resetPasswordBody).then(response => {
        console.log(response.stringify)
        if (response.status === 200) {
          console.log("in forgot Password fetch: "+ JSON.stringify(response));
          this.props.history.push(`/signin`)
        } else {
          alert("Something went wrong. Please Try Again.");
        }
      }).catch((e) => console.log(e))
    }
  }

  getotp(e){
    e.preventDefault();
    if(this.validateMobileNumber()){
      let fields = {};
      fields["mobileNumber"] = "";
      this.setState({fields:fields});
      let store = this.state;
      store.form.mobileNumber = this.state.fields["mobileNumber"];
      this.setState(store);
      console.log("Form mobile"+this.state.form.mobileNumber);
      const getOtpBody = {
				mobileNumber: this.state.form.mobileNumber,
				origin: 'reset-password'
      };
      ApiService.postRequest('send-otp', getOtpBody).then(response => {
        console.log(response.stringify)
        if (response.status === 200) {
          this.props.history.push(`/signin`)
        } else {
          alert("User error");
        }
        console.log("in signup fetch: "+ JSON.stringify(response));
      }).catch((e) => console.log(e))
    }
  }

  validateMobileNumber() {
    let fields = this.state.fields;
    let errors = {};
    let mobileNumberIsValid = true;
    let isotpDisabled = true;

    if (typeof fields["mobileNumber"] !== "undefined") {
      if (fields["mobileNumber"].length === 0) {
        mobileNumberIsValid = true;
        isotpDisabled = true;
        errors["mobileNumber"] = "*Please enter your mobile no.";
      } else if (!fields["mobileNumber"].match(/^[6-9]{1}[0-9]{9}$/)) {
        mobileNumberIsValid = false;
        isotpDisabled = true;
        errors["mobileNumber"] = "*Please enter valid mobile no.";
      } else {
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
    return mobileNumberIsValid;
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["mobileNumber"] || !fields["mobileNumber"].match(/^[6-9]{1}[0-9]{9}$/)) {
      formIsValid = false;
      this.setState({mobileNumberIsValid: false});
      errors["mobileNumber"] = "*Please enter valid mobile number";
    }

    if (!fields["otp"] || !fields["otp"].match(/^[0-9]{6}$/)) {
      formIsValid = false;
      errors["otp"] = "*Please enter valid OTP.";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Password must contain atleast 1 lowercase, uppercase, special char, number and length >8)";
      }
    }

    if (!fields["confirmpassword"]) {
      formIsValid = false;
      errors["confirmpassword"] = "*Please re-enter your password.";
    }
    if (typeof fields["confirmpassword"] !== "undefined") {
      if (fields["password"] !== fields["confirmpassword"]) {
        formIsValid = false;
        errors["confirmpassword"] = "*Passwords do not match";
      }
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
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobileNumber"
                value={this.state.fields.mobileNumber || ''} onChange={this.handleChange}
              />
              {(!this.state.mobileNumberIsValid)?<div className="errorMsg">{this.state.errors.mobileNumber}</div>:null}
            </Grid>
            <Grid item xs={4}> 
              <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={this.getotp}
              disabled = {this.state.isotpDisabled}
              >
                Get otp
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                className={classes.grid}
                value={this.state.fields.otp || ''}
                onChange = {this.handleChange}
              />
              <div className="errorMsg">{this.state.errors.otp}</div>                                                        
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                value={this.state.fields.confirmpassword || ''}
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.errors.confirmpassword}</div>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSubmit}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
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
ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ForgotPassword);
