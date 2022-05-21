import React from 'react';
import {Form, FormGroup, Label, Input,Button} from 'reactstrap'
import Range from './Range';
import {withRouter} from 'react-router-dom';
import {Card} from 'reactstrap';
import apiService from '../../api-service';

let i=0;
var body;
var brnd=[];
var ram= [];
var proc=[];
class filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[],
      type: "",
      rangeVal:0,
      deviceBrand:[],
      RAMSize:[],
      processor:[],
      storage: "",
      sort:"",
      open:""
    }
    this.handleProcessorChange = this.handleProcessorChange.bind(this);
    this.handleRAMChange = this.handleRAMChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.handlesortChange = this.handlesortChange.bind(this);
    this.handlebrandChange = this.handlebrandChange.bind(this);
    this.filter = this.filter.bind(this);
    this.unCheckIt = this.unCheckIt.bind(this);
    this.updateRange = this.updateRange.bind(this);
  }

  handlesortChange(e) {
    if(this.state.checked !== e.target.checked) {
      let sort=e.target.value
      this.setState({
        checked:e.target.checked,
        sort: sort,
    });
    }
  }

  handleStorageChange(e) {
    if(this.state.checked !== e.target.checked) {
      let storage=e.target.value
      this.setState({
        checked:e.target.checked,
        storage: storage,
      });
    }
  }

  handleRAMChange(e) {
    if(this.state.checked !== e.target.checked) {
      let processor=e.target.value
      this.setState({
        checked:e.target.checked,
        processor: processor,
      });
    }
    
    }

  unCheckIt(e) {
    e.preventDefault();
    this.setState({
      checked:false
    });
  }


  filter(e) {
    body={
      cost:this.state.rangeVal,
      deviceBrand:brnd,
      RAMSize:ram,
      processor:proc,
      sort:this.state.sort,
      storage:this.state.storage
    }
    apiService.postRequest('getFilteredDevices',body).then(response => {
      console.log("in get device list response: "+ JSON.stringify(response));
      const responseFilteredDeviceList =[];
      if (response) {
        response.forEach(device=>{
          const eachDevice ={};
          eachDevice.deviceId = device.id;
          eachDevice.deviceBrand = device.device_brand;
          eachDevice.deviceModel = device.device_model;
          eachDevice.imageUrls = device.image_urls;
          eachDevice.description = device.description?device.description:'jdhskgthkyhidyjh';
          responseFilteredDeviceList.push(eachDevice);
        });
        this.props.callBackFromHome(responseFilteredDeviceList);
      } else {
        alert("Failed to get filtered devices, Please try again");
      }
    }).catch((e) => {
      alert("Something went wrong in filtering. Please try again!")
      console.log(e)
    });
  }
  updateRange(val) {
    this.setState({
      rangeVal: val
    })
  } 

  handlebrandChange(e) {
    console.log("change")
    brnd[i++]=(e.target.value)
    console.log(brnd)
  }

  handleProcessorChange(e) {
    console.log("change")
    proc[i++]=(e.target.value)
    console.log(proc)
  }
     
  render () {
    const { rangeVal } = this.state;
    // console.log(this.state.deviceBrand);
    // console.log(this.state.RAMSize);
    // console.log(this.state.cost);
    // console.log(this.state.processor);
    // console.log(this.state.storage);
    // console.log(this.state.sort);
    // console.log(this.state.rangeVal);
    return (
      <Card style={{backgroundColor:"#f2f2f3", padding:"20px"}}>
        <Form style={{width:"100%"}}>
          <legend>Brand </legend>
          <FormGroup onChange = {this.handlebrandChange} check>
            <Label check>
              <Input type = "checkbox" name="deviceBrand" value="Dell" /> Dell 
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="deviceBrand" value="Lenovo" /> Lenovo
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="deviceBrand" value="Asus" /> Asus
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="deviceBrand" value="HP" /> HP
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="deviceBrand" value="Apple" /> Apple
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="deviceBrand" value="HTC" /> HTC
            </Label>
          </FormGroup>
          <legend>Cost </legend>
          <Range range={rangeVal} updateRange={this.updateRange}/>
          <legend>RAM Size </legend>
          <FormGroup onChange = {this.handleRAMChange} check>
            <Label check>
              <Input type = "radio" name="RAMSize" value="4GB" /> &gt;4GB 
            </Label>
            <br></br>
            <Label check>
              <Input type = "radio" name="RAMSize" value="8GB" /> &gt;8GB
            </Label>
            <br></br>
            <Label check>
              <Input type = "radio" name="RAMSize" value="16GB" /> &gt;16GB
            </Label>
          </FormGroup>
          <legend>Processor </legend>
          <FormGroup onChange = {this.handleProcessorChange} check>
            <Label check>
              <Input type = "checkbox" name="processor" value="i3" /> Corei3 
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="processor" value="i5" /> Corei5
            </Label>
            <br></br>
            <Label check>
              <Input type = "checkbox" name="processor" value="i7" /> Corei7
            </Label>
          </FormGroup>
          <legend>Storage </legend>
          <FormGroup onChange = {this.handleStorageChange} check>
            <Label check>
              <Input type = "radio" name="storage" value="200GB" /> &gt;200GB
            </Label>
            <br></br>
            <Label check>
              <Input type = "radio" name="storage" value="500GB" /> &gt;500GB
            </Label>
            <br></br>
            <Label check>
              <Input type = "radio" name="storage" value="700GB" /> &gt;700GB
            </Label>
            <br></br>
            <Label check>
              <Input type = "radio" name="storage" value="1TB" /> &gt;1TB
            </Label>
          </FormGroup>    
          <legend>Sort  </legend> 
          <FormGroup onChange = {this.handlesortChange} check>
            <Label check>
            <Input type="radio" name="sort" value="1" />{' '}
              By cost- high to low 
            </Label>
            <br></br>
            <Label check>
            <Input type="radio" name="sort" value="2" />{' '}
              By cost- low to high 
            </Label>
          </FormGroup>  
          <br></br>
          <Button onClick={this.filter}>Filter</Button>                         
        </Form>
      </Card>
    );
  }
}

export default withRouter(filters);