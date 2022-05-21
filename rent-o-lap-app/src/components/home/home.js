import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import apiService from '../../api-service';
import PropTypes from 'prop-types';
import Filters from './filter';
import Button from '@material-ui/core/Button';


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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#DCDCDC',
    '&:hover': {
      backgroundColor: '#DCDCDC',
    },
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
    width: '100%',
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
  filterButton:{
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      deviceList: [],
      filterOn : true,
      searchString: '',
    };
    this.onViewClick = this.onViewClick.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(props){
  //   apiService.getRequest('getDevices').then(response => {
  //     console.log("in get device list response: "+ JSON.stringify(response));
  //     const responseDeviceList =[];
  //     if (response) {
  //       response.forEach(device=>{
  //         const eachDevice ={};
  //         eachDevice.deviceId = device.id;
  //         eachDevice.deviceBrand = device.device_brand;
  //         eachDevice.deviceModel = device.device_model;
  //         eachDevice.imageUrls = device.image_urls;
  //         eachDevice.description = device.description?device.description:'jdhskgthkyhidyjh';
  //         responseDeviceList.push(eachDevice);
  //       });
  //       this.setState({
  //         deviceList : responseDeviceList
  //       });
  //     } else {
  //       alert("Failed to get devices, Please try again");
  //     }
  //   }).catch((e) => {
  //   alert("Something went wrong. Please try again!")
  //   console.log(e)
  // });

  this.setState({
    deviceList:[
      {
        'deviceId': 1,
        'deviceBrand': 'Dell',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 2,
        'deviceBrand': 'hp',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 3,
        'deviceBrand': 'lenevo',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 2,
        'deviceBrand': 'hp',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 3,
        'deviceBrand': 'lenevo',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 2,
        'deviceBrand': 'hp',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 3,
        'deviceBrand': 'lenevo',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 2,
        'deviceBrand': 'hp',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      },
      {
        'deviceId': 3,
        'deviceBrand': 'lenevo',
        'description':'This is a media card. You can use this section to describe the content.',
        'deviceModel': 'Inspiron200',
        'imageUrls':["https://source.unsplash.com/random","https://source.unsplash.com/random","https://source.unsplash.com/random"]
      }
    ]
    });

  }

  onViewClick(id){
    //console.log("device id"+id)
    let path=`/device/${id}`;
    this.props.history.push({
        pathname: path,
        state: {
           id:id
        }
       });
  }

  onFilterClick(e){
    this.setState({
      filterOn : !this.state.filterOn
    });
  }

  getFilteredData(filteredDeviceList) {
    console.log("filteredDeviceList",filteredDeviceList);
    this.setState({
      deviceList : filteredDeviceList
    });
  }

  handleSearch(event) {
    // console.log(event.target.value);
    let searchString = this.state.searchString;
    searchString = event.target.value
    this.setState({searchString});
    let searchValue = event.target.value;
    if(searchValue.length >= 3) {
      apiService.postRequest('/search/?searchString='+searchValue).then(response => {
        console.log("in get device list response: "+ JSON.stringify(response));
        const responseDeviceList =[];
        if (response) {
          response.forEach(device=>{
            const eachDevice ={};
            eachDevice.deviceId = device.id;
            eachDevice.deviceBrand = device.device_brand;
            eachDevice.deviceModel = device.device_model;
            eachDevice.imageUrls = device.image_urls;
            eachDevice.description = device.description?device.description:'jdhskgthkyhidyjh';
            responseDeviceList.push(eachDevice);
          });
          this.setState({
            deviceList : responseDeviceList
          });
        } else {
          alert("Failed to get devices, Please try again");
        }
      }).catch((e) => {
        alert("Something went wrong. Please try again!")
        console.log(e)
      });
    }
  }
  render(props){
    const { classes } = this.props;
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
                  onChange={this.handleSearch}
                  name='searchString'
                  value={this.state.seachString}
                />
            </div>
          </Toolbar>
          <center>
            <div className={classes.filterButton}>
              <Button size="medium" variant="contained" color="primary" 
              className={classes.filterButton} 
              onClick={this.onFilterClick} 
              style={{marginBottom:"3%"}}> 
                Filters 
              </Button>
            </div>
          </center>
        <main>
        
        <Grid container spacing={2} style={{padding:'1%'}}>
          <Grid xs={12} sm={12} md={2}> 
            {this.state.filterOn?<Filters callBackFromHome = {this.getFilteredData}/> : null}
          </Grid>
          <Grid xs={12} sm={12} md={10} style={{paddingLeft:'1%'}}>
            <Grid container spacing={2}>
              {this.state.deviceList.map((device) => (
                <Grid item key={device.deviceId} xs={12} sm={4} md={3}>
                  <Card className={classes.card} 
                    onClick={() => this.onViewClick(device.deviceId)}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={device.imageUrls[0]}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {device.deviceBrand}&nbsp;{device.deviceModel}
                      </Typography>
                      <Typography>
                        {device.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        </main>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);