import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ApiService from '../../api-service';
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Card } from '@material-ui/core';

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
class UserDevice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {
        chargerPresent: true,
        imageUrls: [],
      },
      brands: ["Dell", "Lenovo", "Asus", "HP", "Apple", "HTC"],
      RAMDetails: ["1GB", "2GB", "4GB", "8GB", "16GB"],
      hardDisks: ["256GB", "512GB", "1TB", "2TB"],
      files: [],
      imagePreviewUrls: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange(event) {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value || event.target.checked
    this.setState({fields})
  }

  handleUpload(event) {
    event.preventDefault();
    let files = Array.from(event.target.files)
    files.forEach((file, i) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let stateFiles = this.state.files;
        let stateImagePreviewUrls = this.state.imagePreviewUrls;
        let fields = this.state.fields;
        fields.imageUrls.push(reader.result)
        stateFiles.push(file)
        this.state.imagePreviewUrls.push(reader.result)
        this.setState({fields});
        this.setState({stateFiles});
        this.setState({stateImagePreviewUrls});
      }
      reader.readAsDataURL(file);
    });
  }

  handleSubmit(event){
    event.preventDefault();
    let fields = this.state.fields;
    console.log(fields);
    if (!fields.brandName || !fields.deviceDescription || !fields.deviceModel ||
      !fields.hardDisk || !fields.ramSize || !fields.rentCost
      || fields.imageUrls.length === 0) {
        alert("Please enter all valid details");
        return;
    }
    ApiService.postRequest('add-device', fields, 'multipart/form-data').then((response) => {
      if (response) {
        this.props.history.push(`/user-devices`)
      } else {
        alert("Something went wrong. Please try again!");
      }
    }).catch((e) => {
      alert("Something went wrong. Please try again!");
    })
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
            Add Device
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" style={{ width:'100%' }}>
                  <InputLabel id="select">Device Brand</InputLabel>
                  <Select
                    labelId="select"
                    onChange={this.handleChange}
                    label="Device Brand"
                    name='brandName'
                  >
                    {
                      this.state.brands.map((brand, index) => (
                        <MenuItem value={this.state.brands[index]} key={brand} name={this.state.fields.brandName}>{brand}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="deviceModel"
                  variant="outlined"
                  required
                  fullWidth
                  id="deviceModel"
                  label="Device Model"
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue=""
                  name='deviceDescription'
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.fields.chargerPresent}
                      onChange={this.handleChange}
                      color="primary"
                    />
                  }
                  name="chargerPresent"
                  label="Charger"
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl variant="outlined" style={{ width:'100%' }}>
                  <InputLabel id="select">RAM</InputLabel>
                  <Select
                    labelId="select"
                    onChange={this.handleChange}
                    name='ramSize'
                    label="RAM"
                  >
                    {
                      this.state.RAMDetails.map(ram => (
                        <MenuItem value={ram} key={ram}>{ram}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl variant="outlined" style={{ width:'100%' }}>
                  <InputLabel id="select">Hard Disk</InputLabel>
                  <Select
                    labelId="select"
                    onChange={this.handleChange}
                    name='hardDisk'
                    label="Hard Disk"
                  >
                    {
                      this.state.hardDisks.map(hardDisk => (
                        <MenuItem value={hardDisk} key={hardDisk}>{hardDisk}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="rentCost"
                  variant="outlined"
                  required
                  fullWidth
                  id="rentCost"
                  label="Rent Cost"
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <input className="upload" type='file' id='multi' onChange={this.handleUpload} multiple/>
              </Grid>
              {
                this.state.imagePreviewUrls.map((imageUrl,index) => (
                  <Grid item xs={4} key={`image ${index}`}>
                    <Card>
                        <img src={imageUrl} width="200px" height="200px"/>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.handleSubmit}
            >
              Add Device
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

UserDevice.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserDevice);
