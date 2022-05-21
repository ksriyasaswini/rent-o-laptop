import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Tooltip } from "@material-ui/core";

export default class Calender extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = {
      pickedRange:{
        from: undefined,
        to: undefined
      }

    }
  }

  getInitialState() {
    const pickedRange = {
      from: undefined,
      to: undefined,
    }
    this.setState({
      pickedRange:pickedRange
    });
  }

  handleDayClick(day,{disabled}) {
    if (disabled) {
      window.alert('This day is disabled');
      this.handleResetClick();
    }
    else{
      const range = DateUtils.addDayToRange(day, this.state.pickedRange);
      if(this.validateDisabledDaysInBetween(range)){
        console.log("range",range);
        console.log("day",day);
        this.setState({pickedRange:range});
        this.sendBookedDayToDevice(range);
      }else{
        window.alert('This selection is invalid');
        this.handleResetClick();
      }
    }
  }

  validateDisabledDaysInBetween(range){
    var isValid= true;
    if(range.from&&range.to){
      const disabledDays = this.getDisabledDays();
      disabledDays.every(eachDisabledRange => {
        if (eachDisabledRange.before&&eachDisabledRange.after) {
          console.log('eachDisabledRange',eachDisabledRange,'range',range);
          if ((range.from<eachDisabledRange.after && range.from<eachDisabledRange.before) &&
            (range.to>eachDisabledRange.after && range.to>eachDisabledRange.before)) {
              isValid = isValid && false;
          }
        }
        return isValid;
      });
    }
    return isValid;
  }

  sendBookedDayToDevice(range){
    console.log("Range in sendBookedDayToDevice ", range);
    this.props.callBackFromDevice(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
    this.sendBookedDayToDevice({
      from: undefined,
      to: undefined,
    });
  }

  getDisabledDays(){
    let disabledDays =[];
    //console.log('this.props.bookedDates',this.props.bookedDates);
    this.props.bookedDates.forEach(element => {
      let eachRow ={};
      eachRow.after = new Date(element.from_date);
      eachRow.before = new Date(element.to_date);
      // console.log('eachRow',eachRow);
      disabledDays.push(eachRow);
    });
    disabledDays.push({
      before: new Date()
    });
    return disabledDays;
  }

  getDaysBookedByUser(){
    let daysBookedByUser =[];
    //console.log('this.props.bookedByUser',this.props.bookedByUser);
    this.props.bookedByUser.forEach(element => {
      let eachRow ={};
      eachRow.after = new Date(element.from_date);
      eachRow.before = new Date(element.to_date);
      // console.log('eachRow',eachRow);
      daysBookedByUser.push(eachRow);
    });
    return daysBookedByUser;
  }

  render() {
    const { from, to } = this.state.pickedRange;
    const modifiers = { start: from, end: to ,
       highlighted : this.getDaysBookedByUser()
      };
      const modifiersStyles = {
        highlighted: {
          color: '#ffc107',
          backgroundColor: '#fffdee',

        },
      };
      const renderDay=(day, mod) =>{
        const date = day.getDate();
        const classNames = `${modifiers.highlighted ? "highlighted" : ""}`;
        const title = mod.highlighted ?"booked by you":"";
      
        return (
          <Tooltip title={title} className={classNames}>
            <div>{date}</div>
          </Tooltip>
        );
      }
      
    return (
      <div className="RangeExample">
        <p style={{paddingLeft:"5%"}}>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          disabledDays={this.getDisabledDays()}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          renderDay={renderDay}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}