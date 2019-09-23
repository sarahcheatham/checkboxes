import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import OppForm from './pages/Form/OppForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOpportunities } from './Store/actions/oppActions';

class App extends React.Component {

  componentDidMount(){
    this.props.loadOpportunities();
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/form" component={OppForm}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    opportunities: state.opportunities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOpportunities: () => dispatch(loadOpportunities())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
