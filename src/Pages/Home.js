import React from 'react';
import Hero from '../Components/Hero'
import Banner from '../Components/Banner';
import {Link} from 'react-router-dom';
import Services from '../Components/Services';
import FeturedRooms from '../Components/FeturedRooms';


const Home = () => {
    return (
      // we can't render 2 jsx components
      // so this is how we use react frament 
      <React.Fragment>
        <Hero>
          <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
            <Link to='/rooms' className="btn-primary">
            Our Rooms
            </Link>
          </Banner>  
        </Hero>
        <Services />
        <FeturedRooms />
        </React.Fragment>
    );
};

export default Home;