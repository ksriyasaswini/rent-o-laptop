import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import Calender from '../calender/index';
import apiService from '../../api-service';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import GoogleMapsContainer from '../map/index';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
    margin: "auto" // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions:{
    margin: "auto",
    paddingBottom: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#DCDCDC',
    '&:hover': {
      backgroundColor: '#DCDCDC',
    },
    //marginLeft: theme.spacing(6),
    // marginRight: 0 ,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      //marginLeft: theme.spacing(6),
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      //marginLeft: theme.spacing(6),
      // width: '100%',
      display: 'none',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
});


class Device extends React.Component{
  constructor(props){
    super(props);
    this.state = { deviceData: {
      'deviceBrand': '',
      'deviceModel': '',
      'description':'',
      'imageUrls':[],
      'charger': false,
      'processor':'',
      'hardDisk':'',
      'ramSize':'',
      'rentAmount': undefined,
      'bookedByUser': [],
      'bookedDates': []

      // {
      //   'name': 'Dell',
      //   'id': '1'
      // },
      // {
      //   'name': 'Dell',
      //   'id': '1'
      // },
    },
    deviceBookedRange:{},
    bookingAmount: undefined,
    numberOfDaysBooked: undefined,
    deviceId: undefined
    };

    this.getCalenderData = this.getCalenderData.bind(this);
    this.onBookClick = this.onBookClick.bind(this);

    //dummy data
    // this.state = {
    //   deviceData : {
    //     deviceBrand: 'DELL',
    //     deviceModel: 'Inspiron200',
    //     description:'This is a media card. You can use this section to describe the content.',
    //     imageUrls:["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"],
    //     charger: false,
    //     processor:'Core i3',
    //     hardDisk:'512GB',
    //     ramSize:'4GB',
    //     rentAmount: 1000,
    //     bookedByUser: [
    //       {'from_date':'2020-08-20','to_date':'2020-08-24'},
    //       // {'from_date':'2020-08-02','to_date':'2020-08-10'},
    //       // {'from_date':'2020-07-02','to_date':'2020-07-10'},
    //     ],
    //     bookedDates: [
    //       {'from_date':'2020-08-20','to_date':'2020-08-24'},
    //       {'from_date':'2020-08-02','to_date':'2020-08-10'},
    //       ],
    //   }
    // };
  }
  navigate(path) {
    this.props.history.push({
      pathname: path,
    });
  } 

  componentDidMount(){
    const body={};
    // console.log(window.location.pathname);
    // console.log(window.location.pathname.split('/')[2]);
    this.deviceId = Number(window.location.pathname.split('/')[2]);
    //console.log("this.deviceId",this.deviceId,typeof this.deviceId);
    if(isNaN(this.deviceId)){
      alert("Device id is invalid");
      this.navigate('/home');
    }
    this.setState({
      deviceId : this.deviceId
    });
    if(localStorage.getItem('accessToken')){
      //body["deviceId"] = this.deviceId;
      body["accessToken"] = localStorage.getItem('accessToken');
    }
    //else{
    //   body["deviceId"] = this.deviceId;
    // }
    //need to un comment once api is ready
    apiService.postRequest('getDevice/'+this.deviceId, body).then(response => {
      console.log("in device details response: "+ JSON.stringify(response));
      if (response) {
        const responseDeviceData = {
          "deviceBrand": response.device_brand?response.device_brand:'',
          "deviceModel": response.device_model?response.device_model:'',
          "description": response.description?response.description:'',
          "imageUrls":response.image_urls?response.image_urls:[],
          "charger": response.charger?true:false,
          "processor":response.processor?response.processor:'',
          "hardDisk":response.storage?response.storage:'',
          "ramSize":response.RAM_size?response.RAM_size:'',
          "rentAmount": response.rent_amount?response.rent_amount:undefined,
          "bookedByUser": response.userBookings?response.userBookings:[],
          "bookedDates": response.otherBookings?response.otherBookings:[]
        }
        this.setState({
          deviceData : responseDeviceData
        });
      } else {
        alert("Login Failed, Please try again");
      }
    }).catch((e) => {
      alert("Something went wrong. Please try again!")
      console.log(e)
    });
  }

  getCalenderData(deviceBookedRangeFromCalender){
    console.log("deviceBookedRangeFromCalender",deviceBookedRangeFromCalender);
    const fromDate = deviceBookedRangeFromCalender?(deviceBookedRangeFromCalender.from?(deviceBookedRangeFromCalender.from.toISOString().split('T')[0]):undefined): undefined;
    const toDate = deviceBookedRangeFromCalender?(deviceBookedRangeFromCalender.to?(deviceBookedRangeFromCalender.to.toISOString().split('T')[0]):undefined): undefined;
    this.setState({
      deviceBookedRange:{
        'from': fromDate,
        'to': toDate
      }
    })
    if(deviceBookedRangeFromCalender){
      if((deviceBookedRangeFromCalender.from===undefined||deviceBookedRangeFromCalender.to===undefined||this.state.deviceData.rentAmount===undefined)){
          this.setState({
            bookingAmount: undefined,
            numberOfDaysBooked: undefined
          });
      }else{
        const numberOfDays = Math.round(((deviceBookedRangeFromCalender.to)-(deviceBookedRangeFromCalender.from))/(1000*60*60*24))+1;
        this.setState({
          bookingAmount: this.state.deviceData.rentAmount*numberOfDays,
          numberOfDaysBooked: numberOfDays
        });
      }

    }
  }

  onBookClick(){
    console.log("localStorage.getItem('accessToken')",localStorage.getItem('accessToken'));
    if(localStorage.getItem('accessToken') === null){
      console.log("localStorage.getItem('accessToken')",localStorage.getItem('accessToken'));
      this.props.history.push({
        pathname: `/signin?next=device/${this.state.deviceId}`,
      });
     window.location.reload();
    }else{
      const body = {
        'deviceId' : this.state.deviceId,
        'accessToken' : localStorage.getItem('accessToken'),
        'startDate' : this.state.deviceBookedRange.from,
        'endDate' : this.state.deviceBookedRange.to
      }
      console.log("body in onBookClick", body);
      apiService.postRequest('bookDevice', body).then(response => {
        console.log("in book device response: "+ JSON.stringify(response));
        if (response.status === 200) {
          this.props.history.push({
            pathname: `/user-bookings`,
          });
          window.location.reload();
        } else {
          alert("Booking Failed, Please try again");
        }
      }).catch((e) => {
        alert("Something went wrong while booking. Please try again!")
        console.log(e)
      })
    }
  }
  
  render(props){
    const { classes } = this.props;
    const style = {
      // marginLeft: "25%",
      // marginRight: "25%",
      position: "relative",
      // width: "80%",
      height: "20em",
    }
    return (
      <React.Fragment>
        <CssBaseline />
          <Toolbar>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
            </div>
          </Toolbar>
        <main>
          <Container className={classes.cardGrid}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                    {/* {this.state.deviceData.imageUrls.map(function (img, j) { return <CardMedia key={j} style={{marginLeft:"10%",marginRight:"10%"}}
                    className={classes.cardMedia}
                    image={img}
                    title="Image title"
                  />})} */}
                  {/* <CardMedia style={{marginLeft:"10%",marginRight:"10%"}}
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  /> */}
                   
                  <CardContent className={classes.cardContent} >
                  <div className="slide-container" style={{"margin":"5%"}}>
                    <Slide >
                    {this.state.deviceData.imageUrls.map(function (img, j) {
                    return <div key={j} className="each-slide">
                        <div style={{'backgroundImage': `url(${img})`, 
                        "height":"25em", "backgroundSize":"cover", "backgroundRepeat":"no-repeat","objectFit":"contain"}}>
                        </div>
                      </div>
                    })}
                    </Slide>
                  </div>
                    <center>
                    <Typography gutterBottom variant="h4" component="h2">
                      {this.state.deviceData.deviceBrand}&nbsp;{this.state.deviceData.deviceModel}
                    </Typography>
                    </center>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Calender bookedByUser={this.state.deviceData.bookedByUser} bookedDates={this.state.deviceData.bookedDates} callBackFromDevice = {this.getCalenderData}/>
                  </CardContent>
                  <center>
                  <Typography gutterBottom variant="h6" component="h2" >
                      {this.state.bookingAmount?('Rent to be paid:  '+this.state.deviceData.rentAmount+' * '+
                      this.state.numberOfDaysBooked+'= Rs.'+this.state.bookingAmount):''}
                    </Typography>
                  </center>
                  <CardActions className={classes.cardActions}>
                    <Button size="medium" variant="contained" color="primary" 
                      disabled = {(this.state.deviceBookedRange)?((this.state.deviceBookedRange.from===undefined||this.state.deviceBookedRange.to===undefined)?true:false):true} 
                      onClick={() => this.onBookClick()} >
                      Book
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                    <ul>
                      <li>Processor : {this.state.deviceData.processor}</li>
                      <li>Hard Disk : {this.state.deviceData.hardDisk}</li>
                      <li>RAM Size : {this.state.deviceData.ramSize}</li>
                      {this.state.deviceData.charger?<li>Charger available</li>:<li>Charger Unavailable</li>}
                      <li>Rent Amount : Rs.{this.state.deviceData.rentAmount}</li>
                    </ul>
                    </Typography>
                    <Typography>
                      {this.state.deviceData.description}
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} style = { style }>
              <GoogleMapsContainer/>
              </Grid> */}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
Device.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Device);
