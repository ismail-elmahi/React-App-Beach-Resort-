import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../Components/Banner';
import {Link } from 'react-router-dom';
import {RoomContext} from '../Context';
import StyledHero from '../Components/StyledHero';

class SingleRoom extends Component {

    constructor(props) {
        super(props);
        
        this.state= {
            slug: this.props.match.params.slug,
            defaultBcg
        };
    }

    static contextType = RoomContext;

    render() {
            // here we send the slug to getRoom function in context file
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug)
       
       if(!room){
            return(
                <div className="error">
                    <h3> no such room could be found...</h3>
                    <Link to='/rooms' className="btn-primary">Back to rooms</Link>
                </div>
            )
       }
// this is how to access to specific value in object in this case we have a room as object  
       const {name,
        description,
        capacity,
        size,
        price,
        extras,
        breakfast,
        pets,
        images} = room;
       
        const [mainImg, ...defaultImg] = images ;

        return (
            <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-room"> 
                <div className="single-room-images">
                    {defaultImg.map((item,index) => (
                        <img key={index} src={item} alt={name} />
                    ))}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: {size} SQFT</h6>
                        <h6>
                            max capacity : {
                                capacity > 1 ? `${capacity} poeple` : `${capacity} person`
                            }
                        </h6>
                        <h6> {pets ? "pets allowed" : "no pets included"}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>   
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item,index) => (
                        <li key={index}>- {item}</li>
                    ))}
                </ul>
            </section>
            </>

        );
    }
}

export default SingleRoom;