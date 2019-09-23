import React from 'react';
import OppCards from '../../components/OppCards/OppCards';
import OppTable from '../../components/OppTable/OppTable';
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <OppCards />
            <OppTable/>
        </div>
    )
}

export default Home