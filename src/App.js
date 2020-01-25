import React, { Component } from 'react'
import './App.css';

export default class extends Component{

  constructor(props){
    super(props)
    this.state = { age: '', salary: '', yearsAtWork: '', dependents:'', total: '', result: '', showResults: false  }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Adds comma as thousands separators
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Calculate average Salary over the years with a annual decrease of 3%
  averageSalary(yearsAtWork,salary){

    // Average anual raise in the USA is around 4%     
    const averageRaise = 0.96 
    
    let previousSalary = salary
    for (let i = 0; i < yearsAtWork-1; i++) {
      previousSalary = previousSalary * averageRaise;
      salary += previousSalary;      
    }

    // People less than 10 years at work 
    if(yearsAtWork < 10){    
      return salary / 10;
    } 
    
    return salary / yearsAtWork;        
  }

  expectedNetWorth(age,salary,yearsAtWork,dependents){  

    let temp = age * (this.averageSalary(parseInt(yearsAtWork,0),parseFloat(salary))) / 10;
    this.state.result = this.numberWithCommas(temp.toFixed(2))
    this.setState({showResults: true});

  }

  handleSubmit(event) {
    this.expectedNetWorth(this.state.age,this.state.salary,this.state.yearsAtWork,this.state.dependents);
    event.preventDefault();
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-6 text-white">
          <div className="card-transparent">
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <input type="number" min="0" step="1" value={this.state.age} onChange={ (event)=> { this.setState({
                    age: event.target.value }) } } className="form-control" id="age" placeholder="Age" required />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <input type="number" min="0" step="1" value={this.state.salary} onChange={ (event)=> {
                    this.setState({ salary: event.target.value }) } } className="form-control" id="salary"
                    placeholder="Current annual income (pre-tax)" required />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <input type="number" min="0" step="1" value={this.state.yearsAtWork} onChange={ (event)=> {
                    this.setState({ yearsAtWork: event.target.value }) } } className="form-control" id="yearsatwork"
                    placeholder="Years of work" required />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary btn-lg">Calculate</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        { this.state.showResults ? <Results age={this.state.age} result={this.state.result} /> : null }

    </div>    
    );
    }
}

class Results extends Component {
  render() {
    return ( <div class="col-lg-6">
    <div class="card rounded">
      <div class="card-body">
        <h5 class="card-title text-center">Your Net Worth by the age of {this.props.age} should be:</h5>
        <h1 class="text-center">${this.props.result}</h1>
        <ul>
          <li><strong>Under accumulators of wealth (UAWs)</strong> are those whose real net worth is less than one-half of their expected net worth.</li>
          <li><strong>Average accumulators of wealth (AAW)</strong> are on par with their expected net worth.</li>
          <li><strong>Prodigious accumulators of wealth (PAWs)</strong> have a net worth twice their expected level.</li>
        </ul>
      </div>
    </div>
  </div>);
  }
}
