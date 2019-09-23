import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import './OppCards.css';
import { connect } from 'react-redux';

class OppCards extends Component{
    state = {
        selfOpen: false,
        remoteOpen: false,
        onsiteOpen: false,
        selfPrice: 0,
        remotePrice: 0,
        onsitePrice: 0
        // selfPrice: 600,
        // remotePrice: 900,
        // onsitePrice: 1000
    }

    isEmpty = obj => {
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false
            }
        }
        return true
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.checkedOpps !== this.props.checkedOpps && !this.isEmpty(this.props.checkedOpps)){
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            
            const self = this.props.checkedOpps.map(opp => {
                return opp.price[0].self
            })
            const remote = this.props.checkedOpps.map(opp => {
                return opp.price[1].remote
            })
            const onsite = this.props.checkedOpps.map(opp => {
                return opp.price[2].onsite
            })
            const selfTotal = self.reduce(reducer);
            const remoteTotal = remote.reduce(reducer);
            const onsiteTotal = onsite.reduce(reducer);
            this.setState({ selfPrice: selfTotal, remotePrice: remoteTotal, onsitePrice: onsiteTotal })
        }
    }
    
    handleSelfClick = e => {
        e.preventDefault();
        this.setState({selfOpen: !this.state.selfOpen})
    }

    handleRemoteClick = e => {
        e.preventDefault();
        this.setState({remoteOpen: !this.state.remoteOpen})
    }

    handleOnsiteClick = e => {
        e.preventDefault();
        this.setState({onsiteOpen: !this.state.onsiteOpen})
    }

    renderDetails(){
        return (
            <ul className="details-list">
                <li>fermentum dui faucibus in ornare quam viverra.</li>
                <li>quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <ul>
                    <li>id diam vel quam</li>
                    <li>ut sem nulla pharetra diam sit</li>
                    <li>ac tortor vitae</li>
                </ul>
            </ul>
        )
    }

    render(){
        let showSelf = "";
        let showRemote = "";
        let showOnsite = "";

        const details = this.renderDetails();
        
        this.state.selfOpen ? showSelf = details : showSelf = <div></div>;
        this.state.remoteOpen ? showRemote = details : showRemote = <div></div>;
        this.state.onsiteOpen ? showOnsite = details : showOnsite = <div></div>;
        
        return (
            <Container className="cards-container">
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItem className="card-unselected">SELF</ListGroupItem>
                        </ListGroup>
                        <Card body outline color="secondary">
                            <CardTitle className="card-title">Self Assessment</CardTitle>
                            <CardText className="card-price">
                                <span className="card-price-black">${this.state.selfPrice}</span>
                                <span className="card-price-gray">/mo</span>
                            </CardText>
                            <Button outline color="primary" onClick={this.handleSelfClick}>Details +/-</Button>
                            {showSelf}
                        </Card>
                    </Col>

                    <Col>
                        <ListGroup>
                            <ListGroupItem className="card-selected">MOST POPULAR</ListGroupItem>
                        </ListGroup>
                        <Card body outline color="success">
                            <CardTitle className="card-title">Remote Assessment</CardTitle>
                            <CardText className="card-price">
                                <span className="card-price-black">${this.state.remotePrice}</span>
                                <span className="card-price-gray">/mo</span>
                            </CardText>
                            <Button outline color="primary" onClick={this.handleRemoteClick}>Details +/-</Button>
                            {showRemote}
                        </Card>
                    </Col>

                    <Col>
                        <ListGroup>
                            <ListGroupItem className="card-unselected">ONSITE</ListGroupItem>
                        </ListGroup>
                        <Card body outline color="secondary">
                            <CardTitle className="card-title">Onsite Assessment</CardTitle>
                            <CardText className="card-price">
                                <span className="card-price-black">${this.state.onsitePrice}</span>
                                <span className="card-price-gray">/mo</span>
                            </CardText>
                            <Button outline color="primary" onClick={this.handleOnsiteClick}>Details +/-</Button>
                            {showOnsite}
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
        opportunities: state.opportunities,
        checkedOpps: state.checkedOpps
    }
}

export default connect(mapStateToProps)(OppCards);