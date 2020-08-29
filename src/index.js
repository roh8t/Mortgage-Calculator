import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var createReactClass = require('create-react-class');

var calculatePayment= function(principal,years,rate){
  var monthlyRate=rate/100/12;
  var monthlyPayment=principal*monthlyRate/(1- (Math.pow(1/(1+monthlyRate),years*12)));
  var balance=principal;
  for(var y=0;y<years;y++){
    var intrestY=0;
    var principalY=0;
    for(var m=0;m<12;m++){
      var intrestM=balance*monthlyRate;
      var principalM=monthlyPayment-intrestM;
      intrestY=intrestY+intrestM;
      principalY=principalY+principalM;
      balance=balance-principalM;
    }
  }
  return {monthlyPayment: monthlyPayment};
};

var Header =createReactClass({
  render: function() {
    return(
      <header>
        <h1>{this.props.title}</h1>
      </header>
    );
  }
});

var MortgageCalculator= createReactClass({
  getInitialState:function () {
    return{
      principal:this.props.principal,
      years:this.props.years,
      rate:this.props.rate
    };
  },
  principalChange :function(event){
    this.setState({principal:event.target.value});
  },
  yearsChange :function(event){
    this.setState({years:event.target.value});
  },
  rateChange :function(event){
    this.setState({rate:event.target.value});
  },
  render:function(){
    var payment= calculatePayment(this.state.principal,this.state.years,this.state.rate);
    var monthlyPayment=payment.monthlyPayment;

    return(
      <div className="content">
        <div className="form">
            <div>
            <label>Principal</label>
            <input type="text" value={this.state.principal} onChange={this.principalChange}/>
          </div>

          <div>
            <label>Years</label>
            <input type="text" value={this.state.years} onChange={this.yearsChange}/>
          </div>

          <div>
            <label>Rate</label>
            <input type="text" value={this.state.rate} onChange={this.rateChange}/>
          </div>
        </div>
        <h2>MONTHLY PAYMENT:<span className="currncy">{Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>
      </div>
    );
  }
});

var App=createReactClass({
  render:function(){
    return(
      <div>
        <Header title="React Mortgage Calculator"/>
        <MortgageCalculator principal="200000" years="30" rate="5"/>
      </div>
    );
  }
});




ReactDOM.render(

<App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

