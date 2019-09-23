import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createOpportunity } from '../../Store/actions/oppActions';
import './OppForm.css';

class OppForm extends React.Component {
    state = {
        opp: "",
        inputPrice: 0,
        price: [
            { self: null },
            { remote: null }, 
            { onsite: null }
        ]
    }
    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    generatePrices = () => {
        const price = [];
        const self = {self: this.state.inputPrice * .6};
        const remote = {remote: this.state.inputPrice * .9};
        const onsite = {onsite: Number(this.state.inputPrice)};
    
        price.push(self, remote, onsite)
        return price
    }
    handleSubmit = e => {
        const price = this.generatePrices();
        console.log("price:", price)
        e.preventDefault();
        const opp = this.state.opp;
        this.props.createOpportunity({ opp, price })
    }
    render(){
        return(
            <Container fluid className="opp-form-container">
                <Col md={{ size: 6, offset: 3 }}>
                    <h3 className="opp-form-header">Create a new Opportunity</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="oppInput" className="form-labels">Opportunity:</Label>
                                    <Input
                                        type="text"
                                        name="opp"
                                        id="oppInput"
                                        placeholder="Enter a new opportunity"
                                        onChange={this.handleFormChange}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="inputPrice" className="form-labels">Price:</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                        <Input placeholder="Amount" type="number" name="inputPrice" onChange={this.handleFormChange}/>
                                        <InputGroupAddon addonType="append">.00</InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button outline color="success" type="submit">SUBMIT</Button>
                    </Form>
                </Col>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOpportunity: opportunity => dispatch(createOpportunity(opportunity))
    }
}

export default connect(null, mapDispatchToProps) (OppForm);