import React, { Component } from 'react';
import Title from '../Components/Title';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';

class Services extends Component {

    state ={
services : [
    {
        icon:<FaCocktail /> ,
        title: 'free Cocktail',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, consequatur.'
    },
    {
        icon:<FaHiking /> ,
        title: 'Endless Hiking',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, consequatur.'
    },
    {
        icon:<FaShuttleVan /> ,
        title: 'free Shuttle',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, consequatur.'
    },
    
    {
        icon:<FaBeer /> ,
        title: 'stronger beer',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, consequatur.'
    }
]}
    

    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                     {this.state.services.map((item,index)=> {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>

                        </article>
                     })}
                </div>
            </section>
        );
    }
}

export default Services;