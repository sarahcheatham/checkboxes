import React, { Component } from 'react';
import { Container, Table, Button, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addOpp, removeOpp } from '../../Store/actions/checkboxActions';
import './OppTable.css';

class OppTable extends Component {
  state = {
    open: false,
  }

  checkbox = opp => {
    const oppIndex = this.props.checkedOpps.indexOf(opp);
    oppIndex === -1 ? this.props.addOpp(opp) : this.props.removeOpp(oppIndex);
  }

  renderTable = () => {
    const opportunities = this.props.opportunities.opportunities.map((opp, index)=>{
      return (
          <tr key={index} className="table-row">
            <td>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Input 
                        id={opp._id} 
                        onChange={() => this.checkbox(opp)}
                        className="d-flex align-self-center" 
                        addon 
                        type="checkbox" 
                        aria-label="Checkbox for opportunity" 
                    />
                </InputGroupAddon>
                <Label className="label d-inline-flex ml-3">{opp.opp}</Label>
            </InputGroup>
            </td>
            <td>
                {opp.price[2].onsite}
            </td>
          </tr>
      )
    })

    return(
      <Table responsive>
        <thead>
          <tr className="table-row">
            <th>Opportunity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {opportunities}
        </tbody>
      </Table>
    )
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({open: !this.state.open})
  }

  render() {
    let whatToShow = "";
    const table = this.renderTable();
    if(this.state.open){
      whatToShow = table;
    } else {
      whatToShow = <div></div>
    }
    return (
      <Container className="table-container">
        <Button className="table-button" size="lg" block onClick={this.handleClick}>Additional Revenue Opportunities +/-</Button>
        {whatToShow}
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    opportunities: state.opportunities,
    checkedOpps: state.checkedOpps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOpp: opp => dispatch(addOpp(opp)),
    removeOpp: oppIndex => dispatch(removeOpp(oppIndex))
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (OppTable);